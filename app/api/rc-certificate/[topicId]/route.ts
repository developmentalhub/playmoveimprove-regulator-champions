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

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{
    topicId: string;
  }>;
};

function formatCompletionDate(
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

function centreTextX({
  text,
  font,
  fontSize,
  pageWidth,
}: {
  text: string;
  font: {
    widthOfTextAtSize: (
      text: string,
      size: number,
    ) => number;
  };
  fontSize: number;
  pageWidth: number;
}) {
  const textWidth =
    font.widthOfTextAtSize(
      text,
      fontSize,
    );

  return (
    pageWidth - textWidth
  ) / 2;
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
  const words =
    text.split(/\s+/);

  const lines:
    string[] = [];

  let currentLine = '';

  for (
    const word of words
  ) {
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
      width <= maxWidth
    ) {
      currentLine =
        testLine;
    } else {
      if (currentLine) {
        lines.push(
          currentLine,
        );
      }

      currentLine =
        word;
    }
  }

  if (currentLine) {
    lines.push(
      currentLine,
    );
  }

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

    const {
      topicId,
    } = await params;

    if (!topicId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The topic could not be identified.',
        },
        {
          status: 400,
        },
      );
    }

    const supabase =
      createRcAdminClient();

    const [
      topicResponse,
      progressResponse,
    ] = await Promise.all([
      supabase
        .from(
          'rc_topics',
        )
        .select(
          `
            id,
            title,
            status
          `,
        )
        .eq(
          'id',
          topicId,
        )
        .maybeSingle(),

      supabase
        .from(
          'rc_topic_progress',
        )
        .select(
          `
            id,
            video_completed,
            resources_reviewed,
            reflection_completed,
            completed_at
          `,
        )
        .eq(
          'member_id',
          auth.member.id,
        )
        .eq(
          'topic_id',
          topicId,
        )
        .maybeSingle(),
    ]);

    if (
      topicResponse.error ||
      !topicResponse.data
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This topic could not be found.',
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

    if (
      progressResponse.error ||
      !progress
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your topic progress could not be found.',
        },
        {
          status: 404,
        },
      );
    }

    const complete =
      Boolean(
        progress.video_completed &&
        progress.resources_reviewed &&
        progress.reflection_completed &&
        progress.completed_at,
      );

    if (!complete) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Complete all topic steps before downloading your certificate.',
        },
        {
          status: 403,
        },
      );
    }

    const educatorName =
      auth.member.full_name?.trim() ||
      auth.user.email ||
      'Regulator Champions Educator';

    const serviceName =
      auth.service.service_name;

    const topicTitle =
      topic.title;

    const completionDate =
      progress.completed_at;

    const formattedDate =
      formatCompletionDate(
        completionDate,
      );

    /*
     * Create the PDF.
     */
    const pdfDocument =
      await PDFDocument.create();

    pdfDocument.setTitle(
      `Regulator Champions: ${topicTitle}`,
    );

    pdfDocument.setAuthor(
      'Play Move Improve',
    );

    pdfDocument.setSubject(
      'Regulator Champions Professional Development Certificate',
    );

    pdfDocument.setCreator(
      'Play Move Improve',
    );

    const page =
      pdfDocument.addPage([
        841.89,
        595.28,
      ]);

    const {
      width,
      height,
    } = page.getSize();

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

    const softGreen =
      rgb(
        0.94,
        0.96,
        0.95,
      );

    const warmBackground =
      rgb(
        0.98,
        0.97,
        0.95,
      );

    const grey =
      rgb(
        0.38,
        0.46,
        0.42,
      );

    /*
     * Background.
     */
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color:
        warmBackground,
    });

    /*
     * Outer border.
     */
    page.drawRectangle({
      x: 30,
      y: 30,
      width:
        width - 60,
      height:
        height - 60,
      borderColor:
        darkGreen,
      borderWidth: 2,
    });

    page.drawRectangle({
      x: 39,
      y: 39,
      width:
        width - 78,
      height:
        height - 78,
      borderColor:
        warmGold,
      borderWidth: 0.8,
    });

    /*
     * Small top label.
     */
    const brandLabel =
      'PLAY MOVE IMPROVE';

    page.drawText(
  brandLabel,
  {
    x:
      centreTextX({
        text:
          brandLabel,
        font:
          boldFont,
        fontSize: 11,
        pageWidth:
          width,
      }),

    y:
      height - 92,

    size: 11,

    font:
      boldFont,

    color:
      warmGold,
  },
);

    /*
     * Main title.
     */
    const certificateTitle =
      'Certificate of Professional Learning';

    page.drawText(
      certificateTitle,
      {
        x:
          centreTextX({
            text:
              certificateTitle,
            font:
              boldFont,
            fontSize: 26,
            pageWidth:
              width,
          }),

        y:
          height - 135,

        size: 26,

        font:
          boldFont,

        color:
          darkGreen,
      },
    );

    const intro =
      'This certificate recognises the professional learning completed by';

    page.drawText(
      intro,
      {
        x:
          centreTextX({
            text:
              intro,
            font:
              regularFont,
            fontSize: 12,
            pageWidth:
              width,
          }),

        y:
          height - 177,

        size: 12,

        font:
          regularFont,

        color:
          grey,
      },
    );

    /*
     * Educator name panel.
     */
    page.drawRectangle({
      x: 120,
      y:
        height - 250,
      width:
        width - 240,
      height: 52,
      color:
        softGreen,
    });

    const nameFontSize =
      educatorName.length >
      40
        ? 20
        : 24;

    page.drawText(
      educatorName,
      {
        x:
          centreTextX({
            text:
              educatorName,
            font:
              boldFont,
            fontSize:
              nameFontSize,
            pageWidth:
              width,
          }),

        y:
          height - 231,

        size:
          nameFontSize,

        font:
          boldFont,

        color:
          darkGreen,
      },
    );

    /*
     * Service.
     */
    const serviceLine =
      `from ${serviceName}`;

    page.drawText(
      serviceLine,
      {
        x:
          centreTextX({
            text:
              serviceLine,
            font:
              regularFont,
            fontSize: 12,
            pageWidth:
              width,
          }),

        y:
          height - 278,

        size: 12,

        font:
          regularFont,

        color:
          grey,
      },
    );

    /*
     * Topic heading.
     */
    const topicPrefix =
      'for completing';

    page.drawText(
      topicPrefix,
      {
        x:
          centreTextX({
            text:
              topicPrefix,
            font:
              regularFont,
            fontSize: 12,
            pageWidth:
              width,
          }),

        y:
          height - 319,

        size: 12,

        font:
          regularFont,

        color:
          grey,
      },
    );

    const fullTopicTitle =
      `Regulator Champions: ${topicTitle}`;

    const topicLines =
      wrapText({
        text:
          fullTopicTitle,
        font:
          boldFont,
        fontSize: 19,
        maxWidth:
          width - 220,
      });

    let topicY =
      height - 354;

    topicLines.forEach(
      (line) => {
        page.drawText(
          line,
          {
            x:
              centreTextX({
                text:
                  line,
                font:
                  boldFont,
                fontSize: 19,
                pageWidth:
                  width,
              }),

            y:
              topicY,

            size: 19,

            font:
              boldFont,

            color:
              darkGreen,
          },
        );

        topicY -= 24;
      },
    );

    /*
     * CPD information.
     */
    const cpdLine =
      '1.5 hours of professional development';

    page.drawText(
      cpdLine,
      {
        x:
          centreTextX({
            text:
              cpdLine,
            font:
              boldFont,
            fontSize: 12,
            pageWidth:
              width,
          }),

        y: 164,

        size: 12,

        font:
          boldFont,

        color:
          warmGold,
      },
    );

    const dateLine =
      `Completed ${formattedDate}`;

    page.drawText(
      dateLine,
      {
        x:
          centreTextX({
            text:
              dateLine,
            font:
              regularFont,
            fontSize: 11,
            pageWidth:
              width,
          }),

        y: 140,

        size: 11,

        font:
          regularFont,

        color:
          grey,
      },
    );

    /*
     * Presenter.
     */
    const presenter =
      'Robyn Papworth';

    page.drawText(
      presenter,
      {
        x:
          centreTextX({
            text:
              presenter,
            font:
              boldFont,
            fontSize: 12,
            pageWidth:
              width,
          }),

        y: 93,

        size: 12,

        font:
          boldFont,

        color:
          darkGreen,
      },
    );

    const presenterTitle =
      'Developmental Educator and Certified Trainer';

    page.drawText(
      presenterTitle,
      {
        x:
          centreTextX({
            text:
              presenterTitle,
            font:
              regularFont,
            fontSize: 10,
            pageWidth:
              width,
          }),

        y: 76,

        size: 10,

        font:
          regularFont,

        color:
          grey,
      },
    );

    const footer =
      'www.playmoveimprove.com';

    page.drawText(
      footer,
      {
        x:
          centreTextX({
            text:
              footer,
            font:
              regularFont,
            fontSize: 9,
            pageWidth:
              width,
          }),

        y: 51,

        size: 9,

        font:
          regularFont,

        color:
          grey,
      },
    );

    const pdfBytes =
      await pdfDocument.save();

    /*
     * Save/update the certificate
     * record in Supabase.
     *
     * We use the API route itself as
     * the permanent download path.
     */
    const certificatePath =
      `/api/rc-certificate/${topicId}`;

    const {
      data:
        existingCertificate,
    } = await supabase
      .from(
        'rc_certificates',
      )
      .select(
        'id',
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .maybeSingle();

    if (
      existingCertificate
    ) {
      const {
        error:
          certificateUpdateError,
      } = await supabase
        .from(
          'rc_certificates',
        )
        .update({
          service_id:
            auth.service.id,

          educator_name:
            educatorName,

          service_name:
            serviceName,

          topic_title:
            topicTitle,

          cpd_hours:
            1.5,

          completion_date:
            completionDate,

          certificate_file_path:
            certificatePath,
        })
        .eq(
          'id',
          existingCertificate.id,
        );

      if (
        certificateUpdateError
      ) {
        console.error(
          'Could not update certificate record:',
          certificateUpdateError,
        );
      }
    } else {
      const {
        error:
          certificateInsertError,
      } = await supabase
        .from(
          'rc_certificates',
        )
        .insert({
          member_id:
            auth.member.id,

          service_id:
            auth.service.id,

          topic_id:
            topicId,

          educator_name:
            educatorName,

          service_name:
            serviceName,

          topic_title:
            topicTitle,

          cpd_hours:
            1.5,

          completion_date:
            completionDate,

          certificate_file_path:
            certificatePath,
        });

      if (
        certificateInsertError
      ) {
        console.error(
          'Could not save certificate record:',
          certificateInsertError,
        );
      }
    }

    const filename =
      `regulator-champions-${safeFileName(
        topicTitle,
      )}-certificate.pdf`;

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
      'Regulator Champions certificate generation failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your certificate could not be generated. Please try again.',
      },
      {
        status: 500,
      },
    );
  }
}