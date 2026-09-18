import TopicLearningPage from '@/components/rc/topics/TopicLearningPage';
import { loadRcTopicPage } from '@/lib/rcTopicPageData';

import {
  completePrerequisite,
  saveReflection,
  saveTakeaways,
} from './actions';

export const dynamic = 'force-dynamic';

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const data = await loadRcTopicPage(slug);

  return (
    <TopicLearningPage
      {...data}
      query={query}
      completePrerequisite={completePrerequisite}
      saveTakeaways={saveTakeaways}
      saveReflection={saveReflection}
    />
  );
}
