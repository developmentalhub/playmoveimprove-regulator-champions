'use client';

import React, { useState } from 'react';

// FIELD KNOWLEDGE CARDS DATA
const knowledgeCards = {
  phone_reset: {
    title: "Card 1: Morning Nervous System Anchor",
    image: "/images/cards/phone-reset.png",
    rationale: "Your nervous system wakes up ready to orient to your physical surroundings. Taking a quiet sensory moment before reading digital messages helps your central nervous system stay grounded before the floor routine begins.",
    action: "Pick one gentle morning ritual like splashing cool water on your face or drinking cold water to ground your body before stepping into the room."
  },
  card2_posture: {
    title: "Card 2: Soft Stature & Vocal Pitch",
    image: "/images/cards/card2-posture.png",
    rationale: "When noise levels or room tension spike, our natural instinct is to stand tall and raise our voice. Lowering your physical height below eye level and turning your body sideways creates immediate relational safety and reduces overall room tension.",
    action: "Drop your physical height below eye level, turn sideways rather than head on, and lower your vocal pitch to loan calm energy."
  },
  protect_brain: {
    title: "Safe Brain vs Protect Brain",
    image: "/images/cards/protect-brain.png",
    rationale: "When sensory or emotional load exceeds a child's window of tolerance, the nervous system triggers a defensive response. Spoken language processing pauses during high stress.",
    action: "Pause spoken instructions, drop your physical height below eye level, and offer steady presence until their thinking brain comes back online."
  },
  ease: {
    title: "The E.A.S.E. Observation Lens",
    image: "/images/cards/ease-lens.png",
    rationale: "Behavior reflects environmental and sensory alignment rather than compliance. Look beneath visible behavior to evaluate what a child's nervous system requires.",
    action: "Evaluate Environment loads or bottlenecks, Attachment separation, Sensory seeking or avoiding, and Emotional cumulative fatigue."
  },
  push: {
    title: "P.U.S.H. Heavy Work",
    image: "/images/cards/push-heavywork.png",
    rationale: "Proprioceptive input from joint and muscle resistance releases grounding neurotransmitters that help bring the central nervous system back to baseline.",
    action: "Predictable, Unhurried, Soft, Heavy Work. Engage the child in carrying heavy crates, pushing milk tubs, or wall presses."
  },
  safe: {
    title: "S.A.F.E. Reset",
    image: "/images/cards/safe-reset.png",
    rationale: "Removes physical dominance in moments of distress. Lowering your body and exhaling intentionally helps regulate room energy.",
    action: "Space, Anchor, Flat Hands, Exhale. Sit parallel, place flat palms on the floor, and exhale slowly to signal absolute safety."
  },
  soft: {
    title: "S.O.F.T. Anchor",
    image: "/images/cards/soft-anchor.png",
    rationale: "Low vocal tones create steady vibrations that support down regulation, while firm contact offers bodily reassurance.",
    action: "Slow, Open, Firm, Tonal Hum. Stop erratic movement, hold firmly against your chest while humming a low steady tone."
  },
  trust: {
    title: "T.R.U.S.T. Touch Safety Shield",
    image: "/images/cards/trust-shield.png",
    rationale: "Aligned with National Child Safe Standards. Physical co-regulation always respects bodily autonomy and maintains clear educator transparency.",
    action: "Transparent in visible space, Responsive to release if stiff, Unforced without restraint, Safe Zones on shoulders or back, and Tell First with verbal notice."
  }
};

type CardKey = keyof typeof knowledgeCards | null;

export default function EducatorToolPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [copiedDoc, setCopiedDoc] = useState(false);
  const [copiedQip, setCopiedQip] = useState(false);
  const [activeCard, setActiveCard] = useState<CardKey>(null);

  // Card 1 & Card 2 Interactive Activity States
  const [selectedMorningIdea, setSelectedMorningIdea] = useState<string | null>(null);
  const [selectedPostureResponse, setSelectedPostureResponse] = useState<string | null>(null);

  // Form State
  const [adultTank, setAdultTank] = useState(70);
  const [adultAnchor, setAdultAnchor] = useState('');
  const [cameraEyesLoads, setCameraEyesLoads] = useState<string[]>([]);
  const [brainState, setBrainState] = useState('');
  const [easeCategory, setEaseCategory] = useState('');
  const [selectedRung, setSelectedRung] = useState('');
  const [playbookTech, setPlaybookTech] = useState('');
  const [trustApplied, setTrustApplied] = useState(false);

  // Options Data
  const adultAnchorOptions = [
    { id: 'anchored', label: 'Steady Anchor', desc: 'Slow breath, low shoulders, ready to loan calm.' },
    { id: 'vigilant', label: 'Rushed or Vigilant', desc: 'Fast posture, quick verbal directions, physical tension.' },
    { id: 'drained', label: 'Drained or Vocal Strain', desc: 'Sensory fatigue, running on empty, holding breath.' }
  ];

  const cameraEyesOptions = [
    { id: 'auditory', label: 'Auditory Sludge (Music, Echo, Chatter)', category: 'Acoustics' },
    { id: 'visual', label: 'Visual Overload (Harsh Fluorescents, Clutter)', category: 'Lighting' },
    { id: 'bottleneck', label: 'Spatial Bottleneck (Doorways, Bag Racks)', category: 'Space' },
    { id: 'transition', label: 'Rushed Schedule Transition Pressure', category: 'Routine' }
  ];

  const brainStateOptions = [
    { id: 'protect_brain', label: 'Protect Brain (Fight, Flight, Freeze)', desc: 'Prefrontal cortex offline. Spoken words trigger threat response.' },
    { id: 'safe_brain', label: 'Safe Brain (Elevated Arousal)', desc: 'Prefrontal cortex online, but sensory tank is draining fast.' }
  ];

  const easeOptions = [
    { id: 'env', label: 'E: Environment', desc: 'Acoustics, glare, temperature, space crowding.' },
    { id: 'att', label: 'A: Attachment & Connection', desc: 'Drop-off separation, relational rupture, seeking safe adult.' },
    { id: 'sen', label: 'S: Sensory Processing', desc: 'Seeking heavy work crashing or avoiding noise hiding.' },
    { id: 'emo', label: 'E: Emotional State', desc: 'Cumulative fatigue, emotional frustration overload.' }
  ];

  const ladderRungs = [
    { id: 'rung1', title: 'Rung 1: Immediate Safety (The Silent Signal)', desc: 'Tapped head silently to request backup without spiking room noise.' },
    { id: 'rung2', title: 'Rung 2: Soft Stature & Vocal Pitch', desc: 'Crouched low, turned body sideways, dropped vocal pitch below eye level.' },
    { id: 'rung3', title: 'Rung 3: Environmental Unburdening', desc: 'Dimmed overhead lights, turned off background audio to stop sensory leak.' },
    { id: 'rung4', title: 'Rung 4: Vagus Nerve Temperature Reset', desc: 'Offered cold face washer or cool water sip to lower heart rate.' },
    { id: 'rung5', title: 'Rung 5: Heavy Work Grounding', desc: 'Engaged proprioception with heavy pushing, lifting, or wall presses.' },
    { id: 'rung6', title: 'Rung 6: Sensory Co-Regulation', desc: 'Used rhythmic movement, steady breathing, or low tonal humming.' },
    { id: 'rung7', title: 'Rung 7: Validation & Space', desc: 'Offered quiet presence without demanding eye contact or quick fixes.' },
    { id: 'rung8', title: 'Rung 8: Low-Demand Transition', desc: 'Shifted from logic to simple visual or physical next step.' },
    { id: 'rung9', title: 'Rung 9: Primary Anchor Engagement', desc: 'Brought in primary attachment educator to re-establish relational safety.' },
    { id: 'rung10', title: 'Rung 10: Educator Tank Refill', desc: 'Handed over room responsibility to take a 2 minute sensory reset.' }
  ];

  const playbookOptions = [
    { id: 'push', name: 'P.U.S.H. Heavy Work', desc: 'Predictable, Unhurried, Soft, Heavy Work', key: 'push' },
    { id: 'safe', name: 'S.A.F.E. Reset', desc: 'Space, Anchor, Flat Hands, Exhale', key: 'safe' },
    { id: 'soft', name: 'S.O.F.T. Anchor', desc: 'Slow, Open, Firm, Tonal Hum', key: 'soft' }
  ];

  const toggleCameraEyes = (id: string) => {
    setCameraEyesLoads(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const generateCALMDoc = () => {
    const adultLabel = adultAnchorOptions.find(a => a.id === adultAnchor)?.label || 'Anchored';
    const loadsText = cameraEyesLoads.map(id => cameraEyesOptions.find(c => c.id === id)?.label).join(', ') || 'Standard room load';
    const brainText = brainState === 'protect_brain' ? 'Protect Brain survival state' : 'Safe Brain with elevated arousal';
    const easeText = easeOptions.find(e => e.id === easeCategory)?.label || 'Sensory & Environmental factors';
    const rungObj = ladderRungs.find(r => r.id === selectedRung);
    const playbookObj = playbookOptions.find(p => p.id === playbookTech);

    return `During non-contact reflection time, room dynamics were reviewed using the C.A.L.M. Framework.

C (Check): Room camera eyes identified environmental sensory loads (${loadsText}). Educator self-assessed sensory tank capacity at ${adultTank}% and maintained a ${adultLabel} posture to loan calm. ${selectedMorningIdea ? `Morning anchor committed: ${selectedMorningIdea}.` : ''} ${selectedPostureResponse ? `Floor posture focus: ${selectedPostureResponse}.` : ''}
A (Assess): The child was observed in a ${brainText}, decoded through the ${easeText} lens. Spoken demands were paused to respect neurophysiology.
L (Lead): Co-regulation was established using Educator Ladder 1 (${rungObj?.title || 'Sensory Reset'}). ${playbookObj ? `Applied ${playbookObj.name} technique.` : ''} ${trustApplied ? 'All physical touch strictly adhered to T.R.U.S.T. Touch Safety Shield guidelines.' : ''}
M (Monitor): Environmental adjustments restored baseline regulation, supporting room harmony without punitive measures.`;
  };

  const generateQipText = () => {
    const rungObj = ladderRungs.find(r => r.id === selectedRung);
    return `QIP CRITICAL REFLECTION & EVIDENCE SLIP
NATIONAL QUALITY STANDARD ALIGNMENT:
• QA 1.3.2 (Critical Reflection): Critical reflection on room environmental factors and adult co-regulation strategies used to adapt educational practice.
• QA 5.1.1 (Positive Relationships): Educator prioritized trauma-informed co-regulation over punitive compliance during elevated arousal moments.
• QA 3.1.2 (Environmental Setup): Identified and unburdened physical/auditory sensory bottlenecks in the learning environment.

REFLECTION SUMMARY:
• Educator Self-Regulation Tank: ${adultTank}% (${adultAnchorOptions.find(a => a.id === adultAnchor)?.label || 'Checked'})
• Key Trigger Decoded: ${easeOptions.find(e => e.id === easeCategory)?.label || 'Sensory/Environmental'}
• Practice Modification Implemented: ${rungObj?.title || 'Sensory Reset'}
• Quality Improvement Action: Shifted room setup to reduce visual/auditory sensory load prior to transition periods.`;
  };

  const copyDoc = () => { navigator.clipboard.writeText(generateCALMDoc()); setCopiedDoc(true); setTimeout(() => setCopiedDoc(false), 2000); };
  const copyQip = () => { navigator.clipboard.writeText(generateQipText()); setCopiedQip(true); setTimeout(() => setCopiedQip(false), 2000); };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B3833] p-4 md:p-10 font-sans relative">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E6E2DC] shadow-sm overflow-hidden print-only-container">
        
        {/* Header */}
        <div className="bg-[#1C3B34] text-white p-6 md:p-8 no-print">
          <div className="flex items-center space-x-2">
            <span className="bg-[#C29F60] text-[#1C3B34] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              C.A.L.M. Master Engine
            </span>
            <span className="text-white/60 text-xs">• Play Move Improve</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-normal mt-3 text-white">
            C.A.L.M. Room & Body Reflection
          </h1>
          <p className="text-sm text-white/80 mt-2 font-light leading-relaxed">
            By Robyn Papworth (Developmental Educator & AEP)
          </p>
        </div>

        {/* WELCOME SCREEN */}
        {!hasStarted ? (
          <div className="p-8 md:p-10 text-center no-print space-y-6">
            <div className="w-full h-56 bg-[#FAF5EC] rounded-2xl overflow-hidden border border-[#E6E2DC] max-w-lg mx-auto">
              <img 
                src="/images/cards/welcome-anchor.png" 
                alt="Educator Somatic Anchor Reset" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="max-w-lg mx-auto space-y-3">
              <h2 className="text-2xl font-serif text-[#1C3B34]">Welcome to your non-contact time.</h2>
              <p className="text-[#6A7873] leading-relaxed text-sm">
                Whether you are making a quiet cup of tea or stepping outside to prune the garden entrance, this tool is your micro-reset space. Reflect on room sensory loads, protect your energy, and turn floor insights into instant QIP evidence.
              </p>
            </div>

            <div className="bg-[#FAF5EC] border border-[#C29F60]/40 rounded-2xl p-5 max-w-lg mx-auto text-left">
              <h3 className="text-xs font-bold text-[#1C3B34] mb-1 uppercase tracking-wider">Reference Manual Deck:</h3>
              <p className="text-xs text-[#6A7873] mb-3">
                Need your Educator Escalation Deck nearby? Open the reference PDF in a new tab:
              </p>
              <a 
                href="/pdf/educator-ladder-1.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white border border-[#C29F60] text-[#C29F60] font-bold rounded-xl hover:bg-[#C29F60] hover:text-white transition-all text-xs shadow-sm"
              >
                Open Educator Ladder 1 PDF
              </a>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              className="py-3.5 px-9 bg-[#657B6C] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all text-base shadow-md"
            >
              Start Room Reflection
            </button>
          </div>
        ) : (
          <>
            {/* Step Indicators */}
            <div className="bg-[#F4F1EA] px-6 py-4 border-b border-[#E6E2DC] grid grid-cols-4 gap-2 text-center text-xs font-serif no-print">
              {['C: Check', 'A: Assess', 'L: Lead', 'M: Monitor & QIP'].map((label, idx) => (
                <div key={idx} className={`py-2 rounded-xl border transition-all ${step === idx + 1 ? 'bg-[#1C3B34] text-white border-[#1C3B34] font-bold shadow-sm' : 'bg-white/60 text-[#6A7873] border-[#E6E2DC]'}`}>
                  {label}
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8">
              
              {/* STEP 1: C - CHECK (Includes Card 1 & Card 2 Activities) */}
              {step === 1 && (
                <div className="space-y-8">
                  
                  {/* CARD 1: MORNING SENSORY RESET */}
                  <div className="bg-[#FAF5EC] border-2 border-[#C29F60]/40 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C29F60] block mb-1">CARD 1 • MORNING SENSORY ANCHOR</span>
                        <h3 className="text-lg font-serif font-bold text-[#1C3B34]">Give your body a gentle start tomorrow morning</h3>
                      </div>
                      <button 
                        onClick={() => setActiveCard('phone_reset')}
                        className="text-[10px] font-bold bg-white text-[#C29F60] border border-[#C29F60] px-2.5 py-1 rounded-full hover:bg-[#C29F60] hover:text-white transition-colors"
                      >
                        Card 1 Science
                      </button>
                    </div>

                    <p className="text-xs text-[#6A7873] leading-relaxed">
                      Mornings in early childhood are fast. What is one quick sensory moment you can give yourself as soon as your eyes open tomorrow before the day begins?
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {[
                        { id: 'curtain', label: 'Open the curtain and spot a bird outside' },
                        { id: 'water_face', label: 'Splash refreshing cool water on my face' },
                        { id: 'high_five', label: 'Give myself a gentle pause in the mirror' },
                        { id: 'cold_drink', label: 'Drink a crisp glass of cold water' }
                      ].map(idea => (
                        <button
                          key={idea.id}
                          onClick={() => setSelectedMorningIdea(idea.label)}
                          className={`p-3.5 rounded-xl border text-xs text-left font-medium transition-all ${
                            selectedMorningIdea === idea.label 
                              ? 'border-[#657B6C] bg-[#F1F4F2] text-[#1C3B34] font-bold shadow-sm' 
                              : 'border-[#E6E2DC] bg-white text-[#2B3833] hover:border-[#657B6C]/50'
                          }`}
                        >
                          {idea.label}
                        </button>
                      ))}
                    </div>

                    {selectedMorningIdea && (
                      <div className="mt-3 p-3.5 bg-white border border-[#C29F60]/40 rounded-xl text-xs text-[#1C3B34] font-medium leading-relaxed animate-in fade-in duration-300">
                        A wonderful choice. This simple physical action signals to your central nervous system that you are safe before stepping onto the floor.
                      </div>
                    )}
                  </div>

                  {/* CARD 2: SOFT STATURE & VOCAL PITCH */}
                  <div className="bg-[#F1F4F2] border-2 border-[#657B6C]/40 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#657B6C] block mb-1">CARD 2 • SOFT STATURE & VOCAL PITCH</span>
                        <h3 className="text-lg font-serif font-bold text-[#1C3B34]">How did your body stature adjust when room energy rose today?</h3>
                      </div>
                      <button 
                        onClick={() => setActiveCard('card2_posture')}
                        className="text-[10px] font-bold bg-white text-[#657B6C] border border-[#657B6C] px-2.5 py-1 rounded-full hover:bg-[#657B6C] hover:text-white transition-colors"
                      >
                        Card 2 Science
                      </button>
                    </div>

                    <p className="text-xs text-[#6A7873] leading-relaxed">
                      Our bodies naturally stand tall and raise vocal volume when noise spikes because our brain wants to bring order to the space. Which gentle stature shift will you focus on during high volume moments tomorrow?
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {[
                        { id: 'height', label: 'Drop physical height below eye level' },
                        { id: 'sideways', label: 'Turn body 45 degrees sideways' },
                        { id: 'pitch', label: 'Drop vocal pitch and volume by half' }
                      ].map(posture => (
                        <button
                          key={posture.id}
                          onClick={() => setSelectedPostureResponse(posture.label)}
                          className={`p-3.5 rounded-xl border text-xs text-left font-medium transition-all ${
                            selectedPostureResponse === posture.label 
                              ? 'border-[#1C3B34] bg-[#1C3B34] text-white font-bold shadow-sm' 
                              : 'border-[#E6E2DC] bg-white text-[#2B3833] hover:border-[#657B6C]/50'
                          }`}
                        >
                          {posture.label}
                        </button>
                      ))}
                    </div>

                    {selectedPostureResponse && (
                      <div className="mt-3 p-3.5 bg-white border border-[#657B6C]/30 rounded-xl text-xs text-[#1C3B34] font-medium leading-relaxed animate-in fade-in duration-300">
                        Focus set: {selectedPostureResponse}. Children feel immediate relational safety when adults soften their physical height and drop vocal pitch.
                      </div>
                    )}
                  </div>

                  {/* SENSORY TANK SLIDER */}
                  <div className="bg-linear-to-r from-[#F1F4F2] to-[#FAF8F5] p-6 rounded-2xl border border-[#657B6C]/30 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#657B6C]">Interactive Self Check</span>
                      <span className={`text-sm font-bold ${adultTank > 70 ? 'text-[#657B6C]' : adultTank > 35 ? 'text-[#C29F60]' : 'text-[#D97757]'}`}>
                        Sensory Tank: {adultTank}%
                      </span>
                    </div>
                    <input type="range" min="10" max="100" value={adultTank} onChange={(e) => setAdultTank(Number(e.target.value))} className="w-full accent-[#657B6C] cursor-pointer" />
                    <p className="text-xs text-[#6A7873] mt-3 italic leading-relaxed">
                      "You cannot loan calm if your own tank is empty." Slide to reflect your personal capacity today.
                    </p>
                  </div>

                  {/* ADULT ANCHOR */}
                  <div>
                    <h2 className="text-xl font-serif text-[#1C3B34] mb-3">C: Check Adult State & Room Load</h2>
                    <div className="space-y-3">
                      {adultAnchorOptions.map(opt => (
                        <button key={opt.id} onClick={() => setAdultAnchor(opt.id)} className={`w-full text-left p-4 rounded-2xl border transition-all ${adultAnchor === opt.id ? 'border-[#657B6C] bg-[#F1F4F2] shadow-sm' : 'border-[#E6E2DC] bg-white hover:border-[#657B6C]/50'}`}>
                          <div className="font-medium text-[#1C3B34]">{opt.label}</div>
                          <div className="text-xs text-[#6A7873] mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CAMERA EYES SCAN */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#657B6C] block mb-2">Camera Eyes Room Scan</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cameraEyesOptions.map(opt => {
                        const active = cameraEyesLoads.includes(opt.id);
                        return (
                          <button key={opt.id} onClick={() => toggleCameraEyes(opt.id)} className={`text-left p-4 rounded-2xl border text-sm transition-all ${active ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm' : 'border-[#E6E2DC] bg-white text-[#2B3833] hover:border-[#657B6C]'}`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`text-[10px] uppercase tracking-wider font-bold ${active ? 'text-[#C29F60]' : 'text-[#6A7873]'}`}>{opt.category}</span>
                            </div>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: A - ASSESS */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-serif text-[#1C3B34] mb-3">A: Assess Brain State</h2>
                    <button 
                      onClick={() => setActiveCard('protect_brain')} 
                      className="mb-4 w-full flex items-center justify-between p-3.5 bg-[#FAF5EC] border border-[#C29F60]/50 rounded-xl text-[#1C3B34] hover:bg-[#C29F60] hover:text-white transition-all shadow-sm group"
                    >
                      <span className="font-bold flex items-center gap-2">View Knowledge Card: Protect Brain</span>
                      <span className="text-xs uppercase tracking-widest font-bold opacity-80 group-hover:opacity-100">Read Card</span>
                    </button>
                    
                    <div className="space-y-3">
                      {brainStateOptions.map(opt => (
                        <button key={opt.id} onClick={() => setBrainState(opt.id)} className={`w-full text-left p-4 rounded-2xl border transition-all ${brainState === opt.id ? 'border-[#657B6C] bg-[#F1F4F2] shadow-sm' : 'border-[#E6E2DC] bg-white hover:border-[#657B6C]/50'}`}>
                          <div className="font-medium text-[#1C3B34]">{opt.label}</div>
                          <div className="text-xs text-[#6A7873] mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif text-[#1C3B34] mb-3">E.A.S.E. Observation Lens</h2>
                    <button 
                      onClick={() => setActiveCard('ease')} 
                      className="mb-4 w-full flex items-center justify-between p-3.5 bg-[#FAF5EC] border border-[#C29F60]/50 rounded-xl text-[#1C3B34] hover:bg-[#C29F60] hover:text-white transition-all shadow-sm group"
                    >
                      <span className="font-bold flex items-center gap-2">View Knowledge Card: E.A.S.E. Lens</span>
                      <span className="text-xs uppercase tracking-widest font-bold opacity-80 group-hover:opacity-100">Read Card</span>
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {easeOptions.map(opt => {
                        const isSelected = easeCategory === opt.id;
                        return (
                          <button key={opt.id} onClick={() => setEaseCategory(opt.id)} className={`text-left p-4 rounded-2xl border transition-all ${isSelected ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm' : 'border-[#E6E2DC] bg-white text-[#2B3833] hover:border-[#657B6C]'}`}>
                            <div className="font-medium">{opt.label}</div>
                            <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-[#6A7873]'}`}>{opt.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: L - LEAD */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-serif text-[#1C3B34] mb-3">L: Lead with Connection</h2>
                    <p className="text-sm text-[#6A7873] mb-4">Select the specific Ladder 1 Rung you applied to lower threat:</p>
                    
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 rounded-xl">
                      {ladderRungs.map(rung => (
                        <button key={rung.id} onClick={() => setSelectedRung(rung.id)} className={`w-full text-left p-3.5 rounded-2xl border text-sm transition-all ${selectedRung === rung.id ? 'border-[#657B6C] bg-[#F1F4F2] font-medium shadow-sm' : 'border-[#E6E2DC] bg-white hover:border-[#657B6C]/50'}`}>
                          <div className="text-[#1C3B34] font-semibold">{rung.title}</div>
                          <div className="text-xs text-[#6A7873] mt-0.5">{rung.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#E6E2DC] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#657B6C] block mb-3">Field Playbook Techniques</span>
                      <div className="space-y-3">
                        {playbookOptions.map(p => (
                          <div key={p.id} className="flex flex-col space-y-2 bg-white border border-[#E6E2DC] rounded-xl p-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input 
                                type="radio" 
                                name="playbook"
                                checked={playbookTech === p.id} 
                                onChange={() => setPlaybookTech(p.id)} 
                                className="text-[#C29F60] focus:ring-0 w-4 h-4"
                              />
                              <span className="font-bold text-sm text-[#1C3B34]">{p.name}</span>
                            </label>
                            <button 
                              onClick={() => setActiveCard(p.key as CardKey)} 
                              className="text-left text-xs bg-[#FAF5EC] text-[#C29F60] px-3 py-2 rounded-lg font-bold hover:bg-[#C29F60] hover:text-white transition-colors"
                            >
                              Read the {p.name} Breakdown
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#657B6C] block mb-3">Section 4: Touch Safety</span>
                      <button 
                        onClick={() => setActiveCard('trust')} 
                        className="mb-3 w-full flex items-center justify-between p-3 bg-[#FAF5EC] border border-[#C29F60]/50 rounded-xl text-[#1C3B34] hover:bg-[#C29F60] hover:text-white transition-all shadow-sm group"
                      >
                        <span className="font-bold text-sm">View Knowledge Card: T.R.U.S.T. Shield</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 group-hover:opacity-100">Read Card</span>
                      </button>

                      <label className="flex items-start space-x-3 p-4 bg-[#FAF8F5] border border-[#E6E2DC] rounded-xl cursor-pointer hover:border-[#657B6C]/50 transition-colors">
                        <input type="checkbox" checked={trustApplied} onChange={(e) => setTrustApplied(e.target.checked)} className="mt-0.5 rounded text-[#657B6C] focus:ring-0 w-4 h-4" />
                        <span className="text-xs text-[#2B3833] leading-tight">
                          <strong>T.R.U.S.T. Shield Applied:</strong> Transparent, Responsive, Unforced, Safe Zones, Tell First.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: M - MONITOR */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-serif text-[#1C3B34] mb-3">Output 1: Pedagogical Journal Record</h2>
                    <div className="p-5 bg-[#FAF8F5] border border-[#E6E2DC] rounded-2xl text-sm leading-relaxed text-[#2B3833] font-mono whitespace-pre-line">
                      {generateCALMDoc()}
                    </div>
                    <button onClick={copyDoc} className="mt-3 w-full py-3 px-4 bg-[#1C3B34] text-white font-medium rounded-xl hover:bg-opacity-95 transition-all text-sm shadow-sm no-print">
                      {copiedDoc ? 'Copied Daily Log' : 'Copy Daily Log Text'}
                    </button>
                  </div>

                  <div className="border-t border-[#E6E2DC] pt-6 qip-document-page">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#C29F60] uppercase tracking-widest block">NATIONAL QUALITY STANDARD EVIDENCE</span>
                        <h3 className="text-base font-serif font-bold text-[#1C3B34]">QIP Critical Reflection Document</h3>
                      </div>
                      <span className="text-[10px] bg-[#657B6C]/10 text-[#657B6C] px-2 py-1 rounded font-bold">QA 1.3.2 • QA 5.1.1</span>
                    </div>
                    <div className="p-5 bg-[#FAF5EC] border border-[#C29F60]/40 rounded-xl text-sm leading-relaxed font-sans text-[#2B3833] whitespace-pre-line">
                      {generateQipText()}
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 no-print">
                      <button onClick={copyQip} className="w-full py-3 px-4 bg-[#C29F60] text-[#1C3B34] font-bold rounded-xl hover:bg-opacity-90 transition-all text-sm shadow-sm">
                        {copiedQip ? 'Copied QIP Text' : 'Copy QIP Text'}
                      </button>
                      <button onClick={() => window.print()} className="w-full py-3 px-4 bg-[#657B6C] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all text-sm shadow-sm">
                        Print QIP Document
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 pt-5 border-t border-[#E6E2DC] flex justify-between items-center no-print">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="py-2.5 px-5 text-sm font-medium text-[#6A7873] hover:text-[#1C3B34] transition-colors">Back</button>
                ) : <div />}

                {step < 4 ? (
                  <button disabled={(step === 1 && (!adultAnchor || cameraEyesLoads.length === 0)) || (step === 2 && (!brainState || !easeCategory)) || (step === 3 && !selectedRung)} onClick={() => setStep(step + 1)} className="py-2.5 px-7 bg-[#657B6C] text-white font-medium rounded-xl hover:bg-opacity-95 disabled:opacity-40 transition-all text-sm shadow-sm">
                    Next Step
                  </button>
                ) : (
                  <button onClick={() => { setHasStarted(false); setStep(1); setAdultTank(70); setAdultAnchor(''); setCameraEyesLoads([]); setBrainState(''); setEaseCategory(''); setSelectedRung(''); setPlaybookTech(''); setTrustApplied(false); setSelectedMorningIdea(null); setSelectedPostureResponse(null); }} className="py-2.5 px-5 text-sm font-medium text-[#1C3B34] hover:underline">
                    Start Over
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* KNOWLEDGE MODAL */}
      {activeCard && knowledgeCards[activeCard] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setActiveCard(null)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#2B3833] text-xs font-bold px-2.5 py-1 rounded-full shadow hover:bg-white z-10"
            >
              Close
            </button>

            <div className="w-full h-48 bg-[#F4F1EA] relative border-b border-[#E6E2DC]">
              <img 
                src={knowledgeCards[activeCard].image} 
                alt={knowledgeCards[activeCard].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-serif text-[#1C3B34] font-bold mb-3">
                {knowledgeCards[activeCard].title}
              </h3>
              
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#657B6C] block mb-1">Neuro-Rationale</span>
                <p className="text-sm text-[#6A7873] leading-relaxed">
                  {knowledgeCards[activeCard].rationale}
                </p>
              </div>

              <div className="bg-[#FAF5EC] border border-[#C29F60]/30 p-4 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C29F60] block mb-1">Quick Floor Action</span>
                <p className="text-sm text-[#1C3B34] font-medium leading-relaxed">
                  {knowledgeCards[activeCard].action}
                </p>
              </div>

              <button 
                onClick={() => setActiveCard(null)}
                className="mt-5 w-full py-3 bg-[#657B6C] text-white rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-sm"
              >
                Return to Reflection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}