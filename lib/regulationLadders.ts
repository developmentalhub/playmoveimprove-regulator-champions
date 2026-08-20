export type LadderAvailability =
  | 'available'
  | 'launching-soon'
  | 'in-development';

export type LadderPrintables = {
  educator: string | null;
  manager: string | null;
  family: string | null;
};

export type RegulationLadderRung = {
  number: number;
  title: string;
  focus: string;
  practicePrompt: string;
  reflectionQuestion: string;
  evidencePrompt: string;
  image: string;
};

export type RegulationLadder = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  availability: LadderAvailability;
  printablePdf: string | null;
  printables: LadderPrintables;
  rungs: RegulationLadderRung[];
};

export const regulationLadders: RegulationLadder[] = [
  {
    id: 'morning-routine',
    number: 1,
    title: 'Morning Routine',
    shortTitle: 'Morning Routine',
    subtitle:
      'Notice your own state, prepare for the room and begin the day with more awareness.',
    description:
      'Ten short practice steps for educators to notice their own energy, prepare for arrival and respond more thoughtfully at the beginning of the day.',
    availability: 'available',

    printablePdf: '/pdf/educators-ladder-1.pdf',

    printables: {
      educator: '/pdf/educators-ladder-1.pdf',
      manager: '/pdf/managers-ladder-1.pdf',
      family: '/pdf/families-ladder-1.pdf',
    },

    rungs: [
      {
        number: 1,
        title: 'Wake',
        focus: 'Notice what your body reaches for first.',
        practicePrompt:
          'Before you check your phone, notice what you naturally reach for first. Is it your phone, sunlight, tea, quiet or something else?',
        reflectionQuestion:
          'What did you actually reach for this morning?',
        evidencePrompt:
          'Record the first thing you reached for and what you noticed.',
        image: '/images/ladders/ladder1_rung01.png',
      },

      {
        number: 2,
        title: 'Nature',
        focus: 'Notice the world around you before the workday begins.',
        practicePrompt:
          'Step outside for a moment. Notice clouds, birds, air, light or another small detail around you.',
        reflectionQuestion: 'What did you notice?',
        evidencePrompt:
          'Record one thing you noticed outside.',
        image: '/images/ladders/ladder1_rung02.png',
      },

      {
        number: 3,
        title: 'The Drive',
        focus: 'Match your morning input to what you actually need.',
        practicePrompt:
          'Notice your natural energy level. Choose music, a podcast or silence based on what you need today rather than habit.',
        reflectionQuestion:
          'What did you choose, and how did it feel?',
        evidencePrompt:
          'Record what you chose for the drive and whether it suited your morning.',
        image: '/images/ladders/ladder1_rung03.png',
      },

      {
        number: 4,
        title: 'The Staffroom',
        focus: 'Notice the energy you are walking into.',
        practicePrompt:
          'Notice the energy in the staffroom. Before automatically matching the pace around you, check what you need for your own morning.',
        reflectionQuestion:
          'What did you choose to do today?',
        evidencePrompt:
          'Record one choice you made before entering the room.',
        image: '/images/ladders/ladder1_rung04.png',
      },

      {
        number: 5,
        title: 'Meeting the First Child',
        focus: 'Adjust your energy to meet the child in front of you.',
        practicePrompt:
          'Notice the first child you meet. Consider whether your voice, pace, energy or body position needs to shift before guiding them.',
        reflectionQuestion:
          'Which child did you meet first, and what did you shift?',
        evidencePrompt:
          'Record one change you made to your own pace, energy, voice or posture.',
        image: '/images/ladders/ladder1_rung05.png',
      },

      {
        number: 6,
        title: 'Plan Your Pockets',
        focus: 'Prepare a few simple resources before you need them.',
        practicePrompt:
          'Check what you have available. Consider something to fidget with, something for breathing play, or something simple to hide and find.',
        reflectionQuestion:
          'What did you pack today?',
        evidencePrompt:
          'Record what you prepared and what you hoped it might support.',
        image: '/images/ladders/ladder1_rung06.png',
      },

      {
        number: 7,
        title: 'Dysregulated Child',
        focus: 'Check, assess, lead and monitor before rushing to fix.',
        practicePrompt:
          'When a child is struggling, pause. Notice their body, notice your own body and choose a steady response before adding more demands.',
        reflectionQuestion:
          'What did you notice in their body and in your own?',
        evidencePrompt:
          'Record one observable cue from the child and one thing you noticed in yourself.',
        image: '/images/ladders/ladder1_rung07.png',
      },

      {
        number: 8,
        title: 'Parent at the Door',
        focus: 'Notice the adult as well as the child.',
        practicePrompt:
          'When a parent arrives carrying stress or worry, use a genuine point of connection before moving straight into the handover.',
        reflectionQuestion:
          'What did you ask, and what did you notice together?',
        evidencePrompt:
          'Record one brief connection you used during a handover.',
        image: '/images/ladders/ladder1_rung08.png',
      },

      {
        number: 9,
        title: "Child's Entry Ritual",
        focus: 'Give the child something purposeful to move into.',
        practicePrompt:
          'Offer a simple familiar entry action such as pushing a trolley, carrying a basket or moving through a small movement pathway.',
        reflectionQuestion:
          'What job or entry action did they choose today?',
        evidencePrompt:
          'Record the entry action and what happened next.',
        image: '/images/ladders/ladder1_rung09.png',
      },

      {
        number: 10,
        title: 'Room Scan',
        focus: 'Look across the whole room before responding to the loudest behaviour.',
        practicePrompt:
          'Pause and scan the room. Notice children who are highly active, watchful, withdrawn, quiet or needing more connection.',
        reflectionQuestion:
          'Who appeared to need you first?',
        evidencePrompt:
          'Record one room-level pattern you noticed.',
        image: '/images/ladders/ladder1_rung10.png',
      },
    ],
  },

  {
    id: 'escalation-support',
    number: 2,
    title: 'Escalation Support',
    shortTitle: 'Escalation Support',
    subtitle:
      'Respond to escalating moments with safety, observation, connection and reflection.',
    description:
      'Ten short steps that help educators slow the moment down, protect safety, notice possible drivers and decide what to try next.',
    availability: 'available',

    printablePdf: '/pdf/educators-ladder-2.pdf',

    printables: {
      educator: '/pdf/educators-ladder-2.pdf',
      manager: '/pdf/managers-ladder-2.pdf',
      family: '/pdf/families-ladder-2.pdf',
    },

    rungs: [
      {
        number: 1,
        title: 'Immediate Safety',
        focus: 'Protect first.',
        practicePrompt:
          'Clear the immediate area when needed and bring another educator closer if children are frightened, hurt or the situation needs extra support.',
        reflectionQuestion:
          'Did you need another educator today, and what happened?',
        evidencePrompt:
          'Record the immediate safety action used without identifying children.',
        image: '/images/ladders/ladder2_rung01.png',
      },

      {
        number: 2,
        title: 'Recognise the Driver',
        focus: 'Look beneath the visible behaviour.',
        practicePrompt:
          'Consider what may be contributing. Is the child seeking movement, connection, safety, sensory input or repeating a play pattern?',
        reflectionQuestion:
          'What possibilities did you consider?',
        evidencePrompt:
          'Record one or two possible drivers rather than assuming one cause.',
        image: '/images/ladders/ladder2_rung02.png',
      },

      {
        number: 3,
        title: 'Narrate It',
        focus: 'Describe before correcting.',
        practicePrompt:
          'Use a short factual phrase such as “I can see that...” and describe what is happening before adding correction or explanation.',
        reflectionQuestion:
          'What did you say to the child?',
        evidencePrompt:
          'Record the short neutral phrase you used.',
        image: '/images/ladders/ladder2_rung03.png',
      },

      {
        number: 4,
        title: 'Redirect the Outlet',
        focus: 'Offer a safer way to continue the underlying action.',
        practicePrompt:
          'Offer a simple alternative such as beanbags into a basket, pushing something sturdy or another purposeful physical activity. Keep language brief.',
        reflectionQuestion:
          'Which redirect did you offer?',
        evidencePrompt:
          'Record the alternative and whether the child engaged with it.',
        image: '/images/ladders/ladder2_rung04.png',
      },

      {
        number: 5,
        title: 'Read the Body',
        focus: 'Watch what happens after the change.',
        practicePrompt:
          'Notice whether the child appears to be settling, staying at the same intensity or becoming more escalated.',
        reflectionQuestion:
          'What did their body tell you?',
        evidencePrompt:
          'Record one observable body cue.',
        image: '/images/ladders/ladder2_rung05.png',
      },

      {
        number: 6,
        title: 'Branch by Arousal',
        focus: 'Choose the next step from what you observe.',
        practicePrompt:
          'If intensity remains high, keep the next step active and simple. If the child is settling, move gradually towards a lower-demand activity.',
        reflectionQuestion:
          'Which path did you take, and what happened next?',
        evidencePrompt:
          'Record the next activity and what changed afterwards.',
        image: '/images/ladders/ladder2_rung06.png',
      },

      {
        number: 7,
        title: 'Loop the Check-In',
        focus: 'Check the child and yourself again.',
        practicePrompt:
          'Pause and notice both the child’s body and your own. Check whether either of you has shifted before deciding what comes next.',
        reflectionQuestion:
          'Had anything changed for either of you?',
        evidencePrompt:
          'Record one change you noticed.',
        image: '/images/ladders/ladder2_rung07.png',
      },

      {
        number: 8,
        title: 'Senses Check',
        focus: 'Notice the environment together.',
        practicePrompt:
          'Notice sound, light, movement, temperature, space or other sensory features around you. Help the child notice what feels comfortable when appropriate.',
        reflectionQuestion:
          'What did you notice together?',
        evidencePrompt:
          'Record one environmental or sensory feature you noticed.',
        image: '/images/ladders/ladder2_rung08.png',
      },

      {
        number: 9,
        title: 'Commentate the Body',
        focus: 'Help children build body awareness without judgement.',
        practicePrompt:
          'When appropriate, gently describe something observable such as fast breathing, tight hands or restless feet without labelling the child.',
        reflectionQuestion:
          'What did you notice or say?',
        evidencePrompt:
          'Record one neutral body observation.',
        image: '/images/ladders/ladder2_rung09.png',
      },

      {
        number: 10,
        title: 'Reunite and Debrief',
        focus: 'Return to the team without blame.',
        practicePrompt:
          'When the moment has passed, reconnect with the other educator. Share what you each noticed and agree on one thing to try next time.',
        reflectionQuestion:
          'What did you both notice and agree to try next?',
        evidencePrompt:
          'Record one practical team decision.',
        image: '/images/ladders/ladder2_rung10.png',
      },
    ],
  },

  {
    id: 'play-schemas',
    number: 3,
    title: 'See the Schema, Not the Behaviour',
    shortTitle: 'Play Schemas',
    subtitle:
      'Understand the possible developmental drive beneath repetitive and disruptive-looking play.',
    description:
      'Learn to notice repeated play patterns, maintain safety and offer alternatives that support the underlying play need.',
    availability: 'launching-soon',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },

  {
    id: 'attachment-connection',
    number: 4,
    title: 'Attachment and Connection',
    shortTitle: 'Attachment & Connection',
    subtitle:
      'Use everyday relationships, proximity and predictable responses to strengthen connection.',
    description:
      'Explore practical attachment-informed strategies for arrivals, separation, reassurance and reconnecting after difficult moments.',
    availability: 'in-development',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },

  {
    id: 'eight-senses',
    number: 5,
    title: 'Sensory Play Through the 8 Senses',
    shortTitle: 'The 8 Senses',
    subtitle:
      'Notice how sensory needs influence participation, movement, attention and behaviour.',
    description:
      'Explore practical play experiences through touch, sound, sight, taste, smell, vestibular, proprioceptive and interoceptive input.',
    availability: 'in-development',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },

  {
    id: 'vagus-stress',
    number: 6,
    title: 'Reducing Stress Through Everyday Body Supports',
    shortTitle: 'Stress & Vagus Nerve',
    subtitle:
      'Explore simple body-based practices that may help children and educators slow down and reconnect.',
    description:
      'Use breathing, rhythm, movement, sensory input and connection as practical ways to support recovery from stress.',
    availability: 'in-development',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },

  {
    id: 'moving-between-moments',
    number: 7,
    title: 'Moving Between Moments',
    shortTitle: 'Transitions',
    subtitle:
      'Reduce pressure when children need to stop, shift attention or begin something new.',
    description:
      'Support smoother transitions by reducing waiting, simplifying instructions and creating clearer pathways between activities.',
    availability: 'in-development',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },

  {
    id: 'rough-play-safe-boundaries',
    number: 8,
    title: 'Rough Play With Safe Boundaries',
    shortTitle: 'Rough Play',
    subtitle:
      'Support energetic physical play while maintaining consent, supervision and clear boundaries.',
    description:
      'Help educators distinguish energetic play from unsafe escalation and support children to practise physical boundaries.',
    availability: 'in-development',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },

  {
    id: 'pause-process-participate',
    number: 9,
    title: 'Pause, Process and Participate',
    shortTitle: 'Instructions & Impulse Control',
    subtitle:
      'Support children who hear an instruction but cannot yet consistently organise and follow through.',
    description:
      'Reduce instruction overload and support processing, working memory, impulse control and participation.',
    availability: 'in-development',

    printablePdf: null,

    printables: {
      educator: null,
      manager: null,
      family: null,
    },

    rungs: [],
  },
];

export const getRegulationLadderById = (
  ladderId: string,
): RegulationLadder | undefined =>
  regulationLadders.find((ladder) => ladder.id === ladderId);