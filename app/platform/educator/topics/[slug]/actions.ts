'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
} from '@/lib/rcAuth';

async function reconcileTopicCompletion(
  memberId: string,
  topicId: string,
) {
  const supabase = createRcAdminClient();

  const { data: progress, error } =
    await supabase
      .from('rc_topic_progress')
      .select(`
        id,
        video_completed,
        resources_reviewed,
        prerequisite_completed,
        reflection_completed,
        completed_at
      `)
      .eq('member_id', memberId)
      .eq('topic_id', topicId)
      .maybeSingle();

  if (error || !progress) {
    return;
  }

  const { data: topic } =
    await supabase
      .from('rc_topics')
      .select('sort_order')
      .eq('id', topicId)
      .maybeSingle();

  const requiresPrerequisite =
    topic?.sort_order === 2;

  const shouldBeComplete =
    Boolean(
      progress.video_completed &&
        progress.resources_reviewed &&
        progress.reflection_completed &&
        (!requiresPrerequisite ||
          progress.prerequisite_completed),
    );

  if (
    shouldBeComplete &&
    !progress.completed_at
  ) {
    await supabase
      .from('rc_topic_progress')
      .update({
        completed_at:
          new Date().toISOString(),
      })
      .eq('id', progress.id);
  }
}

export async function completePrerequisite(
  formData: FormData,
) {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect('/member-access');
  }

  const topicId =
    String(
      formData.get('topicId') || '',
    );

  const slug =
    String(
      formData.get('slug') || '',
    );

  const reflexObservations =
    String(
      formData.get(
        'reflexObservations',
      ) || '',
    ).trim();

  const matTimeThinking =
    String(
      formData.get(
        'matTimeThinking',
      ) || '',
    ).trim();

  const questionForRobyn =
    String(
      formData.get(
        'questionForRobyn',
      ) || '',
    ).trim();

  if (
    !topicId ||
    !reflexObservations ||
    !matTimeThinking
  ) {
    redirect(
      `/platform/educator/topics/${slug}?error=prerequisite`,
    );
  }

  const supabase =
    createRcAdminClient();

  const { data: topic } =
    await supabase
      .from('rc_topics')
      .select('sort_order')
      .eq('id', topicId)
      .maybeSingle();

  if (
    !topic ||
    topic.sort_order !== 2
  ) {
    redirect(
      `/platform/educator/topics/${slug}`,
    );
  }

  const now =
    new Date().toISOString();

  const {
    data: existingFeedback,
  } = await supabase
    .from(
      'rc_prerequisite_feedback',
    )
    .select('id')
    .eq(
      'member_id',
      auth.member.id,
    )
    .eq(
      'topic_id',
      topicId,
    )
    .maybeSingle();

  const feedbackValues = {
    reflex_observations:
      reflexObservations,
    mat_time_thinking:
      matTimeThinking,
    question_for_robyn:
      questionForRobyn || null,
    completed_at: now,
    updated_at: now,
  };

  if (existingFeedback) {
    await supabase
      .from(
        'rc_prerequisite_feedback',
      )
      .update(feedbackValues)
      .eq(
        'id',
        existingFeedback.id,
      );
  } else {
    await supabase
      .from(
        'rc_prerequisite_feedback',
      )
      .insert({
        member_id:
          auth.member.id,
        service_id:
          auth.service.id,
        topic_id:
          topicId,
        ...feedbackValues,
      });
  }

  const { data: progress } =
    await supabase
      .from('rc_topic_progress')
      .select('id')
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .maybeSingle();

  if (progress) {
    await supabase
      .from('rc_topic_progress')
      .update({
        prerequisite_completed:
          true,
      })
      .eq('id', progress.id);
  } else {
    await supabase
      .from('rc_topic_progress')
      .insert({
        member_id:
          auth.member.id,
        topic_id:
          topicId,
        started_at: now,
        prerequisite_completed:
          true,
      });
  }

  await reconcileTopicCompletion(
    auth.member.id,
    topicId,
  );

  revalidatePath(
    `/platform/educator/topics/${slug}`,
  );

  revalidatePath(
    '/platform/educator/dashboard',
  );

  redirect(
    `/platform/educator/topics/${slug}?saved=prerequisite`,
  );
}

export async function saveTakeaways(
  formData: FormData,
) {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect('/member-access');
  }

  const topicId =
    String(
      formData.get('topicId') || '',
    );

  const slug =
    String(
      formData.get('slug') || '',
    );

  const intent =
    String(
      formData.get('intent') ||
        'draft',
    );

  const rows = [
    1,
    2,
    3,
  ].map((number) => ({
    number,

    text:
      String(
        formData.get(
          `takeaway${number}`,
        ) || '',
      ).trim(),

    share:
      formData.get(
        `share${number}`,
      ) === 'on',

    report:
      formData.get(
        `report${number}`,
      ) === 'on',
  }));

  if (!topicId) {
    redirect(
      `/platform/educator/topics/${slug}?error=takeaways`,
    );
  }

  const completing =
    intent === 'complete';

  if (
    completing &&
    rows.some(
      (row) => !row.text,
    )
  ) {
    redirect(
      `/platform/educator/topics/${slug}?error=takeaways`,
    );
  }

  const supabase =
    createRcAdminClient();

  for (const row of rows) {
    const { data: existing } =
      await supabase
        .from(
          'rc_learning_takeaways',
        )
        .select('id')
        .eq(
          'member_id',
          auth.member.id,
        )
        .eq(
          'topic_id',
          topicId,
        )
        .eq(
          'takeaway_number',
          row.number,
        )
        .maybeSingle();

    if (existing) {
      await supabase
        .from(
          'rc_learning_takeaways',
        )
        .update({
          takeaway_text:
            row.text,
          shared_with_manager:
            row.share,
          include_in_professional_report:
            row.report,
        })
        .eq(
          'id',
          existing.id,
        );
    } else if (
      row.text ||
      row.share ||
      row.report
    ) {
      await supabase
        .from(
          'rc_learning_takeaways',
        )
        .insert({
          member_id:
            auth.member.id,
          topic_id:
            topicId,
          takeaway_number:
            row.number,
          takeaway_text:
            row.text,
          shared_with_manager:
            row.share,
          include_in_professional_report:
            row.report,
        });
    }
  }

  const { data: progress } =
    await supabase
      .from('rc_topic_progress')
      .select('id')
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .maybeSingle();

  if (progress) {
    if (completing) {
      await supabase
        .from(
          'rc_topic_progress',
        )
        .update({
          video_completed:
            true,
        })
        .eq(
          'id',
          progress.id,
        );
    }
  } else {
    await supabase
      .from('rc_topic_progress')
      .insert({
        member_id:
          auth.member.id,
        topic_id:
          topicId,
        started_at:
          new Date().toISOString(),
        video_completed:
          completing,
      });
  }

  if (completing) {
    await reconcileTopicCompletion(
      auth.member.id,
      topicId,
    );
  }

  revalidatePath(
    `/platform/educator/topics/${slug}`,
  );

  revalidatePath(
    '/platform/educator/dashboard',
  );

  redirect(
    `/platform/educator/topics/${slug}?saved=${
      completing
        ? 'takeaways'
        : 'takeaways-draft'
    }`,
  );
}

export async function saveReflection(
  formData: FormData,
) {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect('/member-access');
  }

  const topicId =
    String(
      formData.get('topicId') || '',
    );

  const slug =
    String(
      formData.get('slug') || '',
    );

  const intent =
    String(
      formData.get('intent') ||
        'draft',
    );

  const mainReflection =
    String(
      formData.get(
        'mainReflection',
      ) || '',
    ).trim();

  const whatWillYouTry =
    String(
      formData.get(
        'whatWillYouTry',
      ) || '',
    ).trim();

  const whatWillYouLookFor =
    String(
      formData.get(
        'whatWillYouLookFor',
      ) || '',
    ).trim();

  const evidence =
    String(
      formData.get('evidence') ||
        '',
    ).trim();

  const completing =
    intent === 'complete';

  if (!topicId) {
    redirect(
      `/platform/educator/topics/${slug}?error=reflection`,
    );
  }

  if (
    completing &&
    (
      !mainReflection ||
      !whatWillYouTry ||
      !whatWillYouLookFor ||
      !evidence
    )
  ) {
    redirect(
      `/platform/educator/topics/${slug}?error=reflection`,
    );
  }

  const supabase =
    createRcAdminClient();

  const { data: existing } =
    await supabase
      .from('rc_reflections')
      .select(
        'id, status, completed_at',
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .eq(
        'reflection_type',
        'educator',
      )
      .maybeSingle();

  const now =
    new Date().toISOString();

  const preserveComplete =
    existing?.status ===
      'complete' &&
    !completing;

  const nextStatus =
    completing ||
    preserveComplete
      ? 'complete'
      : 'draft';

  const nextCompletedAt =
    completing
      ? now
      : preserveComplete
        ? existing?.completed_at ||
          now
        : null;

  const values = {
    main_reflection:
      mainReflection,
    what_will_you_try:
      whatWillYouTry,
    what_will_you_look_for:
      whatWillYouLookFor,
    evidence_you_could_collect:
      evidence,
    status:
      nextStatus,
    completed_at:
      nextCompletedAt,
  };

  if (existing) {
    await supabase
      .from('rc_reflections')
      .update(values)
      .eq(
        'id',
        existing.id,
      );
  } else {
    await supabase
      .from('rc_reflections')
      .insert({
        member_id:
          auth.member.id,
        service_id:
          auth.service.id,
        topic_id:
          topicId,
        reflection_type:
          'educator',
        ...values,
      });
  }

  const { data: progress } =
    await supabase
      .from('rc_topic_progress')
      .select('id')
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .maybeSingle();

  if (progress) {
    if (completing) {
      await supabase
        .from(
          'rc_topic_progress',
        )
        .update({
          reflection_completed:
            true,
        })
        .eq(
          'id',
          progress.id,
        );
    }
  } else {
    await supabase
      .from('rc_topic_progress')
      .insert({
        member_id:
          auth.member.id,
        topic_id:
          topicId,
        started_at:
          now,
        reflection_completed:
          completing,
      });
  }

  if (completing) {
    await reconcileTopicCompletion(
      auth.member.id,
      topicId,
    );
  }

  revalidatePath(
    `/platform/educator/topics/${slug}`,
  );

  revalidatePath(
    '/platform/educator/dashboard',
  );

  redirect(
    `/platform/educator/topics/${slug}?saved=${
      completing
        ? 'reflection'
        : 'reflection-draft'
    }`,
  );
}