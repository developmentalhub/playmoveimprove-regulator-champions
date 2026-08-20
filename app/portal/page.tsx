'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import MemberSignOutButton from '@/components/MemberSignOutButton';
import ProgressSummary from '@/components/feed/ProgressSummary';
import RegulationLadders from '@/components/feed/RegulationLadders';

type HubView = 'resources' | 'ladders' | 'family' | 'progress';

type FamilyBridgeCard = {
  category: string;
  title: string;
  educatorMessage: string;
  familyQuestion: string;
};

const FAMILY_BRIDGE_CARDS: FamilyBridgeCard[] = [
  {
    category: 'Drop-off',
    title: 'Keep the goodbye predictable',
    educatorMessage:
      'Today we are practising a warm, short goodbye so your child knows what happens next.',
    familyQuestion:
      'Is there anything that usually helps your child separate more comfortably at home or elsewhere?',
  },
  {
    category: 'Drop-off',
    title: 'Give the body time',
    educatorMessage:
      'Your child may need a little time to watch, settle and feel safe before joining in.',
    familyQuestion:
      'Have you noticed whether your child prefers to watch first when entering busy places?',
  },
  {
    category: 'Connection',
    title: 'Use something familiar',
    educatorMessage:
      'We are using familiar words and routines today to help the transition into the room feel smaller.',
    familyQuestion:
      'Are there words, songs or routines your child finds especially reassuring at home?',
  },
  {
    category: 'Transitions',
    title: 'Prepare before changing activities',
    educatorMessage:
      'We are giving your child an early warning before transitions so their body has time to adjust.',
    familyQuestion:
      'What helps when your child needs to stop one activity and move to another at home?',
  },
  {
    category: 'Participation',
    title: 'Joining does not always mean sitting',
    educatorMessage:
      'We are helping your child participate without expecting their body to stay completely still.',
    familyQuestion:
      'When your child is listening closely at home, what does their body usually look like?',
  },
  {
    category: 'Sensory',
    title: 'Notice the busy moments',
    educatorMessage:
      'We are noticing when noise and activity become harder for your child and adjusting support earlier.',
    familyQuestion:
      'Are there particular sounds, crowds or busy environments your child finds difficult outside the service?',
  },
  {
    category: 'Co-regulation',
    title: 'Connect before adding demands',
    educatorMessage:
      'When things feel hard today, we are slowing down and reconnecting before giving another instruction.',
    familyQuestion:
      'What usually helps your child reconnect with you when they are upset or overwhelmed?',
  },
  {
    category: 'Movement',
    title: 'Movement can help participation',
    educatorMessage:
      'We are offering purposeful movement before expecting longer periods of sitting, listening or waiting.',
    familyQuestion:
      'Does your child naturally seek movement before quieter activities at home?',
  },
  {
    category: 'End of day',
    title: 'Expect less when capacity is low',
    educatorMessage:
      'Late in the day we are reducing unnecessary demands when children are showing us they are tired.',
    familyQuestion:
      'What do you notice in your child when they have reached the end of their capacity?',
  },
];

export default function MemberPortalPage() {
  const [userEmail, setUserEmail] = useState('');
  const [hubView, setHubView] = useState<HubView>('resources');
  const [openingResource, setOpeningResource] = useState<string | null>(null);
  const [resourceError, setResourceError] = useState('');
  const [copiedCard, setCopiedCard] = useState<string | null>(null);

  const cleanedEmail = userEmail.trim().toLowerCase();

  const openMemberResource = async (file: string) => {
    setOpeningResource(file);
    setResourceError('');

    try {
      const response = await fetch('/api/member-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        url?: string;
        error?: string;
      };

      if (!response.ok || result.success !== true || !result.url) {
        throw new Error(
          result.error ?? 'The member resource could not be opened.',
        );
      }

      window.open(result.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Member resource open failed:', error);

      setResourceError(
        error instanceof Error
          ? error.message
          : 'The member resource could not be opened. Please try again.',
      );
    } finally {
      setOpeningResource(null);
    }
  };

  const copyFamilyCard = async (card: FamilyBridgeCard) => {
    const copyText = `${card.educatorMessage}

A question for you:
${card.familyQuestion}`;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopiedCard(card.title);

      window.setTimeout(() => {
        setCopiedCard((current) =>
          current === card.title ? null : current,
        );
      }, 1800);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 font-sans text-[#1C3B34]">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 border-b-2 border-[#E6E2DC] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#C29F60]">
              Regulator Champions
            </span>

            <h1 className="text-base font-bold text-[#1C3B34] md:text-lg">
              Service Practice Hub
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/platform/educator"
              className="flex min-h-12 items-center rounded-xl bg-[#657B6C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#53665A]"
            >
              Floor Deck
            </Link>

            <MemberSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-6">
        {/* WELCOME */}
        <section className="rounded-3xl border-2 border-[#1C3B34] bg-[#1C3B34] p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <span className="inline-block rounded-full bg-[#C29F60] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1C3B34]">
                Service Portal Active
              </span>

              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                Bring your team&apos;s learning back into everyday practice.
              </h2>
            </div>

            <Link
              href="/platform/manager"
              className="flex min-h-12 items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
            >
              Manager QIP Dashboard
            </Link>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90">
            Move between educator resources, Regulation Ladders, family
            continuity tools and evidence of professional learning progress.
          </p>
        </section>

        {/* EMAIL MATCHING */}
        <section className="space-y-3 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-[#1C3B34]">
              Work email for reflection matching
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-[#6A7873]">
              Enter your work email to match saved ladder progress and QIP
              reflection notes.
            </p>
          </div>

          <input
            id="practice-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            placeholder="educator@service.com.au"
            className="min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm font-medium text-[#1C3B34] outline-none focus:border-[#657B6C]"
          />
        </section>

        {/* NAVIGATION */}
        <div className="grid grid-cols-2 gap-3 text-sm font-bold lg:grid-cols-4">
          <button
            type="button"
            onClick={() => setHubView('resources')}
            className={`flex min-h-12 items-center justify-between rounded-2xl border-2 px-4 py-4 text-left transition ${
              hubView === 'resources'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
            }`}
          >
            <span>Member Resources</span>

            {hubView === 'resources' && (
              <span className="text-[#C29F60]">●</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setHubView('ladders')}
            className={`flex min-h-12 items-center justify-between rounded-2xl border-2 px-4 py-4 text-left transition ${
              hubView === 'ladders'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
            }`}
          >
            <span>Regulation Ladders</span>

            {hubView === 'ladders' && (
              <span className="text-[#C29F60]">●</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setHubView('family')}
            className={`flex min-h-12 items-center justify-between rounded-2xl border-2 px-4 py-4 text-left transition ${
              hubView === 'family'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
            }`}
          >
            <span>Family Bridge</span>

            {hubView === 'family' && (
              <span className="text-[#C29F60]">●</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setHubView('progress')}
            className={`flex min-h-12 items-center justify-between rounded-2xl border-2 px-4 py-4 text-left transition ${
              hubView === 'progress'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
            }`}
          >
            <span>My Progress</span>

            {hubView === 'progress' && (
              <span className="text-[#C29F60]">●</span>
            )}
          </button>
        </div>

        {/* MEMBER RESOURCES */}
        {hubView === 'resources' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
                <div>
                  <span className="block text-xs font-black uppercase text-[#C29F60]">
                    Ladder 1 Foundation
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                    Morning Action Plans
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    Prompts for arrivals, drop-off handovers and transition
                    setups.
                  </p>
                </div>

                <Link
                  href="/playbooks"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#657B6C] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#53665A]"
                >
                  Open Action Plans
                </Link>
              </div>

              <div className="flex flex-col justify-between space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
                <div>
                  <span className="block text-xs font-black uppercase text-[#657B6C]">
                    Ladder 2 Learning
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                    EASE Model Practices
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    Reduce sensory load and respond earlier when pressure is
                    building.
                  </p>
                </div>

                <Link
                  href="/month-2-ease"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#657B6C] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#53665A]"
                >
                  Open EASE Model
                </Link>
              </div>

              <div className="flex flex-col justify-between space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
                <div>
                  <span className="block text-xs font-black uppercase text-[#1C3B34]">
                    Practice Leadership
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                    NQS &amp; QIP Matrix
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    Connect professional learning and floor practice with NQS
                    elements and QIP evidence.
                  </p>
                </div>

                <Link
                  href="/nqs-mapping"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#284E45]"
                >
                  Open NQS Matrix
                </Link>
              </div>
            </div>

            {/* PRINTABLE VAULT */}
            <div className="space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
              <div>
                <span className="mb-1 block text-xs font-black uppercase text-[#C29F60]">
                  Printable Vault
                </span>

                <h3 className="text-xl font-bold text-[#1C3B34]">
                  Room posters and strategy card downloads
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[#6A7873]">
                  Open print-ready resources for educator rooms, leadership
                  conversations and family continuity.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                <a
                  href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-4 py-3.5 text-center text-xs font-bold text-white transition hover:bg-[#284E45]"
                >
                  Educator Routine Cards
                </a>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource('Calm-Posters.pdf')
                  }
                  disabled={openingResource !== null}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-4 py-3.5 text-center text-xs font-bold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:opacity-50"
                >
                  {openingResource === 'Calm-Posters.pdf'
                    ? 'Opening…'
                    : 'CALM Room Posters'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
                    )
                  }
                  disabled={openingResource !== null}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#657B6C] px-4 py-3.5 text-center text-xs font-bold text-white transition hover:bg-[#53665A] disabled:opacity-50"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Managers.pdf'
                    ? 'Opening…'
                    : 'Manager Strategy Cards'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
                    )
                  }
                  disabled={openingResource !== null}
                  className="flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-center text-xs font-bold text-[#1C3B34] transition hover:border-[#657B6C] disabled:opacity-50"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Parents.pdf'
                    ? 'Opening…'
                    : 'Family Handover Cards'}
                </button>
              </div>

              {resourceError && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
                  {resourceError}
                </p>
              )}
            </div>
          </div>
        )}

        {/* REGULATION LADDERS */}
        {hubView === 'ladders' && (
          <div className="rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
            <RegulationLadders userEmail={cleanedEmail} />
          </div>
        )}

        {/* FAMILY BRIDGE */}
        {hubView === 'family' && (
          <div className="space-y-6">
            <section className="rounded-3xl bg-[#1C3B34] p-6 text-white md:p-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#E4C98E]">
                Family Bridge
              </span>

              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Keep the message short. Keep the conversation two-way.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#D8E1DC]">
                Choose a message that reflects what educators are practising
                today. Copy it into your usual family communication platform,
                then invite the family to share what they notice too.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="block text-[10px] font-black uppercase tracking-widest text-[#E4C98E]">
                  NQS practice connection
                </span>

                <p className="mt-1 text-xs leading-relaxed text-[#D8E1DC]">
                  Supports Quality Area 6 by strengthening respectful,
                  two-way communication and inviting families to contribute
                  knowledge about their child.
                </p>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              {FAMILY_BRIDGE_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="flex flex-col justify-between rounded-3xl border-2 border-[#E6E2DC] bg-white p-5 shadow-sm"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-[#FAF5EC] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#9A793D]">
                      {card.category}
                    </span>

                    <h3 className="mt-3 text-lg font-bold text-[#1C3B34]">
                      {card.title}
                    </h3>

                    <div className="mt-4 rounded-2xl bg-[#FAF8F5] p-4">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-[#657B6C]">
                        Share with the family
                      </span>

                      <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B3833]">
                        {card.educatorMessage}
                      </p>
                    </div>

                    <div className="mt-3 border-l-4 border-[#C29F60] pl-4">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-[#657B6C]">
                        Invite their knowledge
                      </span>

                      <p className="mt-1 text-sm leading-relaxed text-[#53645D]">
                        {card.familyQuestion}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => void copyFamilyCard(card)}
                    className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#284E45]"
                  >
                    {copiedCard === card.title
                      ? 'Copied'
                      : 'Copy family message'}
                  </button>
                </article>
              ))}
            </section>

            <section className="rounded-3xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#9A793D]">
                Important practice note
              </span>

              <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                These are conversation starters, not instructions for families.
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#53645D]">
                Families know their child in contexts educators do not see.
                Their responses can help the team understand patterns,
                preferences, strengths and what already works outside the
                service.
              </p>
            </section>
          </div>
        )}

        {/* PROGRESS */}
        {hubView === 'progress' && (
          <div className="rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
            <ProgressSummary userEmail={cleanedEmail} />
          </div>
        )}
      </main>
    </div>
  );
}