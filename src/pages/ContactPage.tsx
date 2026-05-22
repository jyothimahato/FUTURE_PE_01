import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import BackButton from "../components/BackButton";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send the form data to a server here
  };

  return (
    <div className="pt-40 pb-24 px-6 bg-brand-sepia text-brand-cream min-h-screen">
      <BackButton />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-5xl font-serif italic mb-8">Write to Us</h2>
          <p className="text-xl text-brand-cream/70 mb-12 leading-relaxed">
            Whether you have a question about our secret roasts or want to host a book club event, we'd love to hear from you.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <a 
                href="https://maps.google.com/?q=Gachibowli,Hyderabad,Telangana,India" 
                target="_blank" 
                rel="noreferrer"
                className="group"
              >
                <h4 className="font-bold group-hover:text-brand-clay transition-colors">Visit the Sanctuary</h4>
                <p className="opacity-60">Plot 123, Story Lane, Gachibowli, Hyderabad, 500032</p>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <a href="mailto:hello@thestorycafe.com" className="group">
                <h4 className="font-bold group-hover:text-brand-clay transition-colors">Send a Letter</h4>
                <p className="opacity-60">hello@thestorycafe.com</p>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <a href="tel:+914012345678" className="group">
                <h4 className="font-bold group-hover:text-brand-clay transition-colors">Ring the Bell</h4>
                <p className="opacity-60">+91 40 1234 5678</p>
              </a>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            {[
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Facebook, href: "https://facebook.com" }
            ].map(({ Icon, href }, i) => (
              <a 
                key={i} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-brand-clay hover:text-brand-paper transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-cream/40 mb-6">Order Delivery</h4>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://www.swiggy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center py-4 bg-orange-600/10 border border-orange-500/20 rounded-2xl hover:bg-orange-600 hover:text-white transition-all font-bold text-sm"
              >
                Order on Swiggy
              </a>
              <a 
                href="https://www.zomato.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center py-4 bg-red-600/10 border border-red-500/20 rounded-2xl hover:bg-red-600 hover:text-white transition-all font-bold text-sm"
              >
                Order on Zomato
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[40px] p-8 lg:p-12 text-brand-ink shadow-2xl relative"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-brand-clay/10 text-brand-clay rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif italic mb-4 text-brand-sepia">Message Dispatched</h3>
                <p className="text-brand-ink/60 mb-8 max-w-xs mx-auto">
                  Your note has set sail. We'll read through your verses and respond shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-brand-sepia text-white rounded-full font-bold text-sm tracking-widest uppercase"
                >
                  Write Another
                </button>
              </motion.div>
            ) : (
              <form key="form" className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Full Name</label>
                    <input required type="text" className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Email Address</label>
                    <input required type="email" className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Subject</label>
                  <input required type="text" className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" placeholder="Book Club Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Your Message</label>
                  <textarea required rows={4} className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20 resize-none" placeholder="Tell us your story..." />
                </div>
                <button type="submit" className="w-full py-5 bg-brand-sepia text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors">
                  Send Dispatch
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
