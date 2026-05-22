import { motion } from "motion/react";
import { Calendar, Clock, Users, UtensilsCrossed, QrCode } from "lucide-react";
import { useState } from "react";
import BackButton from "../components/BackButton";

export default function BookATablePage() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 bg-brand-cream min-h-screen">
      <BackButton />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-5xl font-serif italic mb-8">Reserve Your Chapter</h2>
          <p className="text-xl text-brand-ink/70 mb-12 leading-relaxed">
            Ensure your place in our sanctuary. Whether it's a quiet corner for writing or a large table for shared wisdom, we'll keep a spot warm for you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm border border-brand-ink/5">
              <div className="w-12 h-12 rounded-full bg-brand-clay/10 flex items-center justify-center text-brand-sepia">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-brand-ink/60">Groups larger than 8? Please send us a message via the Contact page.</p>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl shadow-sm border border-brand-ink/5">
              <div className="w-12 h-12 rounded-full bg-brand-clay/10 flex items-center justify-center text-brand-sepia">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-brand-ink/60">Tables are held for 15 minutes beyond your reservation time.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[40px] p-8 lg:p-12 text-brand-ink shadow-2xl relative overflow-hidden"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif italic mb-2">Table Reserved</h3>
              <p className="text-brand-ink/60 mb-8">Your chapter is waiting. Show this ticket at the counter.</p>
              
              <div className="bg-brand-paper p-8 rounded-3xl border-2 border-dashed border-brand-sepia/20 relative mb-8">
                {/* Punch holes */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full -translate-y-1/2" />
                
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                    <QrCode className="w-32 h-32 text-brand-sepia" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sepia/60">Reference</p>
                  <p className="text-2xl font-serif tracking-widest text-brand-sepia mb-4">{bookingRef}</p>
                  <p className="text-xs text-brand-ink/40">Valid for specified date & time only</p>
                </div>
              </div>

              <button 
                onClick={() => setSubmitted(false)}
                className="text-brand-sepia font-bold underline text-sm"
              >
                Make another booking
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Full Name</label>
                <input required type="text" className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" placeholder="Your name" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink/30" />
                    <input required type="date" className="w-full bg-brand-paper pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink/30" />
                    <input required type="time" className="w-full bg-brand-paper pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Number of Guests</label>
                <select className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20 appearance-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Special Notes</label>
                <textarea rows={2} className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20 resize-none" placeholder="Allergies, birthday, or a preferred window seat?" />
              </div>

              <button className="w-full py-5 bg-brand-sepia text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors shadow-xl shadow-brand-sepia/20">
                Book My Table
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
