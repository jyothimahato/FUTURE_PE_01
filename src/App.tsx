/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import AIAssistant from "./components/AIAssistant";
import ScrollToTop from "./components/ScrollToTop";
import { MenuItem } from "./types";

// Pages
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import OurStoryPage from "./pages/OurStoryPage";
import ContactPage from "./pages/ContactPage";
import BookATablePage from "./pages/BookATablePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import SmartFilterPage from "./pages/SmartFilterPage";

interface CartItem extends MenuItem {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const nextQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-a-table" element={<BookATablePage />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/smart-menu" element={<SmartFilterPage onAddToCart={addToCart} cartCount={cartCount} />} />
        </Routes>

        <footer className="py-12 px-6 border-t border-brand-ink/5 text-center">
          <p className="text-sm text-brand-ink/40">
            © 2026 The Story Cafe. All characters and recipes are fictional. Made with love for storytellers.
          </p>
        </footer>

        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />

        <AIAssistant />
      </div>
    </BrowserRouter>
  );
}

