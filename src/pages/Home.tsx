import Hero from "../components/Hero";
import { motion } from "motion/react";
import { ArrowRight, Star, Mic2, BookOpen, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { MenuItem, MENU_ITEMS } from "../types";

interface HomeProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const chefsSpecials = MENU_ITEMS.filter(item => item.category === "Chef's Special");

  return (
    <div className="pt-20">
      <Hero />

      {/* Chef's Special Highlights */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="flex items-center gap-2 text-brand-sepia font-bold uppercase tracking-widest text-xs mb-4">
                <Star className="w-4 h-4 fill-brand-sepia" />
                Highly Recommended
              </span>
              <h2 className="text-5xl font-serif italic text-brand-sepia">Chef's Special Edition</h2>
            </div>
            <Link 
              to="/menu" 
              className="group flex items-center gap-2 text-brand-ink/60 font-bold hover:text-brand-sepia transition-colors"
            >
              Explore Full Anthology <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefsSpecials.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-brand-cream rounded-[40px] p-8 hover:shadow-2xl transition-all duration-500 border border-brand-ink/5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-clay mb-2 block">{item.category}</span>
                  <h3 className="text-3xl font-serif font-bold text-brand-sepia mb-4 leading-tight">{item.name}</h3>
                  <p className="text-sm text-brand-ink/60 italic leading-relaxed mb-6 line-clamp-3 font-medium">
                    "{item.description}"
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-ink/5">
                  <div className="flex flex-col">
                    <p className="text-xl font-serif font-bold text-brand-sepia">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-[8px] uppercase font-bold tracking-widest text-brand-ink/30">
                        {item.isVeg ? 'Vegetarian' : 'Non-Veg'}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(item)}
                    className="p-4 bg-brand-sepia text-white rounded-2xl shadow-lg shadow-brand-sepia/20 hover:bg-brand-ink transition-colors group/order"
                  >
                    <Plus className="w-5 h-5 group-hover/order:rotate-90 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events Hosting */}
      <section id="community-events" className="py-24 px-6 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-sepia text-white text-[10px] font-bold uppercase tracking-widest">
                Our Shared Verse
              </span>
              <h2 className="text-5xl font-serif italic text-brand-sepia leading-tight">
                Where stories find their voice.
              </h2>
              <p className="text-xl text-brand-ink/70 leading-relaxed">
                The Story Cafe is more than a destination for coffee; it's a sanctuary for the shared human experience. We believe every voice deserves a stage and every book deserves a discussion.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-brand-ink/5 group hover:border-brand-sepia/30 transition-colors">
                  <div className="p-4 bg-brand-clay/10 rounded-2xl text-brand-sepia">
                    <Mic2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-brand-sepia mb-1">Open Mic Nights</h4>
                    <p className="text-sm text-brand-ink/60">Every Friday evening, we dim the lights and open the heart. Bring your poetry, your songs, or your unspoken prose.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-brand-ink/5 group hover:border-brand-sepia/30 transition-colors">
                  <div className="p-4 bg-brand-clay/10 rounded-2xl text-brand-sepia">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-brand-sepia mb-1">Cornerstone Book Club</h4>
                    <p className="text-sm text-brand-ink/60">Monthly gatherings where we dive deep into the narratives that shape us. Shared wisdom over artisanal roasts.</p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-brand-sepia font-serif italic text-lg hover:gap-4 transition-all"
              >
                Inquire about hosting your event <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-[60px] overflow-hidden shadow-2xl z-10">
                <img 
                  src="https://images.unsplash.com/photo-1526724329249-111192244196?auto=format&fit=crop&q=80&w=800" 
                  alt="Open Mic Night" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                  <div className="text-white">
                    <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Next Event</p>
                    <h3 className="text-3xl font-serif italic">Friday Poetry Slam</h3>
                    <p className="opacity-70 mt-2">Doors open at 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-clay/5 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Teaser */}
      <section className="py-24 px-6 bg-brand-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" 
              alt="Fresh Brew" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif italic mb-6">A Curated Anthology of Flavors</h2>
            <p className="text-brand-ink/70 mb-8 leading-relaxed">
              From our signature Chef's Specials to our artisanal croissants, every item on our menu is a carefully crafted character in the story of your day.
            </p>
            <Link 
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-sepia text-white rounded-full font-bold hover:bg-brand-ink transition-all"
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
