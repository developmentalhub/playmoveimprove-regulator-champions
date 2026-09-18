export type Topic = {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
  why_this_matters: string | null;
  reflection_question: string | null;
  live_date: string | null;
  zoom_url: string | null;
  status: string;
};

export type TopicContent = {
  id: string;
  topic_id: string;
  content_type: 'video' | 'resource' | 'text';
  title: string;
  url: string | null;
  body_text: string | null;
  sort_order: number;
  status: string;
};

export type TopicProgress = {
  id: string;
  member_id: string;
  topic_id: string;
  started_at: string | null;
  video_completed: boolean;
  resources_reviewed: boolean;
  prerequisite_completed: boolean;
  reflection_completed: boolean;
  completed_at: string | null;
};

export type PrerequisiteFeedback = {
  id: string;
  reflex_observations: string | null;
  mat_time_thinking: string | null;
  question_for_robyn: string | null;
  completed_at: string | null;
};

export type Takeaway = {
  id: string;
  takeaway_number: number;
  takeaway_text: string;
  shared_with_manager: boolean;
  include_in_professional_report: boolean;
};

export type Reflection = {
  id: string;
  main_reflection: string | null;
  what_will_you_try: string | null;
  what_will_you_look_for: string | null;
  evidence_you_could_collect: string | null;
  status: string;
  completed_at: string | null;
};

export type Certificate = {
  id: string;
  certificate_file_path: string | null;
  completion_date: string | null;
};

export type NextTopic = {
  id: string;
  slug: string;
  sort_order: number;
} | null;
