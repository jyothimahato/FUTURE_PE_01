import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Coffee, BookOpen, PartyPopper, Moon, ChevronRight, Plus, Sparkles } from "lucide-react";
import { MenuItem, MENU_ITEMS } from "../types";

const MOODS = [
  {
    id: "pick-me-up",
    label: "I need a pick-me-up",
    icon: Coffee,
    pairing: ["bv-1", "ds-1"], // Espresso + Lemon Tart
    story: "For the weary traveler in need of a spark. Sharp citrus meets bold roast.",
    color: "bg-brand-sepia",
  },
  {
    id: "study",
    label: "I’m here to study",
    icon: BookOpen,
    pairing: ["bv-3", "ds-2"], // Earl Grey + Scone
    story: "The scholar's companion. Elegant hydration paired with a gentle crumb.",
    color: "bg-brand-ink",
  },
  {
    id: "celebrate",
    label: "Celebrating a win",
    icon: PartyPopper,
    pairing: ["cs-1", "cr-2"], // Bangla Paneer + Biscoff Croissant
    story: "A feast for the victorious. Savory signatures followed by golden indulgence.",
    color: "bg-brand-clay",
  },
  {
    id: "cozy",
    label: "Seeking inner peace",
    icon: Moon,
    pairing: ["bv-2", "cr-3"], // Chamomile + Plain Croissant
    story: "A quiet moment for your thoughts. Calming herbal notes and buttery simplicity.",
    color: "bg-brand-gold",
  }
];

interface MoodPairingProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function MoodPairing({ onAddToCart }: MoodPairingProps) {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  const selectedMood = MOODS.find(m => m.id === selectedMoodId);
  const pairingItems = selectedMood 
    ? selectedMood.pairing.map(id => MENU_ITEMS.find(item => item.id === id)).filter(Boolean) as MenuItem[]
    : [];

  const handleOrderPairing = () => {
    pairingItems.forEach(item => onAddToCart(item));
    setSelectedMoodId(null);
  };

  return (
    <div className="mb-24">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-serif italic text-brand-sepia mb-2">How's your story today?</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Select your mood for a curated pairing</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMoodId(mood.id)}
            className={`flex flex-col items-center gap-4 p-8 rounded-[40px] border-2 transition-all ${
              selectedMoodId === mood.id
              ? `${mood.color} border-transparent text-white shadow-2xl`
              : "bg-white border-brand-ink/5 text-brand-ink hover:border-brand-sepia/20"
            }`}
          >
            <mood.icon className={`w-8 h-8 ${selectedMoodId === mood.id ? "text-white" : "text-brand-sepia"}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-center">{mood.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[50px] p-8 md:p-12 shadow-2xl border border-brand-ink/5 relative overflow-hidden"
          >
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sepia/5 text-brand-sepia text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Sparkles className="w-3 h-3" /> Recommended Chapter
                </div>
                <h4 className="text-3xl font-serif italic text-brand-sepia mb-4">{selectedMood.label}</h4>
                <p className="text-brand-ink/60 italic mb-8 leading-relaxed">
                  "{selectedMood.story}"
                </p>
                <button 
                  onClick={handleOrderPairing}
                  className={`flex items-center gap-3 px-8 py-4 ${selectedMood.color} text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-lg`}
                >
                  Order This Pairing <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-4">
                {pairingItems.map((item, idx) => (
                  <div key={item.id} className="flex-1 relative group">
                    <div className="aspect-[4/5] rounded-[30px] bg-brand-cream border-4 border-white shadow-xl p-6 flex flex-col justify-center items-center text-center">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-brand-ink/40 mb-2">{item.category}</p>
                      <h5 className="text-brand-sepia font-serif italic font-bold text-lg leading-tight mb-2">{item.name}</h5>
                      <p className="text-xs font-bold text-brand-clay">₹{item.price}</p>
                    </div>
                    {idx === 0 && (
                      <div className="absolute top-1/2 -right-4 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-brand-ink/5">
                        <Plus className="w-4 h-4 text-brand-sepia" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background Accent */}
            <selectedMood.icon className="absolute top-[-40px] left-[-40px] w-64 h-64 text-brand-ink/5 -rotate-12" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
