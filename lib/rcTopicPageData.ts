import { redirect } from 'next/navigation';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

import type {
  Certificate,
  NextTopic,
  PrerequisiteFeedback,
  Reflection,
  Takeaway,
  Topic,
  TopicContent,
  TopicProgress,
} from '@/components/rc/topics/types';

export type TopicPageData = {
  topic: Topic;
  progress: TopicProgress | null;
  takeaways: Takeaway[];
  reflection: Reflection | null;
  certificate: Certificate | null;
  prerequisiteFeedback: PrerequisiteFeedback | null;
  prerequisiteResourceUrl: string | null;
  videoItems: TopicContent[];
  resourceItems: TopicContent[];
  nextTopic: NextTopic;
  prerequisiteComplete: boolean;
  topicComplete: boolean;
};

async function ensureTopicStarted(memberId: string, topicId: string) {
  const supabase = createRcAdminClient();

  const { data: existing } = await supabase
    .from('rc_topic_progress')
    .select('id, started_at')
    .eq('member_id', memberId)
    .eq('topic_id', topicId)
    .maybeSingle();

  if (existing) {
    if (!existing.started_at) {
      await supabase
        .from('rc_topic_progress')
        .update({ started_at: new Date().toISOString() })
        .eq('id', existing.id);
    }
    return;
  }

  await supabase.from('rc_topic_progress').insert({
    member_id: memberId,
    topic_id: topicId,
    started_at: new Date().toISOString(),
  });
}

export async function loadRcTopicPage(slug: string): Promise<TopicPageData> {
  const auth = await getCurrentRcAuthContext();
  if (!auth) redirect('/member-access');

  await touchRcMemberLastSeen(auth.member.id);

  const supabase = createRcAdminClient();

  const { data: topic, error: topicError } = await supabase
    .from('rc_topics')
    .select(`
      id,
      title,
      slug,
      sort_order,
      why_this_matters,
      reflection_question,
      live_date,
      zoom_url,
      status
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (topicError || !topic) {
    redirect('/platform/educator/dashboard');
  }

  const typedTopic = topic as Topic;

  const { data: allTopics } = await supabase
    .from('rc_topics')
    .select('id, slug, sort_order')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  const orderedTopics = allTopics ?? [];
  const currentIndex = orderedTopics.findIndex((item) => item.id === typedTopic.id);

  if (currentIndex > 0 && auth.member.role !== 'manager') {
    const previousTopic = orderedTopics[currentIndex - 1];

    const { data: previousProgress } = await supabase
      .from('rc_topic_progress')
      .select('completed_at')
      .eq('member_id', auth.member.id)
      .eq('topic_id', previousTopic.id)
      .maybeSingle();

    if (!previousProgress?.completed_at) {
      redirect('/platform/educator/dashboard');
    }
  }

  await ensureTopicStarted(auth.member.id, typedTopic.id);

  const [
    contentResponse,
    progressResponse,
    takeawayResponse,
    reflectionResponse,
    certificateResponse,
    prerequisiteFeedbackResponse,
  ] = await Promise.all([
    supabase
      .from('rc_topic_content')
      .select(`
        id,
        topic_id,
        content_type,
        title,
        url,
        body_text,
        sort_order,
        status
      `)
      .eq('topic_id', typedTopic.id)
      .eq('status', 'published')
      .order('sort_order', { ascending: true }),

    supabase
      .from('rc_topic_progress')
      .select(`
        id,
        member_id,
        topic_id,
        started_at,
        video_completed,
        resources_reviewed,
        prerequisite_completed,
        reflection_completed,
        completed_at
      `)
      .eq('member_id', auth.member.id)
      .eq('topic_id', typedTopic.id)
      .maybeSingle(),

    supabase
      .from('rc_learning_takeaways')
      .select(`
        id,
        takeaway_number,
        takeaway_text,
        shared_with_manager,
        include_in_professional_report
      `)
      .eq('member_id', auth.member.id)
      .eq('topic_id', typedTopic.id)
      .order('takeaway_number', { ascending: true }),

    supabase
      .from('rc_reflections')
      .select(`
        id,
        main_reflection,
        what_will_you_try,
        what_will_you_look_for,
        evidence_you_could_collect,
        status,
        completed_at
      `)
      .eq('member_id', auth.member.id)
      .eq('topic_id', typedTopic.id)
      .eq('reflection_type', 'educator')
      .maybeSingle(),

    supabase
      .from('rc_certificates')
      .select('id, certificate_file_path, completion_date')
      .eq('member_id', auth.member.id)
      .eq('topic_id', typedTopic.id)
      .maybeSingle(),

    supabase
      .from('rc_prerequisite_feedback')
      .select(`
        id,
        reflex_observations,
        mat_time_thinking,
        question_for_robyn,
        completed_at
      `)
      .eq('member_id', auth.member.id)
      .eq('topic_id', typedTopic.id)
      .maybeSingle(),
  ]);

  const content = (contentResponse.data ?? []) as TopicContent[];
  const progress = progressResponse.data as TopicProgress | null;
  const takeaways = (takeawayResponse.data ?? []) as Takeaway[];
  const reflection = reflectionResponse.data as Reflection | null;
  const certificate = certificateResponse.data as Certificate | null;
  const prerequisiteFeedback = prerequisiteFeedbackResponse.data as PrerequisiteFeedback | null;

  const nextTopic: NextTopic =
    currentIndex >= 0 && currentIndex < orderedTopics.length - 1
      ? orderedTopics[currentIndex + 1]
      : null;

  const isTopicTwo = typedTopic.sort_order === 2;
  const prerequisiteItem = isTopicTwo
    ? content.find(
        (item) => item.url === '/pdf/reflexes-regulation-before-reading-ebook.pdf',
      ) ?? null
    : null;

  const prerequisiteComplete =
    !isTopicTwo || Boolean(progress?.prerequisite_completed);

  const videoItems = content.filter((item) => item.content_type === 'video');
  const resourceItems = content.filter(
    (item) => item.content_type !== 'video' && item.id !== prerequisiteItem?.id,
  );

  if (resourceItems.length === 0 && progress && !progress.resources_reviewed) {
    await supabase
      .from('rc_topic_progress')
      .update({ resources_reviewed: true })
      .eq('id', progress.id);

    progress.resources_reviewed = true;
  }

  if (
    progress?.video_completed &&
    progress?.resources_reviewed &&
    progress?.reflection_completed &&
    prerequisiteComplete &&
    !progress.completed_at
  ) {
    const completedAt = new Date().toISOString();

    await supabase
      .from('rc_topic_progress')
      .update({ completed_at: completedAt })
      .eq('id', progress.id);

    progress.completed_at = completedAt;
  }

  const topicComplete = Boolean(
    progress?.video_completed &&
      progress?.resources_reviewed &&
      progress?.reflection_completed &&
      prerequisiteComplete &&
      progress?.completed_at,
  );

  return {
    topic: typedTopic,
    progress,
    takeaways,
    reflection,
    certificate,
    prerequisiteFeedback,
    prerequisiteResourceUrl: prerequisiteItem?.url ?? null,
    videoItems,
    resourceItems,
    nextTopic,
    prerequisiteComplete,
    topicComplete,
  };
}
