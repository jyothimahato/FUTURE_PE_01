import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Menu as MenuIcon, Book, X, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "The Menu", path: "/menu" },
    { name: "Our Story", path: "/our-story" },
    { name: "Community", path: "/community" },
    { name: "Book a Table", path: "/book-a-table" },
    { name: "Contact", path: "/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []); // Note: in a real app would use location, but here we can just close it if path changes

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Book className="w-8 h-8 text-brand-sepia" />
            <h1 className="text-2xl font-serif font-bold tracking-tight text-brand-sepia">
              The Story Cafe
            </h1>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? "text-brand-clay" : "text-brand-ink hover:text-brand-clay"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative p-2 text-brand-ink hover:text-brand-clay transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-brand-clay text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-paper"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
          
          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-brand-ink hover:text-brand-clay transition-colors hidden md:block"
            >
              <User className="w-6 h-6" />
            </motion.div>
          </Link>

          <button 
            className="md:hidden p-2 text-brand-ink"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-paper border-b border-brand-ink/5 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `text-lg font-serif italic transition-colors py-2 border-b border-brand-ink/5 ${
                      isActive ? "text-brand-clay" : "text-brand-ink hover:text-brand-clay"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <NavLink 
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `text-lg font-serif italic transition-colors py-2 border-b border-brand-ink/5 ${
                    isActive ? "text-brand-clay" : "text-brand-ink hover:text-brand-clay"
                  }`
                }
              >
                My Profile
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
