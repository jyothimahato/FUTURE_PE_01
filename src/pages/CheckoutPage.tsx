import { motion, AnimatePresence } from "motion/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, MapPin, User, Phone, Mail, QrCode, ShoppingBag, CheckCircle2, ArrowRight, Coffee } from "lucide-react";
import BackButton from "../components/BackButton";
import { MenuItem } from "../types";

interface CartItem extends MenuItem {
  quantity: number;
}

interface CheckoutPageProps {
  cart: CartItem[];
  clearCart: () => void;
}

export default function CheckoutPage({ cart, clearCart }: CheckoutPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const subscriptionData = location.state as { subscription: string; price: string } | null;
  
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });
  const [orderRef] = useState(() => "SC-" + Math.random().toString(36).substring(7).toUpperCase());

  const subtotal = subscriptionData 
    ? parseFloat(subscriptionData.price.replace(/[^\d.]/g, '')) 
    : cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subscriptionData ? 0 : 40;
  const total = subtotal + delivery;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteOrder = () => {
    setStep(3);
    clearCart();
  };

  if (cart.length === 0 && !subscriptionData && step !== 3) {
    return (
      <div className="pt-40 pb-24 px-6 bg-brand-cream min-h-screen text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-brand-ink/20" />
          <h2 className="text-3xl font-serif italic mb-4">Your order is empty</h2>
          <p className="text-brand-ink/60 mb-8">It seems you haven't added any stories to your plate yet.</p>
          <button 
            onClick={() => navigate("/menu")}
            className="px-8 py-4 bg-brand-sepia text-white rounded-full font-bold uppercase tracking-widest text-sm"
          >
            Browse the Anthology
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 bg-brand-paper min-h-screen">
      <BackButton />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif italic text-brand-sepia">Finalizing Your Story</h1>
          <p className="text-brand-ink/40 mt-2 italic">Nearly at the end of this chapter...</p>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-3 gap-12"
            >
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-8">
                <form onSubmit={handleNextStep} className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-brand-ink/5">
                  <div className="flex items-center gap-4 mb-10 pb-4 border-b border-brand-ink/5">
                    <User className="w-6 h-6 text-brand-sepia" />
                    <h2 className="text-2xl font-serif italic">Collector Details</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Full Name</label>
                      <input 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Email Address</label>
                      <input 
                        required 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Phone Number</label>
                      <input 
                        required 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-10 pb-4 border-b border-brand-ink/5">
                    <MapPin className="w-6 h-6 text-brand-sepia" />
                    <h2 className="text-2xl font-serif italic">Delivery Sanctuary</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Full Address</label>
                      <textarea 
                        required 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20 resize-none" 
                        placeholder="Apartment, Street, Landmark" 
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">City</label>
                        <input 
                          required 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                          placeholder="Hyderabad" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Pincode</label>
                        <input 
                          required 
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                          placeholder="500032" 
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-12 py-5 bg-brand-sepia text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-brand-cream p-8 rounded-[40px] shadow-sm sticky top-32">
                  <h3 className="text-2xl font-serif italic mb-8 pb-4 border-b border-brand-ink/10 text-brand-sepia text-center">Summary</h3>
                  <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                    {subscriptionData ? (
                      <div className="flex justify-between items-start p-4 bg-brand-sepia/5 rounded-2xl border border-brand-sepia/10">
                        <div className="flex-grow">
                          <p className="font-bold text-sm text-brand-sepia">{subscriptionData.subscription}</p>
                          <p className="text-[10px] text-brand-ink/40 uppercase tracking-widest leading-relaxed">Monthly Recurring Narrative</p>
                        </div>
                        <div className="text-brand-sepia">
                          <Coffee className="w-5 h-5 mb-1" />
                        </div>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-grow">
                            <p className="font-bold text-sm text-brand-sepia">{item.name}</p>
                            <p className="text-[10px] text-brand-ink/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-brand-ink/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-ink/40">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-ink/40">Logistics</span>
                      <span>₹{delivery.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif italic pt-3 border-t border-brand-ink/5 text-brand-sepia">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-brand-ink/5">
                <div className="flex items-center gap-4 mb-10 pb-4 border-b border-brand-ink/5">
                  <CreditCard className="w-6 h-6 text-brand-sepia" />
                  <h2 className="text-2xl font-serif italic">Secure Payment</h2>
                </div>

                <div className="space-y-8">
                  <div className="p-6 bg-brand-cream rounded-3xl border-2 border-brand-sepia/10 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sepia/60">Amount to Pay</p>
                      <p className="text-3xl font-serif italic text-brand-sepia">₹{total.toFixed(2)}</p>
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} 
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 bg-brand-sepia/5 rounded-2xl text-brand-sepia"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 px-2">Payment Instruction</p>
                    <div className="bg-brand-paper p-6 rounded-3xl border border-brand-ink/5">
                      <p className="text-brand-ink/60 italic text-sm leading-relaxed">
                        For this experience, we've integrated a "Story-First" payment simulation. Simply authorize the transaction below to complete your narrative.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleCompleteOrder}
                      className="w-full py-5 bg-brand-sepia text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors"
                    >
                      Authorize Payment
                    </button>
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full py-4 text-brand-ink/40 font-bold uppercase tracking-widest text-[10px] hover:text-brand-sepia transition-colors"
                    >
                      Back to Sanctuary Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-4 text-brand-sepia">Narrative Captured</h2>
              <p className="text-brand-ink/60 mb-12 italic">Your order has been recorded into our archives. See you at the table.</p>

              {/* Order Ticket */}
              <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border-4 border-double border-brand-sepia/20 relative mb-12 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-sepia via-brand-clay to-brand-sepia opacity-20" />
                
                <div className="flex flex-col items-center">
                  <div className="p-6 bg-brand-paper rounded-[40px] shadow-sm mb-6 border border-brand-ink/5">
                    <QrCode className="w-40 h-40 text-brand-sepia" />
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-ink/30 px-2">Order Archive Reference</p>
                    <p className="text-3xl font-serif tracking-widest text-brand-sepia">{orderRef}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 w-full pt-8 border-t border-brand-ink/5 text-left">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-1">Customer</p>
                      <p className="font-bold text-sm text-brand-sepia truncate">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-1">Amount</p>
                      <p className="font-bold text-sm text-brand-sepia">₹{total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.print()}
                  className="px-8 py-4 bg-brand-sepia text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  Download Receipt
                </button>
                <button 
                  onClick={() => navigate("/")}
                  className="px-8 py-4 border border-brand-sepia/20 rounded-full font-bold uppercase tracking-widest text-xs text-brand-sepia hover:bg-brand-sepia/5 transition-colors"
                >
                  Return Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
