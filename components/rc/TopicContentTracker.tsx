'use client';

import {
  useEffect,
  useState,
} from 'react';

type ContentItem = {
  id: string;
  content_type:
    | 'video'
    | 'resource'
    | 'text';
  title: string;
  url: string | null;
  body_text: string | null;
};

type Props = {
  topicId: string;
  content: ContentItem[];
};

type ResourceAudience =
  | 'educator'
  | 'manager'
  | 'family'
  | 'shared';

function getAudience(
  item: ContentItem,
): ResourceAudience {
  const searchable =
    `${item.title} ${item.url ?? ''}`
      .toLowerCase();

  if (
    searchable.includes(
      'educator',
    )
  ) {
    return 'educator';
  }

  if (
    searchable.includes(
      'manager',
    ) ||
    searchable.includes(
      'leadership',
    )
  ) {
    return 'manager';
  }

  if (
    searchable.includes(
      'family',
    ) ||
    searchable.includes(
      'families',
    ) ||
    searchable.includes(
      'parent',
    )
  ) {
    return 'family';
  }

  return 'shared';
}

function getAudienceLabel(
  audience: ResourceAudience,
) {
  switch (audience) {
    case 'educator':
      return 'Educator resource';

    case 'manager':
      return 'Manager resource';

    case 'family':
      return 'Family resource';

    default:
      return 'Shared resource';
  }
}

function getAudienceDescription(
  audience: ResourceAudience,
) {
  switch (audience) {
    case 'educator':
      return 'Use this in the room to support your practice and notice what changes.';

    case 'manager':
      return 'Use this to look at routines, environment, team support and shared practice.';

    case 'family':
      return 'Use this to support conversations and build shared understanding with families.';

    default:
      return 'A practical resource that can support learning and discussion across your team.';
  }
}

function getAudienceClasses(
  audience: ResourceAudience,
) {
  switch (audience) {
    case 'educator':
      return {
        badge:
          'bg-[#E4F4EE] text-[#232150]',
        border:
          'border-[#61B694]',
        accent:
          'bg-[#61B694]',
      };

    case 'manager':
      return {
        badge:
          'bg-[#F2E7F0] text-[#87317E]',
        border:
          'border-[#87317E]',
        accent:
          'bg-[#87317E]',
      };

    case 'family':
      return {
        badge:
          'bg-[#F6F0E2] text-[#232150]',
        border:
          'border-[#DCCDA8]',
        accent:
          'bg-[#DCCDA8]',
      };

    default:
      return {
        badge:
          'bg-[#F0EFF6] text-[#232150]',
        border:
          'border-[#D8D4E4]',
        accent:
          'bg-[#232150]',
      };
  }
}

function isPdf(
  item: ContentItem,
) {
  return Boolean(
    item.url
      ?.toLowerCase()
      .split('?')[0]
      .endsWith('.pdf'),
  );
}

export default function TopicContentTracker({
  topicId,
  content,
}: Props) {
  const [
    openingId,
    setOpeningId,
  ] = useState<string | null>(
    null,
  );

  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');

  const [
    recordedIds,
    setRecordedIds,
  ] = useState<Set<string>>(
    new Set(),
  );

  const recordOpen =
    async (
      item: ContentItem,
    ) => {
      if (
        recordedIds.has(
          item.id,
        )
      ) {
        return;
      }

      const response =
        await fetch(
          '/api/rc-content/open',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify({
                topicId,
                contentId:
                  item.id,
              }),
          },
        );

      const result =
        (await response.json()) as {
          success?: boolean;
          error?: string;
        };

      if (
        !response.ok ||
        result.success !== true
      ) {
        throw new Error(
          result.error ||
            'This resource could not be recorded.',
        );
      }

      setRecordedIds(
        (current) => {
          const next =
            new Set(
              current,
            );

          next.add(
            item.id,
          );

          return next;
        },
      );
    };

  useEffect(() => {
    const visiblePdfs =
      content.filter(
        (item) =>
          item.content_type ===
            'resource' &&
          isPdf(item) &&
          Boolean(
            item.url,
          ),
      );

    const recordVisiblePdfs =
      async () => {
        for (
          const item of visiblePdfs
        ) {
          try {
            await recordOpen(
              item,
            );
          } catch (error) {
            console.error(
              'Regulator Champions PDF view tracking failed:',
              error,
            );
          }
        }
      };

    void recordVisiblePdfs();

    // We only want to register the
    // PDFs supplied to this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    topicId,
    content,
  ]);

  const openContent =
    async (
      item: ContentItem,
    ) => {
      if (!item.url) {
        return;
      }

      setOpeningId(
        item.id,
      );

      setErrorMessage('');

      try {
        await recordOpen(
          item,
        );

        window.open(
          item.url,
          '_blank',
          'noopener,noreferrer',
        );
      } catch (error) {
        console.error(
          'Regulator Champions content open failed:',
          error,
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'This resource could not be opened.',
        );
      } finally {
        setOpeningId(
          null,
        );
      }
    };

  return (
    <div className="space-y-6">
      {content.map(
        (item) => {
          if (
            item.content_type ===
            'text'
          ) {
            return (
              <article
                key={
                  item.id
                }
                className="rounded-3xl border border-[#E4E1EA] bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
                  Learning note
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#232150]">
                  {item.title}
                </h3>

                {item.body_text ? (
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#575570]">
                    {
                      item.body_text
                    }
                  </p>
                ) : null}
              </article>
            );
          }

          if (
            item.content_type ===
            'video'
          ) {
            return (
              <article
                key={
                  item.id
                }
                className="overflow-hidden rounded-3xl border border-[#D8D4E4] bg-white shadow-sm"
              >
                <div className="h-2 bg-[#87317E]" />

                <div className="p-6">
                  <span className="inline-flex rounded-full bg-[#F2E7F0] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#87317E]">
                    Recording
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-[#232150]">
                    {
                      item.title
                    }
                  </h3>

                  {item.body_text ? (
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#575570]">
                      {
                        item.body_text
                      }
                    </p>
                  ) : (
                    <p className="mt-3 text-sm leading-7 text-[#575570]">
                      Watch this learning
                      session before moving
                      into your takeaways
                      and reflection.
                    </p>
                  )}

                  {item.url ? (
                    <button
                      type="button"
                      disabled={
                        openingId ===
                        item.id
                      }
                      onClick={() =>
                        void openContent(
                          item,
                        )
                      }
                      className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#232150] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#19173F] disabled:cursor-wait disabled:opacity-60"
                    >
                      {openingId ===
                      item.id
                        ? 'Opening…'
                        : 'Watch recording'}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          }

          const audience =
            getAudience(
              item,
            );

          const classes =
            getAudienceClasses(
              audience,
            );

          const pdf =
            isPdf(
              item,
            );

          return (
            <article
              key={
                item.id
              }
              className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${classes.border}`}
            >
              <div
                className={`h-2 ${classes.accent}`}
              />

              <div className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${classes.badge}`}
                    >
                      {getAudienceLabel(
                        audience,
                      )}
                    </span>

                    <h3 className="mt-4 text-xl font-bold leading-snug text-[#232150]">
                      {
                        item.title
                      }
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#575570]">
                      {item.body_text ||
                        getAudienceDescription(
                          audience,
                        )}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex rounded-full bg-[#FAF9FC] px-3 py-1 text-xs font-bold text-[#6D6A7F]">
                      {pdf
                        ? 'PDF resource'
                        : 'Resource'}
                    </span>
                  </div>
                </div>

                {pdf &&
                item.url ? (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8D4E4] bg-[#F7F6FA]">
                    <div className="border-b border-[#D8D4E4] bg-white px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6D6A7F]">
                        Resource preview
                      </p>
                    </div>

                    <iframe
                      src={
                        item.url
                      }
                      title={`${item.title} preview`}
                      loading="lazy"
                      className="h-[70vh] min-h-[520px] w-full bg-white"
                    />
                  </div>
                ) : null}

                {item.url ? (
                  <button
                    type="button"
                    disabled={
                      openingId ===
                      item.id
                    }
                    onClick={() =>
                      void openContent(
                        item,
                      )
                    }
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#232150] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#19173F] disabled:cursor-wait disabled:opacity-60"
                  >
                    {openingId ===
                    item.id
                      ? 'Opening…'
                      : pdf
                        ? 'Open PDF full screen'
                        : 'Open resource'}
                  </button>
                ) : null}
              </div>
            </article>
          );
        },
      )}

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}