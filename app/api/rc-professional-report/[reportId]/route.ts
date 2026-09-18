import {
  NextRequest,
  NextResponse,
} from 'next/server';

import {
  PDFDocument,
  StandardFonts,
  rgb,
} from 'pdf-lib';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

type RouteContext = {
  params: Promise<{
    reportId: string;
  }>;
};

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

function safeFileName(
  value: string,
) {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      '-',
    )
    .replace(
      /^-+|-+$/g,
      '',
    );
}

function wrapText({
  text,
  font,
  fontSize,
  maxWidth,
}: {
  text: string;
  font: {
    widthOfTextAtSize: (
      text: string,
      size: number,
    ) => number;
  };
  fontSize: number;
  maxWidth: number;
}) {
  const paragraphs =
    text.split(/\n+/);

  const lines:
    string[] = [];

  paragraphs.forEach(
    (paragraph) => {
      const words =
        paragraph
          .trim()
          .split(/\s+/)
          .filter(Boolean);

      if (
        words.length ===
        0
      ) {
        lines.push('');
        return;
      }

      let currentLine =
        '';

      words.forEach(
        (word) => {
          const testLine =
            currentLine
              ? `${currentLine} ${word}`
              : word;

          const width =
            font.widthOfTextAtSize(
              testLine,
              fontSize,
            );

          if (
            width <=
            maxWidth
          ) {
            currentLine =
              testLine;
          } else {
            if (
              currentLine
            ) {
              lines.push(
                currentLine,
              );
            }

            currentLine =
              word;
          }
        },
      );

      if (
        currentLine
      ) {
        lines.push(
          currentLine,
        );
      }
    },
  );

  return lines;
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: RouteContext,
) {
  try {
    const auth =
      await getCurrentRcAuthContext();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please log in again.',
        },
        {
          status: 401,
        },
      );
    }

    if (
      auth.member.role !==
      'educator'
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This report belongs to an educator account.',
        },
        {
          status: 403,
        },
      );
    }

    const {
      reportId,
    } = await params;

    if (!reportId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The report could not be identified.',
        },
        {
          status: 400,
        },
      );
    }

    const supabase =
      createRcAdminClient();

    const {
      data: report,
      error: reportError,
    } = await supabase
      .from(
        'rc_professional_learning_reports',
      )
      .select(
        `
          id,
          member_id,
          topic_id,
          report_name,
          personal_learning_note,
          generated_at
        `,
      )
      .eq(
        'id',
        reportId,
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .maybeSingle();

    if (
      reportError ||
      !report
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This Professional Learning Report could not be found.',
        },
        {
          status: 404,
        },
      );
    }

    if (
      !report.topic_id
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This report is not connected to a topic.',
        },
        {
          status: 400,
        },
      );
    }

    const [
      topicResponse,
      progressResponse,
      certificateResponse,
      selectedTakeawaysResponse,
    ] = await Promise.all([
      supabase
        .from(
          'rc_topics',
        )
        .select(
          `
            id,
            title,
            sort_order
          `,
        )
        .eq(
          'id',
          report.topic_id,
        )
        .maybeSingle(),

      supabase
        .from(
          'rc_topic_progress',
        )
        .select(
          `
            completed_at
          `,
        )
        .eq(
          'member_id',
          auth.member.id,
        )
        .eq(
          'topic_id',
          report.topic_id,
        )
        .not(
          'completed_at',
          'is',
          null,
        )
        .maybeSingle(),

      supabase
        .from(
          'rc_certificates',
        )
        .select(
          `
            id,
            completion_date,
            cpd_hours
          `,
        )
        .eq(
          'member_id',
          auth.member.id,
        )
        .eq(
          'topic_id',
          report.topic_id,
        )
        .maybeSingle(),

      supabase
        .from(
          'rc_professional_report_takeaways',
        )
        .select(
          `
            takeaway_id
          `,
        )
        .eq(
          'report_id',
          report.id,
        ),
    ]);

    if (
      topicResponse.error ||
      !topicResponse.data
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The topic connected to this report could not be found.',
        },
        {
          status: 404,
        },
      );
    }

    if (
      progressResponse.error ||
      !progressResponse.data
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The completed topic record could not be found.',
        },
        {
          status: 404,
        },
      );
    }

    const topic =
      topicResponse.data;

    const progress =
      progressResponse.data;

    const selectedTakeawayIds =
      (
        selectedTakeawaysResponse.data ??
        []
      ).map(
        (item) =>
          item.takeaway_id,
      );

    let takeaways:
      {
        id: string;
        takeaway_number: number;
        takeaway_text: string;
      }[] = [];

    if (
      selectedTakeawayIds.length >
      0
    ) {
      const {
        data,
        error,
      } = await supabase
        .from(
          'rc_learning_takeaways',
        )
        .select(
          `
            id,
            takeaway_number,
            takeaway_text
          `,
        )
        .eq(
          'member_id',
          auth.member.id,
        )
        .eq(
          'topic_id',
          report.topic_id,
        )
        .in(
          'id',
          selectedTakeawayIds,
        )
        .order(
          'takeaway_number',
          {
            ascending: true,
          },
        );

      if (error) {
        console.error(
          'Could not load report takeaways:',
          error,
        );
      } else {
        takeaways =
          data ?? [];
      }
    }

    const completionDate =
      certificateResponse.data
        ?.completion_date ||
      progress.completed_at;

    const cpdHours =
      certificateResponse.data
        ?.cpd_hours ??
      1.5;

    const educatorName =
      auth.member.full_name?.trim() ||
      auth.user.email ||
      'Regulator Champions Educator';

    const serviceName =
      auth.service.service_name;

    /*
     * PDF setup
     */
    const pdfDocument =
      await PDFDocument.create();

    pdfDocument.setTitle(
      report.report_name,
    );

    pdfDocument.setAuthor(
      'Play Move Improve',
    );

    pdfDocument.setSubject(
      'Regulator Champions Professional Learning Report',
    );

    pdfDocument.setCreator(
      'Play Move Improve',
    );

    const regularFont =
      await pdfDocument.embedFont(
        StandardFonts.Helvetica,
      );

    const boldFont =
      await pdfDocument.embedFont(
        StandardFonts.HelveticaBold,
      );

    const darkGreen =
      rgb(
        0.11,
        0.23,
        0.20,
      );

    const warmGold =
      rgb(
        0.76,
        0.62,
        0.38,
      );

    const grey =
      rgb(
        0.38,
        0.46,
        0.42,
      );

    const lightBackground =
      rgb(
        0.98,
        0.97,
        0.95,
      );

    const panelBackground =
      rgb(
        0.95,
        0.96,
        0.94,
      );

    const pageWidth =
      595.28;

    const pageHeight =
      841.89;

    const margin =
      52;

    const contentWidth =
      pageWidth -
      margin * 2;

    let page =
      pdfDocument.addPage([
        pageWidth,
        pageHeight,
      ]);

    let y =
      pageHeight - 60;

    const drawPageBackground =
      () => {
        page.drawRectangle({
          x: 0,
          y: 0,
          width:
            pageWidth,
          height:
            pageHeight,
          color:
            lightBackground,
        });

        page.drawText(
          'Play Move Improve: Regulator Champions Program',
          {
            x: margin,
            y:
              pageHeight -
              32,
            size: 9,
            font:
              boldFont,
            color:
              warmGold,
          },
        );

        page.drawText(
          'www.playmoveimprove.com',
          {
            x: margin,
            y: 24,
            size: 8,
            font:
              regularFont,
            color:
              grey,
          },
        );
      };

    const addNewPage =
      () => {
        page =
          pdfDocument.addPage([
            pageWidth,
            pageHeight,
          ]);

        drawPageBackground();

        y =
          pageHeight -
          62;
      };

    const ensureSpace =
      (
        neededHeight:
          number,
      ) => {
        if (
          y -
            neededHeight <
          55
        ) {
          addNewPage();
        }
      };

    const drawWrappedText =
      ({
        text,
        fontSize = 11,
        font = regularFont,
        color = darkGreen,
        lineHeight = 16,
        indent = 0,
      }: {
        text: string;
        fontSize?: number;
        font?: typeof regularFont;
        color?: ReturnType<
          typeof rgb
        >;
        lineHeight?: number;
        indent?: number;
      }) => {
        const lines =
          wrapText({
            text,
            font,
            fontSize,
            maxWidth:
              contentWidth -
              indent,
          });

        lines.forEach(
          (line) => {
            ensureSpace(
              lineHeight,
            );

            page.drawText(
              line,
              {
                x:
                  margin +
                  indent,
                y,
                size:
                  fontSize,
                font,
                color,
              },
            );

            y -=
              lineHeight;
          },
        );
      };

    drawPageBackground();

    /*
     * Title
     */
    page.drawText(
      'Professional Learning Report',
      {
        x: margin,
        y,
        size: 24,
        font:
          boldFont,
        color:
          darkGreen,
      },
    );

    y -= 35;

    drawWrappedText({
      text:
        report.report_name,
      fontSize: 16,
      font:
        boldFont,
      color:
        darkGreen,
      lineHeight: 21,
    });

    y -= 8;

    /*
     * Details panel
     */
    ensureSpace(130);

    const panelTop =
      y;

    page.drawRectangle({
      x: margin,
      y:
        panelTop -
        118,
      width:
        contentWidth,
      height: 118,
      color:
        panelBackground,
    });

    let panelY =
      panelTop - 24;

    const detailRows = [
      [
        'Educator',
        educatorName,
      ],
      [
        'Service',
        serviceName,
      ],
      [
        'Topic',
        topic.title,
      ],
      [
        'Completion date',
        formatDate(
          completionDate,
        ),
      ],
      [
        'Professional development',
        `${cpdHours} hours`,
      ],
      [
        'Report generated',
        formatDate(
          report.generated_at,
        ),
      ],
    ];

    detailRows.forEach(
      ([label, value]) => {
        page.drawText(
          label,
          {
            x:
              margin + 16,
            y:
              panelY,
            size: 9,
            font:
              boldFont,
            color:
              warmGold,
          },
        );

        page.drawText(
          value,
          {
            x:
              margin + 145,
            y:
              panelY,
            size: 10,
            font:
              regularFont,
            color:
              darkGreen,
          },
        );

        panelY -= 17;
      },
    );

    y =
      panelTop -
      140;

    /*
     * Learning summary
     */
    ensureSpace(60);

    page.drawText(
      'Learning summary',
      {
        x: margin,
        y,
        size: 16,
        font:
          boldFont,
        color:
          darkGreen,
      },
    );

    y -= 26;

    drawWrappedText({
      text:
        `This report records professional learning completed through Regulator Champions: ${topic.title}.`,
      fontSize: 11,
      color:
        grey,
      lineHeight: 17,
    });

    y -= 12;

    /*
     * Selected takeaways
     */
    page.drawText(
      'Selected key takeaways',
      {
        x: margin,
        y,
        size: 16,
        font:
          boldFont,
        color:
          darkGreen,
      },
    );

    y -= 28;

    if (
      takeaways.length ===
      0
    ) {
      drawWrappedText({
        text:
          'No key takeaways were selected for this report.',
        fontSize: 11,
        color:
          grey,
        lineHeight: 17,
      });
    } else {
      takeaways.forEach(
        (
          takeaway,
          index,
        ) => {
          ensureSpace(45);

          page.drawText(
            `${index + 1}.`,
            {
              x: margin,
              y,
              size: 11,
              font:
                boldFont,
              color:
                warmGold,
            },
          );

          drawWrappedText({
            text:
              takeaway.takeaway_text,
            fontSize: 11,
            color:
              darkGreen,
            lineHeight: 17,
            indent: 22,
          });

          y -= 7;
        },
      );
    }

    /*
     * Personal learning note
     */
    if (
      report.personal_learning_note
    ) {
      y -= 10;

      ensureSpace(60);

      page.drawText(
        'Personal learning note',
        {
          x: margin,
          y,
          size: 16,
          font:
            boldFont,
          color:
            darkGreen,
        },
      );

      y -= 28;

      drawWrappedText({
        text:
          report.personal_learning_note,
        fontSize: 11,
        color:
          darkGreen,
        lineHeight: 17,
      });
    }

    /*
     * Closing note
     */
    y -= 18;

    ensureSpace(80);

    page.drawRectangle({
      x: margin,
      y:
        y - 60,
      width:
        contentWidth,
      height: 60,
      color:
        panelBackground,
    });

    page.drawText(
      'Professional learning record',
      {
        x:
          margin + 16,
        y:
          y - 20,
        size: 10,
        font:
          boldFont,
        color:
          warmGold,
      },
    );

    page.drawText(
      'Presenter: Robyn Papworth, Developmental Educator and Certified Trainer',
      {
        x:
          margin + 16,
        y:
          y - 39,
        size: 9,
        font:
          regularFont,
        color:
          darkGreen,
      },
    );

    const pdfBytes =
      await pdfDocument.save();

    const filename =
      `${safeFileName(
        report.report_name,
      )}.pdf`;

    return new NextResponse(
      Buffer.from(
        pdfBytes,
      ),
      {
        status: 200,
        headers: {
          'Content-Type':
            'application/pdf',

          'Content-Disposition':
            `attachment; filename="${filename}"`,

          'Cache-Control':
            'private, no-store',
        },
      },
    );
  } catch (error) {
    console.error(
      'Professional Learning Report PDF generation failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your Professional Learning Report could not be generated. Please try again.',
      },
      {
        status: 500,
      },
    );
  }
}