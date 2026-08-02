export type LadderAvailability = 'available' | 'in-development';

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
  rungs: RegulationLadderRung[];
};

export const regulationLadders: RegulationLadder[] = [
  {
    id: 'regulated-educator',
    number: 1,
    title: 'Regulated Educator, Regulated Room',
    shortTitle: 'Regulated Educator',
    subtitle:
      'Notice how your own stress, sensory needs and preparation influence the room.',
    description:
      'This ladder helps educators notice their own body state, prepare for predictable pressure points and make small changes before responding to children.',
    availability: 'available',
    printablePdf:
      '/pdf/Morning-Routine-Ladder-Printable-Cards.pdf',
    rungs: [
      {
        number: 1,
        title: 'Notice Your Starting Point',
        focus:
          'Begin by noticing your current energy, tension and emotional load.',
        practicePrompt:
          'Before entering the room, pause for a few seconds. Notice your shoulders, jaw, breathing and the speed of your thoughts without trying to judge or immediately change them.',
        reflectionQuestion:
          'What did you notice about your body and energy before beginning?',
        evidencePrompt:
          'Describe one sign that helped you recognise your starting state.',
        image: '/images/ladders/ladder1_rung01.png',
      },
      {
        number: 2,
        title: 'Choose What You Need',
        focus:
          'Use a small action that supports the state you need for the next part of the day.',
        practicePrompt:
          'Choose one realistic support before entering the room. This may be quiet, fresh air, water, slower breathing, movement or a brief conversation with a colleague.',
        reflectionQuestion:
          'What support did you choose, and why did it suit your needs?',
        evidencePrompt:
          'Describe the action and whether it changed anything you noticed.',
        image: '/images/ladders/ladder1_rung02.png',
      },
      {
        number: 3,
        title: 'Prepare for a Pressure Point',
        focus:
          'Identify one routine that is likely to place extra demand on you.',
        practicePrompt:
          'Choose one predictable pressure point such as arrivals, lunch, pack-up or staff handover. Decide in advance what will help you respond with less urgency.',
        reflectionQuestion:
          'Which routine did you prepare for, and what was your plan?',
        evidencePrompt:
          'Record the pressure point and one preparation you made.',
        image: '/images/ladders/ladder1_rung03.png',
      },
      {
        number: 4,
        title: 'Enter the Room Deliberately',
        focus:
          'Notice the difference between rushing into the room and entering with awareness.',
        practicePrompt:
          'As you enter, slow down enough to observe the room before giving instructions or taking over a situation.',
        reflectionQuestion:
          'What did you notice when you paused before responding?',
        evidencePrompt:
          'Describe one detail you may have missed if you entered more quickly.',
        image: '/images/ladders/ladder1_rung04.png',
      },
      {
        number: 5,
        title: 'Match Before You Guide',
        focus:
          'Respond to the child’s current state before expecting them to move immediately into yours.',
        practicePrompt:
          'Notice whether the child is energetic, hesitant, distressed or withdrawn. Adjust your volume, pace, body position and amount of language before guiding the next step.',
        reflectionQuestion:
          'What did you change about your own approach?',
        evidencePrompt:
          'Describe how you adjusted your pace, position, voice or language.',
        image: '/images/ladders/ladder1_rung05.png',
      },
      {
        number: 6,
        title: 'Reduce Unnecessary Language',
        focus:
          'Notice when your own stress causes you to add more words.',
        practicePrompt:
          'During one difficult moment, reduce your response to one clear sentence or instruction. Allow processing time before speaking again.',
        reflectionQuestion:
          'What happened when you used fewer words?',
        evidencePrompt:
          'Record the wording you used and what you noticed afterwards.',
        image: '/images/ladders/ladder1_rung06.png',
      },
      {
        number: 7,
        title: 'Check Your Body Position',
        focus:
          'Consider how adult height, distance and movement may affect the interaction.',
        practicePrompt:
          'Choose a position that allows you to remain available without crowding or looming over the child. Maintain supervision and safety throughout.',
        reflectionQuestion:
          'How did your body position influence the interaction?',
        evidencePrompt:
          'Describe where you positioned yourself and why.',
        image: '/images/ladders/ladder1_rung07.png',
      },
      {
        number: 8,
        title: 'Notice When You Are Carrying Too Much',
        focus:
          'Identify when empathy has shifted into emotional overload.',
        practicePrompt:
          'During a demanding interaction, notice whether you are trying to solve everything at once or carrying the feelings of the child, family and team.',
        reflectionQuestion:
          'What pressure were you carrying that did not need to be solved immediately?',
        evidencePrompt:
          'Name one responsibility you could share, delay or approach differently.',
        image: '/images/ladders/ladder1_rung08.png',
      },
      {
        number: 9,
        title: 'Use a Brief Reset',
        focus:
          'Practise returning to the room after a difficult moment without needing a perfect break.',
        practicePrompt:
          'Use a brief realistic reset such as water, fresh air, stretching your hands, relaxing your shoulders or asking a colleague for one minute of support.',
        reflectionQuestion:
          'Which reset was available to you, and what changed afterwards?',
        evidencePrompt:
          'Describe the reset and one effect you noticed.',
        image: '/images/ladders/ladder1_rung09.png',
      },
      {
        number: 10,
        title: 'Reflect Without Blame',
        focus:
          'Review the day as information rather than proof that you succeeded or failed.',
        practicePrompt:
          'Choose one difficult moment and identify what increased the pressure, what helped and what you would change next time.',
        reflectionQuestion:
          'What will you repeat or adjust during the next similar situation?',
        evidencePrompt:
          'Record one practical change you will carry into the next shift.',
        image: '/images/ladders/ladder1_rung10.png',
      },
    ],
  },
  {
    id: 'connected-drop-offs',
    number: 2,
    title: 'Connected Drop-Offs',
    shortTitle: 'Connected Drop-Offs',
    subtitle:
      'Support children and families through arrival without rushing separation.',
    description:
      'This ladder helps educators reduce pressure at the doorway, notice different stress responses and create predictable entry experiences.',
    availability: 'available',
    printablePdf: null,
    rungs: [
      {
        number: 1,
        title: 'Prepare the Entrance',
        focus:
          'Look at the arrival space before families begin entering.',
        practicePrompt:
          'Notice noise, crowding, visual clutter and the number of instructions families receive at the entrance. Change one element that may reduce pressure.',
        reflectionQuestion:
          'What did you change or remove from the arrival space?',
        evidencePrompt:
          'Describe one environmental adjustment and why you chose it.',
        image: '/images/ladders/ladder3_rung01.png',
      },
      {
        number: 2,
        title: 'Notice Before Directing',
        focus:
          'Observe the child and family before immediately giving instructions.',
        practicePrompt:
          'Notice body position, eye contact, movement, breathing and how tightly the child is holding the adult or their belongings.',
        reflectionQuestion:
          'What signals did you notice before speaking?',
        evidencePrompt:
          'Record two observable details without interpreting them as good or bad.',
        image: '/images/ladders/ladder3_rung02.png',
      },
      {
        number: 3,
        title: 'Connect With the Family',
        focus:
          'Help the adult feel acknowledged without turning arrival into a long interview.',
        practicePrompt:
          'Use one genuine, calm point of connection with the family. Avoid immediately correcting, reassuring excessively or rushing the goodbye.',
        reflectionQuestion:
          'How did you acknowledge the family’s experience?',
        evidencePrompt:
          'Record the brief connection you used and how it was received.',
        image: '/images/ladders/ladder3_rung03.png',
      },
      {
        number: 4,
        title: 'Offer One Entry Action',
        focus:
          'Reduce the number of choices and steps required at the doorway.',
        practicePrompt:
          'Offer one familiar action such as placing a bag down, carrying an item, watering a plant or walking to a preferred area.',
        reflectionQuestion:
          'Which entry action did you offer?',
        evidencePrompt:
          'Describe whether the action made entering easier, harder or unchanged.',
        image: '/images/ladders/ladder3_rung04.png',
      },
      {
        number: 5,
        title: 'Create a Predictable Goodbye',
        focus:
          'Support a clear and respectful separation rather than repeated uncertain goodbyes.',
        practicePrompt:
          'Work with the family to use a brief, familiar goodbye action or phrase that can be repeated across arrivals.',
        reflectionQuestion:
          'What made the goodbye more predictable?',
        evidencePrompt:
          'Describe the agreed goodbye cue or routine.',
        image: '/images/ladders/ladder3_rung05.png',
      },
      {
        number: 6,
        title: 'Allow Processing Time',
        focus:
          'Notice when repeated offers have become additional pressure.',
        practicePrompt:
          'After making one clear offer, pause. Stay available and maintain supervision without rapidly presenting several new toys, questions or choices.',
        reflectionQuestion:
          'What happened when you allowed more time?',
        evidencePrompt:
          'Describe how long you waited and what the child did next.',
        image: '/images/ladders/ladder3_rung06.png',
      },
      {
        number: 7,
        title: 'Use Nearby Participation',
        focus:
          'Support the child to be near play before expecting active involvement.',
        practicePrompt:
          'Create an opportunity for the child to watch, stand nearby or participate alongside another child without being required to join fully.',
        reflectionQuestion:
          'What form of nearby participation was available?',
        evidencePrompt:
          'Describe the child’s level of participation without labelling it as success or failure.',
        image: '/images/ladders/ladder3_rung07.png',
      },
      {
        number: 8,
        title: 'Stay Steady During Clinginess',
        focus:
          'Notice the feelings that extended support creates for the educator.',
        practicePrompt:
          'When a child remains close to you, notice impatience, worry or pressure to make them separate quickly. Choose a response that maintains warmth and appropriate boundaries.',
        reflectionQuestion:
          'What did you notice in yourself during the extended support?',
        evidencePrompt:
          'Record one thought or feeling and how you managed it professionally.',
        image: '/images/ladders/ladder3_rung08.png',
      },
      {
        number: 9,
        title: 'Share Information Carefully',
        focus:
          'Communicate with families without exaggerating either difficulty or success.',
        practicePrompt:
          'At collection, share one factual observation about the child’s arrival and one meaningful moment from later in the day.',
        reflectionQuestion:
          'What information did you choose to share?',
        evidencePrompt:
          'Record the general wording without including identifying family information.',
        image: '/images/ladders/ladder3_rung09.png',
      },
      {
        number: 10,
        title: 'Review the Arrival Pattern',
        focus:
          'Look for patterns across several days rather than judging one difficult morning.',
        practicePrompt:
          'Review when arrival appears easier or harder. Consider timing, staffing, environment, family routines and available entry activities.',
        reflectionQuestion:
          'What pattern or possible influence did you notice?',
        evidencePrompt:
          'Record one change the team will trial during future arrivals.',
        image: '/images/ladders/ladder3_rung10.png',
      },
    ],
  },
  {
    id: 'participation-beyond-sitting',
    number: 3,
    title: 'Participation Beyond Sitting Still',
    shortTitle: 'Group Participation',
    subtitle:
      'Create group experiences that recognise different ways children listen and participate.',
    description:
      'This ladder helps educators review mat-time expectations, reduce unnecessary waiting and build movement into group learning.',
    availability: 'available',
    printablePdf: null,
    rungs: [
      {
        number: 1,
        title: 'Clarify the Purpose',
        focus:
          'Identify why the group is gathering before deciding how children must sit.',
        practicePrompt:
          'Name the main purpose of the group experience. Decide which expectations are necessary for that purpose and which are simply familiar habits.',
        reflectionQuestion:
          'What was the actual purpose of the group experience?',
        evidencePrompt:
          'List one expectation you kept and one you reconsidered.',
        image: '/images/ladders/ladder4_rung01.png',
      },
      {
        number: 2,
        title: 'Review the Length',
        focus:
          'Compare the planned length with children’s current capacity and interest.',
        practicePrompt:
          'Record how long the experience lasts and when participation begins to change. Consider ending earlier rather than waiting for widespread disengagement.',
        reflectionQuestion:
          'When did children’s participation begin to shift?',
        evidencePrompt:
          'Record the approximate duration and one signal you observed.',
        image: '/images/ladders/ladder4_rung02.png',
      },
      {
        number: 3,
        title: 'Change the Way Children Arrive',
        focus:
          'Reduce waiting and crowding before the group experience begins.',
        practicePrompt:
          'Trial a clear movement pathway, song, individual invitation or small-group arrival rather than asking everyone to wait on the mat.',
        reflectionQuestion:
          'How did children enter the group experience?',
        evidencePrompt:
          'Describe the arrival method and its effect on waiting.',
        image: '/images/ladders/ladder4_rung03.png',
      },
      {
        number: 4,
        title: 'Build Movement Into the Content',
        focus:
          'Use movement as part of learning rather than only as a break from learning.',
        practicePrompt:
          'Add gestures, acting, carrying, pointing, changing levels or moving to different parts of the space within the experience.',
        reflectionQuestion:
          'Which movement supported the learning purpose?',
        evidencePrompt:
          'Describe one movement and how children responded.',
        image: '/images/ladders/ladder4_rung04.png',
      },
      {
        number: 5,
        title: 'Offer Different Positions',
        focus:
          'Allow appropriate variation in how children position their bodies.',
        practicePrompt:
          'Offer realistic options such as sitting on a cushion, kneeling, standing at the back or participating from a nearby position.',
        reflectionQuestion:
          'Which position helped a child participate more successfully?',
        evidencePrompt:
          'Describe the option and what changed in participation.',
        image: '/images/ladders/ladder4_rung05.png',
      },
      {
        number: 6,
        title: 'Reduce Waiting for Turns',
        focus:
          'Notice how long children are expected to remain passive.',
        practicePrompt:
          'Change one part of the experience so more children can respond, hold materials, move or participate at the same time.',
        reflectionQuestion:
          'How did you reduce passive waiting?',
        evidencePrompt:
          'Describe the change and whether engagement increased.',
        image: '/images/ladders/ladder4_rung06.png',
      },
      {
        number: 7,
        title: 'Use a Mid-Point Check',
        focus:
          'Respond to the group’s changing state rather than completing the plan at any cost.',
        practicePrompt:
          'Pause partway through and notice posture, movement, noise, attention and your own frustration. Decide whether to continue, change or finish.',
        reflectionQuestion:
          'What did the mid-point check tell you?',
        evidencePrompt:
          'Record the decision you made and why.',
        image: '/images/ladders/ladder4_rung07.png',
      },
      {
        number: 8,
        title: 'Support Participation Without Shame',
        focus:
          'Respond privately and practically when a child is struggling.',
        practicePrompt:
          'Replace public correction with proximity, a quiet cue, a helper role, a change of position or an appropriate alternative.',
        reflectionQuestion:
          'What did you do instead of publicly correcting the child?',
        evidencePrompt:
          'Describe the support and what happened next.',
        image: '/images/ladders/ladder4_rung08.png',
      },
      {
        number: 9,
        title: 'Plan the Exit',
        focus:
          'Avoid creating a new bottleneck when the group experience finishes.',
        practicePrompt:
          'Release children gradually, use a movement cue or organise the next step so children are not all rushing towards the same space.',
        reflectionQuestion:
          'How did children move out of the experience?',
        evidencePrompt:
          'Describe one change that reduced crowding or waiting.',
        image: '/images/ladders/ladder4_rung09.png',
      },
      {
        number: 10,
        title: 'Evaluate Participation Differently',
        focus:
          'Look beyond stillness when deciding whether the experience worked.',
        practicePrompt:
          'Review who listened, contributed, watched, moved, returned or used the learning later. Consider several forms of participation.',
        reflectionQuestion:
          'What evidence of participation did you notice beyond sitting still?',
        evidencePrompt:
          'Record two different ways children participated.',
        image: '/images/ladders/ladder4_rung10.png',
      },
    ],
  },
  {
    id: 'see-the-schema',
    number: 4,
    title: 'See the Schema, Not the Bad Behaviour',
    shortTitle: 'Play Schemas',
    subtitle:
      'Understand the possible developmental drive beneath repetitive or disruptive-looking play.',
    description:
      'This ladder helps educators observe repeated play patterns, maintain safety and provide appropriate alternatives rather than relying only on correction.',
    availability: 'available',
    printablePdf:
      '/pdf/Escalation-Ladder-Printable-Cards.pdf',
    rungs: [
      {
        number: 1,
        title: 'Describe What You See',
        focus:
          'Begin with observable actions rather than labels.',
        practicePrompt:
          'Record exactly what the child is doing, including objects, direction, repetition, force, location and who is nearby.',
        reflectionQuestion:
          'What did the child do that you could directly observe?',
        evidencePrompt:
          'Write one factual observation without using words such as naughty, aggressive or attention-seeking.',
        image: '/images/ladders/ladder2_rung01.png',
      },
      {
        number: 2,
        title: 'Check Immediate Safety',
        focus:
          'Protect children and property before analysing the behaviour.',
        practicePrompt:
          'Move unsafe objects, create space, support affected children and bring another educator closer when required.',
        reflectionQuestion:
          'What immediate safety action was necessary?',
        evidencePrompt:
          'Record how you protected safety without adding shame.',
        image: '/images/ladders/ladder2_rung02.png',
      },
      {
        number: 3,
        title: 'Look for Repetition',
        focus:
          'Notice whether the same type of action appears across different activities.',
        practicePrompt:
          'Observe whether the child repeatedly throws, transports, encloses, rotates, lines up, connects, disconnects, climbs or crashes.',
        reflectionQuestion:
          'Which repeated pattern did you notice?',
        evidencePrompt:
          'Record two examples of the same pattern in different moments.',
        image: '/images/ladders/ladder2_rung03.png',
      },
      {
        number: 4,
        title: 'Consider More Than One Explanation',
        focus:
          'Avoid deciding too quickly why the behaviour is happening.',
        practicePrompt:
          'Consider whether the action may relate to play exploration, communication, sensory input, frustration, imitation, fatigue or difficulty with the environment.',
        reflectionQuestion:
          'Which possible explanations did you consider?',
        evidencePrompt:
          'List at least two possibilities rather than choosing one certainty.',
        image: '/images/ladders/ladder2_rung04.png',
      },
      {
        number: 5,
        title: 'Maintain the Boundary',
        focus:
          'Understanding the behaviour does not mean allowing unsafe actions.',
        practicePrompt:
          'State the boundary clearly and briefly. Identify what cannot continue and what the child can do instead.',
        reflectionQuestion:
          'How did you communicate the safety boundary?',
        evidencePrompt:
          'Record the brief wording you used.',
        image: '/images/ladders/ladder2_rung05.png',
      },
      {
        number: 6,
        title: 'Offer a Related Alternative',
        focus:
          'Provide a safer activity connected to the apparent play drive.',
        practicePrompt:
          'Offer a safe throwing target, carrying task, rolling activity, building zone, crashing space or another alternative that relates to what the child is trying to do.',
        reflectionQuestion:
          'Which alternative did you offer, and how was it related?',
        evidencePrompt:
          'Describe the original action and the safer alternative.',
        image: '/images/ladders/ladder2_rung06.png',
      },
      {
        number: 7,
        title: 'Adjust the Environment',
        focus:
          'Consider whether the environment supports the type of play children are seeking.',
        practicePrompt:
          'Change access, space, materials, boundaries or supervision so the play can occur more safely and successfully.',
        reflectionQuestion:
          'What environmental change did you trial?',
        evidencePrompt:
          'Describe the adjustment and what happened afterwards.',
        image: '/images/ladders/ladder2_rung07.png',
      },
      {
        number: 8,
        title: 'Use Neutral Language With the Team',
        focus:
          'Prevent frustration from spreading through staff conversations.',
        practicePrompt:
          'Describe the pattern, boundary and alternative to colleagues without blaming the child or another educator.',
        reflectionQuestion:
          'How did you explain the situation to the team?',
        evidencePrompt:
          'Record one neutral phrase that kept the discussion focused on support.',
        image: '/images/ladders/ladder2_rung08.png',
      },
      {
        number: 9,
        title: 'Share Helpful Information With Families',
        focus:
          'Communicate without diagnosing, alarming or minimising.',
        practicePrompt:
          'Share a factual observation, the safety support used and an appropriate activity the child engaged with.',
        reflectionQuestion:
          'What general information would be useful for the family?',
        evidencePrompt:
          'Write a brief example that avoids labels and identifying details.',
        image: '/images/ladders/ladder2_rung09.png',
      },
      {
        number: 10,
        title: 'Review What Changed',
        focus:
          'Evaluate whether the alternative and environmental support reduced unsafe behaviour.',
        practicePrompt:
          'Compare what happened before and after the change. Decide what the team will repeat, adjust or stop.',
        reflectionQuestion:
          'What did the trial teach you about the child’s play?',
        evidencePrompt:
          'Record one practical team decision for future play opportunities.',
        image: '/images/ladders/ladder2_rung10.png',
      },
    ],
  },
  {
    id: 'moving-between-moments',
    number: 5,
    title: 'Moving Between Moments',
    shortTitle: 'Transitions',
    subtitle:
      'Reduce pressure when children need to stop, shift attention or begin something new.',
    description:
      'This ladder will support educators to review transition demands, reduce unnecessary waiting and create clearer pathways between activities.',
    availability: 'in-development',
    printablePdf: null,
    rungs: [],
  },
  {
    id: 'rough-play-safe-boundaries',
    number: 6,
    title: 'Rough Play With Safe Boundaries',
    shortTitle: 'Rough Play',
    subtitle:
      'Support physical play while maintaining consent, supervision and clear boundaries.',
    description:
      'This ladder will help educators distinguish energetic play from unsafe escalation and remain actively involved in supporting consent and safety.',
    availability: 'in-development',
    printablePdf: null,
    rungs: [],
  },
  {
    id: 'pack-up-without-power-struggle',
    number: 7,
    title: 'Pack-Up Without the Power Struggle',
    shortTitle: 'Pack-Up',
    subtitle:
      'Build participation without repeated demands, threats or escalating frustration.',
    description:
      'This ladder will examine the combined demands of stopping play, shifting attention, organising materials and following multi-step instructions.',
    availability: 'in-development',
    printablePdf: null,
    rungs: [],
  },
  {
    id: 'pause-process-participate',
    number: 8,
    title: 'Pause, Process and Participate',
    shortTitle: 'Instructions and Impulse Control',
    subtitle:
      'Support children who hear an instruction but cannot yet consistently organise and follow through.',
    description:
      'This ladder will help educators reduce instruction overload and support processing, impulse control, working memory and participation.',
    availability: 'in-development',
    printablePdf: null,
    rungs: [],
  },
];

export const getRegulationLadderById = (
  ladderId: string,
): RegulationLadder | undefined =>
  regulationLadders.find((ladder) => ladder.id === ladderId);