export interface KnowledgeCard {
  title: string;
  image: string;
  rationale: string;
  action: string;
}

export const knowledgeCards: Record<string, KnowledgeCard> = {
  phone_reset: {
    title: 'Start With Yourself',
    image: '/images/cards/phone-reset.png',
    rationale:
      'Your pace, voice and body language shape the first interactions of the day. A brief pause can help you enter the room with less urgency.',
    action:
      'Before entering, slow your walking pace, soften your shoulders and take one quiet moment.',
  },

  card2_posture: {
    title: 'Make Your Body Less Confronting',
    image: '/images/cards/card2-posture.png',
    rationale:
      'When a child is distressed, lots of language, direct eye contact or looming body positions can add more pressure.',
    action:
      'Move slightly side-on, lower yourself where appropriate and use fewer words.',
  },

  card3_environment: {
    title: 'Reduce One Thing',
    image: '/images/cards/card3-environment.png',
    rationale:
      'Busy environments can make it harder for some children to listen, participate or settle.',
    action:
      'Turn off unnecessary background sound, reduce crowding or simplify one visually busy area.',
  },

  card4_coolwater: {
    title: 'Offer a Simple Reset',
    image: '/images/cards/card4-coolwater.png',
    rationale:
      'Simple sensory experiences can sometimes help shift attention during a stressful moment without requiring lots of conversation.',
    action:
      'Offer a drink of water or another familiar sensory option the child already finds comfortable.',
  },

  card5_heavywork: {
    title: 'Try Purposeful Movement',
    image: '/images/cards/card5-heavywork.png',
    rationale:
      'Pushing, pulling and carrying give children strong feedback through their muscles and joints and may support body awareness.',
    action:
      'Invite the child to carry books, push a sturdy container, move cushions or try wall pushes.',
  },

  card6_sway: {
    title: 'Follow the Child’s Comfort Cues',
    image: '/images/cards/card6-sway.png',
    rationale:
      'Comfort looks different for every child. Some seek closeness, while others need more space. The child’s cues should guide the response.',
    action:
      'Stay available, offer comfort without forcing it and allow the child to move closer or create distance.',
  },

  card7_space: {
    title: 'Stay Close Without Adding Pressure',
    image: '/images/cards/card7-space.png',
    rationale:
      'A distressed child may not be ready for questions, explanations or problem-solving straight away.',
    action:
      'Stay nearby, reduce your words and give the child time before asking what happened.',
  },

  card8_transition: {
    title: 'Show What Comes Next',
    image: '/images/cards/card8-transition.png',
    rationale:
      'Long verbal instructions can be harder to follow when children are tired, distracted or already under pressure.',
    action:
      'Use one clear visual cue, object or short phrase to show what happens next.',
  },

  card9_handover: {
    title: 'Tag In Before You Run Out',
    image: '/images/cards/card9-handover.png',
    rationale:
      'Sometimes another educator has more capacity or a different connection with the child. Asking for support is part of good teamwork.',
    action:
      'Agree on a simple team signal that means, “Can you take over for a moment?”',
  },

  card10_refill: {
    title: 'Take a Micro Reset',
    image: '/images/cards/card10-refill.png',
    rationale:
      'Small pauses can help educators notice when their own frustration, fatigue or urgency is beginning to affect interactions.',
    action:
      'When coverage allows, step back briefly, drink water, reset your posture and return with a slower pace.',
  },

  protect_brain: {
    title: 'When Thinking Gets Harder',
    image: '/images/cards/protect-brain.png',
    rationale:
      'When stress is high, children may have more difficulty processing language, solving problems or responding to repeated instructions.',
    action:
      'Use fewer words, reduce immediate demands and wait for signs that the child is ready to reconnect.',
  },

  ease: {
    title: 'Look Under the Behaviour',
    image: '/images/cards/ease-lens.png',
    rationale:
      'Behaviour gives us information. Before labelling it, look at what changed around the child and what their body may be communicating.',
    action:
      'Check the environment, separation, sensory needs and accumulated fatigue before deciding what to do next.',
  },

  push: {
    title: 'Purposeful Heavy Work',
    image: '/images/cards/push-heavywork.png',
    rationale:
      'Activities involving pushing, pulling and carrying provide strong proprioceptive feedback and can be useful movement options for some children.',
    action:
      'Try wall pushes, carrying safe objects, moving cushions or pushing a sturdy container.',
  },

  safe: {
    title: 'Make the Interaction Feel Smaller',
    image: '/images/cards/safe-reset.png',
    rationale:
      'Children may find it easier to reconnect when adults reduce physical and verbal pressure.',
    action:
      'Give space, soften your posture, keep your hands visible and slow your breathing.',
  },

  soft: {
    title: 'Slow the Interaction Down',
    image: '/images/cards/soft-anchor.png',
    rationale:
      'A slower voice, predictable movement and fewer demands can make an interaction easier to process.',
    action:
      'Slow your speech, keep your body open and use one short reassuring phrase.',
  },

  trust: {
    title: 'Pause Before Touch',
    image: '/images/cards/trust-shield.png',
    rationale:
      'Physical comfort should remain responsive to the child, professionally appropriate and consistent with your service’s child-safe procedures.',
    action:
      'Notice the child’s cues, offer rather than assume touch, keep interactions visible and stop if the child moves away or appears uncomfortable.',
  },
};