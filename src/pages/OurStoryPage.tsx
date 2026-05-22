import { motion } from "motion/react";
import BackButton from "../components/BackButton";

export default function OurStoryPage() {
  return (
    <div className="pt-40 pb-24 px-6 bg-brand-paper min-h-screen">
      <BackButton />
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif italic mb-12">The Beginning of the Verse</h2>
          <div className="aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-xl">
             <img 
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200" 
              alt="Our History" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl leading-relaxed text-brand-ink/70 mb-16 text-left first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
            The Story Cafe was founded on a simple realization: in a world moving at the speed of light, we are losing the art of the pause. We believe that a coffee shop should be more than a transaction; it should be a sanctuary where stories are told, read, and begun. Our beans are sourced from independent growers who treat their land like a masterpiece, and our bread is baked with the same patience required for a long-form novel.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left mb-24">
            {[
              { label: "Community", value: "Every guest becomes a character in our story, bringing their own unique narrative to our shared table." },
              { label: "Quality", value: "From the first bloom of the pour-over to the last crumb of the croissant, we never compromise." },
              { label: "Peace", value: "In our space, time slows down. We prioritize the analog in a digital world." }
            ].map((pill, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-white shadow-sm border border-brand-ink/5"
              >
                <h3 className="font-serif font-bold text-brand-sepia mb-4 text-xl">{pill.label}</h3>
                <p className="text-sm text-brand-ink/60 leading-relaxed">{pill.value}</p>
              </motion.div>
            ))}
          </div>

          {/* New Sections */}
          <div className="space-y-32 text-left">
            {/* The Curator's Note */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-serif italic mb-6 text-brand-sepia">The Curator's Note</h3>
                <blockquote className="text-2xl font-serif italic text-brand-ink/40 mb-8 leading-snug">
                  "I wanted to build a place that felt like the margins of your favorite book—a place where you could leave your mark and take a piece of someone else's journey with you."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-clay text-white flex items-center justify-center font-serif text-xl italic">J</div>
                  <div>
                    <p className="font-bold text-brand-sepia">Julian Vane</p>
                    <p className="text-xs uppercase tracking-widest text-brand-ink/40">Founder / Lead Storyteller</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 aspect-square rounded-[60px] overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Julian Vane" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Timeline of Chapters */}
            <div>
              <h3 className="text-3xl font-serif italic mb-12 text-center text-brand-sepia">Timeline of Chapters</h3>
              <div className="relative border-l-2 border-brand-clay/20 ml-4 md:ml-0 md:left-1/2 md:-translate-x-[1px] space-y-16">
                {[
                  { year: "2020", title: "The First Draft", desc: "Julian finds the perfect corner in the heart of Gachibowli, Hyderabad." },
                  { year: "2021", title: "The Narrative Arc", desc: "Restoration begins, preserving the original stone work and soul of the space." },
                  { year: "2022", title: "Published", desc: "The Story Cafe opens its doors, serving the first cup of 'The Prologue' roast." },
                  { year: "2024", title: "A Growing Anthology", desc: "Voted city's most beloved sanctuary for thinkers and dreamers." }
                ].map((item, idx) => (
                  <div key={idx} className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute left-[-11px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 bg-brand-sepia rounded-full border-4 border-brand-paper shadow-sm" />
                    <div className="w-full md:w-1/2 md:px-12">
                      <span className="text-brand-clay font-bold tracking-widest text-sm">{item.year}</span>
                      <h4 className="text-xl font-serif italic text-brand-sepia mb-2">{item.title}</h4>
                      <p className="text-sm text-brand-ink/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Library Concept */}
            <div className="bg-brand-sepia text-brand-cream rounded-[40px] md:rounded-[80px] p-12 md:p-20 relative overflow-hidden">
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-4xl font-serif italic mb-6">The Living Library</h3>
                  <p className="text-lg opacity-80 leading-relaxed mb-8">
                    Our walls are lined with over 2,000 books, all donated by our community. If you find a story that speaks to you, take it home. All we ask is that you replace it with a book that has spoken to you in the past.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-6 py-3 border border-brand-cream/20 rounded-full text-sm font-bold">2.4k Books Exchanged</div>
                    <div className="px-6 py-3 border border-brand-cream/20 rounded-full text-sm font-bold">Daily Readings</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-3xl overflow-hidden -rotate-6">
                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400" alt="Bookshelf" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden rotate-12 translate-y-8">
                    <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=400" alt="Old Pages" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-clay/10 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
            {/* Virtual Tour */}
            <div className="space-y-12">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-serif italic text-brand-sepia mb-4">A Portal to Our Sanctuary</h3>
                <p className="text-brand-ink/60 max-w-2xl">Find your favorite corner before you even step through the door. Our 360° virtual tour lets you explore the nooks, the crannies, and the perfectly lit writing desks.</p>
              </div>
              
              <div className="relative group rounded-[40px] overflow-hidden aspect-video shadow-2xl bg-brand-ink/5 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600" 
                  alt="Cafe Interior" 
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-sepia/20 flex flex-col items-center justify-center backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                  <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center shadow-2xl mb-6 cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-brand-sepia border-b-[10px] border-b-transparent ml-1" />
                  </div>
                  <h4 className="text-white text-2xl font-serif italic tracking-widest uppercase">Take the 360° Tour</h4>
                  <p className="text-white/60 text-xs mt-2 uppercase tracking-[0.3em]">Click to Enter</p>
                </div>
                
                {/* 360 Controls UI Mockup */}
                <div className="absolute bottom-8 left-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 bg-white/80 backdrop-blur rounded-full text-brand-sepia shadow-xl cursor-not-allowed">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </div>
                  <div className="p-3 bg-white/80 backdrop-blur rounded-full text-brand-sepia shadow-xl cursor-not-allowed">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "The Alchemist's Bar", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400" },
                  { name: "The Quiet Margins", img: "https://images.unsplash.com/photo-1521017432521-f34f73817a50?auto=format&fit=crop&q=80&w=400" },
                  { name: "The Poet's Window", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400" },
                  { name: "The Community Table", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400" }
                ].map((room, idx) => (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-square shadow-md cursor-pointer">
                    <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-brand-sepia/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-[10px] font-bold uppercase tracking-widest">{room.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
