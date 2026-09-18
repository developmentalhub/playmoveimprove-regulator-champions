import {
  NextResponse,
} from 'next/server';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
} from '@/lib/rcAuth';

export async function POST(
  request: Request,
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

    const body =
      await request.json();

    const topicId =
      typeof body.topicId ===
      'string'
        ? body.topicId
        : '';

    const contentId =
      typeof body.contentId ===
      'string'
        ? body.contentId
        : '';

    if (
      !topicId ||
      !contentId
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This content could not be identified.',
        },
        {
          status: 400,
        },
      );
    }

    const supabase =
      createRcAdminClient();

    const {
      data: content,
      error: contentError,
    } = await supabase
      .from(
        'rc_topic_content',
      )
      .select(
        `
          id,
          topic_id,
          content_type,
          status
        `,
      )
      .eq(
        'id',
        contentId,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .eq(
        'status',
        'published',
      )
      .maybeSingle();

    if (
      contentError ||
      !content
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This content is not available.',
        },
        {
          status: 404,
        },
      );
    }

    const now =
      new Date()
        .toISOString();

    const {
      data:
        existingView,
    } = await supabase
      .from(
        'rc_content_views',
      )
      .select(
        'id',
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'content_id',
        contentId,
      )
      .maybeSingle();

    if (existingView) {
      await supabase
        .from(
          'rc_content_views',
        )
        .update({
          last_opened_at:
            now,
        })
        .eq(
          'id',
          existingView.id,
        );
    } else {
      await supabase
        .from(
          'rc_content_views',
        )
        .insert({
          member_id:
            auth.member.id,

          content_id:
            contentId,

          first_opened_at:
            now,

          last_opened_at:
            now,
        });
    }

    const {
      data:
        topicContent,
    } = await supabase
      .from(
        'rc_topic_content',
      )
      .select(
        'id, content_type',
      )
      .eq(
        'topic_id',
        topicId,
      )
      .eq(
        'status',
        'published',
      );

    const resourceIds =
      (
        topicContent ??
        []
      )
        .filter(
          (item) =>
            item.content_type ===
            'resource',
        )
        .map(
          (item) =>
            item.id,
        );

    let resourcesReviewed =
      resourceIds.length ===
      0;

    if (
      resourceIds.length >
      0
    ) {
      const {
        data:
          resourceViews,
      } = await supabase
        .from(
          'rc_content_views',
        )
        .select(
          'content_id',
        )
        .eq(
          'member_id',
          auth.member.id,
        )
        .in(
          'content_id',
          resourceIds,
        );

      const opened =
        new Set(
          (
            resourceViews ??
            []
          ).map(
            (item) =>
              item.content_id,
          ),
        );

      resourcesReviewed =
        resourceIds.every(
          (id) =>
            opened.has(
              id,
            ),
        );
    }

    const {
      data:
        existingProgress,
    } = await supabase
      .from(
        'rc_topic_progress',
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
      existingProgress
    ) {
      await supabase
        .from(
          'rc_topic_progress',
        )
        .update({
          started_at:
            now,

          resources_reviewed:
            resourcesReviewed,
        })
        .eq(
          'id',
          existingProgress.id,
        );
    } else {
      await supabase
        .from(
          'rc_topic_progress',
        )
        .insert({
          member_id:
            auth.member.id,

          topic_id:
            topicId,

          started_at:
            now,

          resources_reviewed:
            resourcesReviewed,
        });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      'Could not track Regulator Champions content:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'This content could not be opened.',
      },
      {
        status: 500,
      },
    );
  }
}