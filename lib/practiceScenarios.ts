export type PracticeScenario = {
  id: string;
  ageGroup: string;
  title: string;
  summary: string;
  image: string;
  situation: string;
  commonResponse: string;
  reflectiveResponse: string;
  whyItMatters: string;
  reflectionPrompt: string;
};

export const practiceScenarios: PracticeScenario[] = [
  {
    id: 'nursery-drop-off',
    ageGroup: 'Babies and Nursery',
    title: 'A Baby Is Distressed After Drop-Off',
    summary:
      'Consider whether adding more stimulation is helping the baby settle or increasing the pressure.',
    image: '/images/feed/01_babies_room.png',
    situation:
      'A baby is crying intensely after their family leaves. Their body is arching, their breathing is fast and they are struggling to settle. An educator begins bouncing quickly while shaking a noisy toy.',
    commonResponse:
      'Adding more sound, faster movement or repeated distraction in an attempt to stop the crying quickly.',
    reflectiveResponse:
      'Reduce the amount of stimulation. Sit or stand in a stable position, use slow predictable movement if the baby accepts it, soften your voice and allow time for the baby to respond to your steady presence.',
    whyItMatters:
      'A distressed baby may have limited capacity to process extra noise, movement and visual input. A slower and more predictable adult response may reduce the amount of information their body must manage.',
    reflectionPrompt:
      'What could the educator reduce or change before introducing another toy or activity?',
  },
  {
    id: 'toddler-plate',
    ageGroup: 'Toddlers',
    title: 'A Toddler Throws a Plate at Morning Tea',
    summary:
      'Look beyond the thrown object and consider what happened before the child lost control.',
    image: '/images/feed/02_toddler_room.png',
    situation:
      'A toddler becomes distressed when given a plate they did not expect. They throw the plate, scream and drop to the floor while other children are eating nearby.',
    commonResponse:
      'Standing over the child, demanding an apology and repeating instructions while the child is still highly distressed.',
    reflectiveResponse:
      'Check immediate safety, reduce unnecessary language and move closer without crowding the child. Wait for their body to become more available before offering one simple next step or a limited choice.',
    whyItMatters:
      'When a toddler is highly overwhelmed, additional instructions may increase the demand. Safety and connection usually need to come before teaching or repairing the situation.',
    reflectionPrompt:
      'Which parts of the adult response could wait until the child is more settled?',
  },
  {
    id: 'throwing-blocks',
    ageGroup: 'Toddlers and Preschool',
    title: 'A Child Repeatedly Throws Blocks',
    summary:
      'Explore whether the behaviour reflects a developmental play drive, distress, experimentation or a need for stronger boundaries.',
    image: '/images/feed/03_3yo_room.png',
    situation:
      'A child repeatedly throws blocks across the room. Other children are moving away and educators are becoming frustrated because verbal reminders have not changed the behaviour.',
    commonResponse:
      'Repeating “blocks are not for throwing”, removing the child from play or labelling the behaviour as deliberately disruptive.',
    reflectiveResponse:
      'Protect nearby children and identify what the child appears to be exploring. Provide a safe throwing option, a target, a carrying job or another activity involving force while maintaining a clear boundary around unsafe block throwing.',
    whyItMatters:
      'Understanding the possible purpose of the behaviour does not remove the safety boundary. It helps educators offer a safer way for the child to meet the underlying need.',
    reflectionPrompt:
      'How could the educator maintain safety while offering an appropriate alternative?',
  },
  {
    id: 'pack-up-distress',
    ageGroup: 'Preschool and Kindergarten',
    title: 'Pack-Up Becomes a Power Struggle',
    summary:
      'Consider the number of steps, the loss of play and the pressure created by repeated instructions.',
    image: '/images/feed/04_4yo_room.png',
    situation:
      'A child is deeply involved in painting when pack-up begins. They push the brushes away, hide under the table and refuse repeated instructions to clean the area.',
    commonResponse:
      'Increasing the volume and frequency of instructions or threatening to remove a preferred activity later.',
    reflectiveResponse:
      'Acknowledge that the child is stopping something important to them. Reduce the task to one clear action, offer a meaningful pack-up role and use a predictable cue that helps the child understand what is happening next.',
    whyItMatters:
      'Pack-up requires children to stop, shift attention, manage disappointment, understand instructions and organise a sequence of actions. Some children need more support with these combined demands.',
    reflectionPrompt:
      'What is one smaller, clearer step the educator could offer first?',
  },
  {
    id: 'drop-off-freeze',
    ageGroup: 'Preschool and Kindergarten',
    title: 'A Child Freezes at the Entrance',
    summary:
      'Notice whether the child needs more instructions or a calmer entry into the environment.',
    image: '/images/feed/05_prep_transition.png',
    situation:
      'A child stands at the doorway gripping their bag. They do not answer questions, enter the room or respond to encouragement while the entrance becomes busier.',
    commonResponse:
      'Repeating instructions, comparing the child with peers or quickly taking their belongings and moving them into the room.',
    reflectiveResponse:
      'Reduce the social and verbal pressure. Stand nearby, allow processing time and offer one familiar entry action such as placing the bag down, carrying an item or moving towards a preferred space.',
    whyItMatters:
      'Freezing can be a stress response rather than refusal. More pressure may make movement and communication harder in that moment.',
    reflectionPrompt:
      'What could make the first step into the room feel smaller and more predictable?',
  },
  {
    id: 'rough-play',
    ageGroup: 'Toddlers and Preschool',
    title: 'Rough Play Is Becoming Unsafe',
    summary:
      'Separate the need for physical play from the need for clear safety boundaries.',
    image: '/images/feed/06_early_primary.png',
    situation:
      'Several children are chasing, wrestling and crashing into cushions. They appear excited, but one child is no longer enjoying the game and another is becoming increasingly forceful.',
    commonResponse:
      'Stopping all physical play immediately or allowing it to continue because the children initially chose to participate.',
    reflectiveResponse:
      'Move close enough to supervise, pause the play and help children notice body signals and consent. Restate the safety boundaries, change the environment if needed and only continue when all children are willing and the play can be safely supported.',
    whyItMatters:
      'Rough play can be valuable, but consent and safety can change during the activity. Educators need to remain actively involved rather than treating permission as permanent.',
    reflectionPrompt:
      'What signals would tell the educator that the play needs to pause or change?',
  },
  {
    id: 'mat-time',
    ageGroup: 'Preschool and Kindergarten',
    title: 'A Child Cannot Sit Still During Group Time',
    summary:
      'Question whether participation must always look like a still, cross-legged body.',
    image: '/images/feed/10_mat_time.png',
    situation:
      'During a long group story, a child changes position repeatedly, touches nearby objects and moves in and out of the group area.',
    commonResponse:
      'Repeatedly correcting the child’s posture, moving them away from peers or assuming they are not listening.',
    reflectiveResponse:
      'Consider the length and purpose of the group experience. Offer an appropriate seating option, a quiet object, a helper role, movement within the activity or permission to participate from a nearby position.',
    whyItMatters:
      'Listening and participation do not always look like stillness. Adjusting the experience may improve engagement for the whole group.',
    reflectionPrompt:
      'Which expectation could be changed without losing the purpose of the group experience?',
  },
];