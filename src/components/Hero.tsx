import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-clay/10 text-brand-sepia text-[10px] md:text-xs font-bold uppercase tracking-widest">
              EST. 2024 • HYDERABAD, INDIA
            </span>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('community-events')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sepia text-brand-cream rounded-full text-[10px] font-bold uppercase tracking-wide shadow-lg shadow-brand-sepia/20 cursor-pointer"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Next Chapter: Open Mic Friday
            </motion.button>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif lg:leading-[0.9] mb-8">
            Every cup <br />
            <span className="italic text-brand-sepia">tells a story.</span>
          </h2>
          <p className="text-base md:text-lg text-brand-ink/70 max-w-md mb-10 leading-relaxed">
            Welcome to a place where the aroma of freshly ground beans meets the warmth of a handwritten letter. Stay a while, read a book, and write your next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link 
                to="/menu"
                className="px-8 py-4 bg-brand-sepia text-brand-cream rounded-full font-bold shadow-lg shadow-brand-sepia/20 transition-all hover:bg-brand-ink block text-center"
              >
                Begin Your Order
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link 
                to="/our-story"
                className="px-8 py-4 border border-brand-sepia/20 rounded-full font-bold transition-all hover:bg-brand-sepia/10 block text-center"
              >
                Explore Our History
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="relative aspect-square mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-brand-clay/5 rounded-[40px] md:rounded-[100px] rotate-6 scale-95" />
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover rounded-[40px] md:rounded-[100px] shadow-2xl relative z-10"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl z-20 max-w-[160px] md:max-w-[200px]"
          >
            <p className="text-[10px] md:text-xs italic text-brand-sepia mb-2">"The beans are roasted to perfection, carrying notes of the story we've built here."</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-brand-clay" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
