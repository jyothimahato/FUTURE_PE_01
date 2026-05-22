import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Filter, Sparkles, Plus, AlertCircle, ShoppingCart } from "lucide-react";
import { MenuItem, MENU_ITEMS } from "../types";
import BackButton from "../components/BackButton";

interface SmartFilterPageProps {
  onAddToCart: (item: MenuItem) => void;
  cartCount: number;
}

export default function SmartFilterPage({ onAddToCart, cartCount }: SmartFilterPageProps) {
  const [filters, setFilters] = useState({
    noGluten: false,
    noDairy: false,
    noNuts: false,
    onlyVeg: false,
  });

  const filteredItems = MENU_ITEMS.filter(item => {
    if (filters.noGluten && item.hasGluten) return false;
    if (filters.noDairy && item.hasDairy) return false;
    if (filters.noNuts && item.hasNuts) return false;
    if (filters.onlyVeg && !item.isVeg) return false;
    return true;
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 px-6 bg-brand-cream min-h-screen">
      <BackButton />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sepia/5 text-brand-sepia text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3 h-3" /> Dining With Precision
            </div>
            <h1 className="text-4xl md:text-5xl font-serif italic text-brand-sepia mb-4">The Smart Anthology</h1>
            <p className="text-brand-ink/60 italic max-w-xl">
              Tell us your preferences, and we'll curate a menu that respects your narrative. No icons, just the characters you want to meet.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-[40px] shadow-xl border border-brand-ink/5 flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-sepia">{filteredItems.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Visible Items</p>
            </div>
            <div className="w-px h-10 bg-brand-ink/10" />
            <div className="relative">
                <ShoppingCart className="w-6 h-6 text-brand-sepia" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-clay text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Controls */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-brand-ink/5 sticky top-32">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-brand-ink/5">
                <Filter className="w-5 h-5 text-brand-sepia" />
                <h2 className="text-xl font-serif italic text-brand-sepia">Smart Filters</h2>
              </div>

              <div className="space-y-4">
                {[
                  { id: "noGluten", label: "Gluten Free", desc: "Hide wheat & gluten" },
                  { id: "noDairy", label: "Dairy Free", desc: "Hide milk & cheese" },
                  { id: "noNuts", label: "Nut Free", desc: "Hide peanuts & tree nuts" },
                  { id: "onlyVeg", label: "Vegetarian", desc: "Plant-based only" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleFilter(f.id as keyof typeof filters)}
                    className={`w-full group p-4 rounded-3xl border-2 transition-all text-left flex items-center justify-between ${
                      filters[f.id as keyof typeof filters]
                      ? "bg-brand-sepia border-brand-sepia text-white shadow-lg shadow-brand-sepia/20"
                      : "bg-white border-brand-ink/5 text-brand-ink/60 hover:border-brand-sepia/30"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold leading-none mb-1">{f.label}</p>
                      <p className={`text-[10px] uppercase tracking-widest opacity-60`}>
                        {f.desc}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      filters[f.id as keyof typeof filters] ? "bg-white border-white" : "border-brand-ink/10"
                    }`}>
                      {filters[f.id as keyof typeof filters] && <Sparkles className="w-3 h-3 text-brand-sepia" />}
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setFilters({ noGluten: false, noDairy: false, noNuts: false, onlyVeg: false })}
                className="w-full mt-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-ink/40 hover:text-brand-sepia transition-colors"
                type="button"
              >
                Reset Curations
              </button>
            </div>

            <div className="p-6 bg-brand-clay/5 rounded-3xl border border-brand-clay/10">
                <div className="flex gap-3 text-brand-clay mb-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Kitchen Disclaimer</p>
                </div>
                <p className="text-[10px] text-brand-ink/60 italic leading-relaxed">
                    While we use smart filters to curate your view, our kitchen handles various ingredients. Cross-contamination risk exists. Please inform our alchemists of any severe allergies.
                </p>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-3">
             <AnimatePresence mode="popLayout">
                {filteredItems.length > 0 ? (
                    <motion.div 
                        layout
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {filteredItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-brand-ink/5 group hover:border-brand-sepia/20 transition-all"
                          >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-grow pr-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-clay mb-1 block">{item.category}</span>
                                        <h3 className="text-xl font-serif italic text-brand-sepia">{item.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-brand-sepia whitespace-nowrap">₹{item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-brand-ink/60 italic mb-8 line-clamp-2">{item.description}</p>
                                
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {item.isVeg && <div className="w-2.5 h-2.5 rounded-full bg-green-500" title="Vegetarian" />}
                                        {!item.hasGluten && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" title="Gluten Free" />}
                                        {!item.hasDairy && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" title="Dairy Free" />}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onAddToCart(item)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-sepia text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-sepia/10 hover:bg-brand-ink transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add to Order
                                    </motion.button>
                                </div>
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[500px] flex flex-col items-center justify-center text-center px-6"
                    >
                        <div className="w-24 h-24 rounded-full bg-brand-sepia/5 flex items-center justify-center mb-8">
                            <X className="w-10 h-10 text-brand-sepia/20" />
                        </div>
                        <h3 className="text-3xl font-serif italic text-brand-sepia mb-4">No Stories Found</h3>
                        <p className="text-brand-ink/40 max-w-sm italic">
                            The combination of filters is a bit too restrictive. Try broadening your horizon or resetting the curation.
                        </p>
                    </motion.div>
                )}
             </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
