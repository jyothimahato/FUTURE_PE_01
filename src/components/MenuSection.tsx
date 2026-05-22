import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Star, 
  Croissant, 
  Utensils, 
  Pizza, 
  Soup, 
  LayoutGrid, 
  Zap, 
  ChefHat, 
  Sandwich,
  Layers,
  Sparkles
} from "lucide-react";
import { MenuItem, MENU_ITEMS } from "../types";
import MoodPairing from "./MoodPairing";

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<MenuItem['category'] | 'All'>("Chef's Special");
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const categories: { name: MenuItem['category'] | 'All'; icon: any }[] = [
    { name: 'All', icon: LayoutGrid },
    { name: "Chef's Special", icon: Star },
    { name: "Croissants", icon: Croissant },
    { name: "Burgers", icon: Utensils },
    { name: "Appetizers", icon: ChefHat },
    { name: "Quick Bites", icon: Zap },
    { name: "Wraps", icon: Layers },
    { name: "Rice Bowls", icon: LayoutGrid },
    { name: "Chinese", icon: Soup },
    { name: "Pizzas", icon: Pizza },
    { name: "Pasta", icon: Utensils },
    { name: "Sandwiches", icon: Sandwich },
  ];

  let filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  if (dietaryFilter === 'veg') {
    filteredItems = filteredItems.filter(item => item.isVeg);
  } else if (dietaryFilter === 'non-veg') {
    filteredItems = filteredItems.filter(item => !item.isVeg);
  }

  return (
    <section id="the-menu" className="py-24 px-6 bg-brand-cream min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <div className="flex flex-col items-center gap-6 mb-8">
            <button 
              onClick={() => navigate("/smart-menu")}
              className="flex items-center gap-3 px-8 py-4 bg-brand-sepia text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-sepia/40 hover:bg-brand-ink transition-all group scale-110 mb-4"
            >
              <Sparkles className="w-4 h-4 text-brand-clay group-hover:rotate-12 transition-transform" />
              Open Smart Filter Anthology
            </button>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4 italic">The Anthology</h2>
              <p className="text-sm md:text-base text-brand-ink/60 italic px-4">Choose your next chapter from our curated selection.</p>
            </div>
          </div>
        </header>

        {/* Dietary Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Stories' },
            { id: 'veg', label: 'Vegetarian' },
            { id: 'non-veg', label: 'Non-Veg' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setDietaryFilter(filter.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                dietaryFilter === filter.id 
                  ? "bg-brand-ink text-white border-brand-ink" 
                  : "bg-white text-brand-ink/40 border-brand-ink/10 hover:border-brand-sepia/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 pb-4 overflow-x-auto scrollbar-hide">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                activeCategory === name 
                  ? "bg-brand-sepia text-white shadow-xl shadow-brand-sepia/20" 
                  : "bg-white/50 text-brand-sepia hover:bg-white border border-brand-sepia/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {name}
            </button>
          ))}
        </div>
        
        {/* Mood Based Recommendations */}
        <MoodPairing onAddToCart={onAddToCart} />

        {/* Menu List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-white p-6 rounded-3xl border border-brand-ink/5 hover:border-brand-sepia/20 transition-all flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 border-2 flex items-center justify-center p-0.5 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                      <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-brand-sepia">{item.name}</h3>
                  </div>
                  <p className="text-sm text-brand-ink/50 leading-relaxed italic">{item.description}</p>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-brand-ink/5">
                  <div className="text-xl font-serif font-bold text-brand-sepia">
                    ₹{item.price.toFixed(2)}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-paper text-brand-sepia font-bold rounded-2xl hover:bg-brand-sepia hover:text-white transition-all text-sm group/btn"
                  >
                    <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                    Order
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <div className="text-center py-20 opacity-30 italic font-serif">
              This chapter of the menu is currently empty...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

