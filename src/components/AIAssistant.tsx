import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Greetings, storyteller. I am your guide to The Story Cafe's menu. Looking for a recommendation or have questions about our prices?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    try {
      const menuContext = JSON.stringify(MENU_ITEMS.map(item => ({
        name: item.name,
        price: `₹${item.price.toFixed(2)}`,
        description: item.description,
        category: item.category
      })));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: `You are the "Storyteller Assistant" for "The Story Cafe". 
              Your personality is deeply empathetic, warm, poetic, and observant, much like a seasoned barista who has heard a thousand stories.
              
              Here is the menu context: ${menuContext}.
              
              Core Directives:
              1. SUGGEST BY MOOD: If a user mentions a mood (tired, happy, melancholic, celebrating) or a requirement (quick bite, healthy, indulgent), suggest specific items with a poetic explanation of why they fit.
              2. HUMAN-LIKE REFLECTION: Don't just list prices. Reflect on the user's situation. If they are stressed, offer comfort. If they are joyful, share in the bloom.
              3. EXACT PRICING: When recommending, always mention the price in ₹.
              4. LITERARY FLAIR: Use subtle literary metaphors (chapters, ink, prose, verses) but keep it natural, not forced.
              
              If they ask for something not on the menu, offer the closest "thematic" equivalent we have.
              User asked: ${userMsg}` }
            ]
          }
        ]
      });

      const aiText = response.text || "Forgive me, my ink has run dry for a moment. Pray, ask again?";
      setMessages(prev => [...prev, { role: "model", text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", text: "I've lost the thread of our conversation. Could you speak again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 md:w-16 md:h-16 bg-brand-sepia text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[100] w-[92vw] max-w-[400px] h-[500px] md:h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-brand-ink/10"
          >
            <div className="p-4 bg-brand-sepia text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold">Storyteller Assistant</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">Always Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 bg-brand-cream/30 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-brand-sepia text-white rounded-tr-none" 
                        : "bg-white text-brand-ink shadow-sm rounded-tl-none border border-brand-ink/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-brand-ink/5">
                    <span className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-brand-sepia rounded-full"
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-brand-ink/10 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about our special roasts..."
                className="flex-grow bg-brand-paper px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sepia/20"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-brand-sepia text-white rounded-xl hover:bg-brand-ink transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
