import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { MenuItem } from "../types";
import { useNavigate } from "react-router-dom";

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-paper z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand-sepia" />
                <h2 className="text-2xl font-serif italic text-brand-sepia">Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-brand-ink/5 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <Book className="w-16 h-16 mb-4" />
                  <p className="font-serif italic text-xl">The pages of your order are empty...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-serif font-bold text-brand-sepia">{item.name}</h3>
                        <p className="text-sm text-brand-ink/50 mb-2">₹{item.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-white rounded-full border border-brand-ink/10 p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-brand-paper rounded-full transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-brand-paper rounded-full transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-brand-ink/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right font-bold text-brand-sepia">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-white border-t border-brand-ink/10 space-y-6">
              <div className="flex items-center justify-between text-xl font-serif">
                <span>Total Story</span>
                <span className="font-bold text-brand-sepia">₹{total.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-5 bg-brand-sepia text-white rounded-2xl font-bold shadow-xl shadow-brand-sepia/20 hover:bg-brand-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
              >
                Complete Order
              </button>
              <p className="text-[10px] text-center text-brand-ink/40 uppercase tracking-widest">
                Prices include storytelling tax and love.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Book(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
