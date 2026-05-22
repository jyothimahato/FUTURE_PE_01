import { motion, AnimatePresence } from "motion/react";
import { User, Package, Calendar, Settings, LogOut, ChevronRight, Bookmark, Coffee, Mail, Phone, MapPin, X } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [activePass, setActivePass] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: "Jyothi Mahato",
    email: "jyothimahato16@gmail.com",
    joined: "January 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    phone: "+91 98765 43210",
    location: "Hyderabad, India"
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate("/");
  };


  const handleManageSub = () => {
    alert(`Opening management portal for ${activePass}. Here you can update your payment method or cancel your chapter.`);
  };

  const handleSubscribePass = (name: string, price: string) => {
    navigate("/checkout", { state: { subscription: name, price: price } });
  };

  const handleClaimReward = () => {
    setRewardClaimed(true);
    setTimeout(() => setRewardClaimed(false), 3000);
  };

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
  };

  const orders = [
    { id: "SC-4F5G6H", date: "May 10, 2024", items: "The Spiced Scholar (Coffee), Chapter 4: Sourdough Toast", total: "₹450.00", status: "Completed" },
    { id: "SC-9A8B7C", date: "May 08, 2024", items: "The Classic Novelist (Breakfast), Earl Grey Tea", total: "₹820.00", status: "In Transit" },
    { id: "SC-1Z2X3Y", date: "April 28, 2024", items: "Blueberry Plot Twist (Muffin), Pour-over Coffee", total: "₹380.00", status: "Completed" },
  ];


  return (
    <div className="pt-24 md:pt-40 pb-24 px-6 bg-brand-paper min-h-screen">
      <BackButton />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl relative group cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <div className="w-full h-full bg-brand-cream flex items-center justify-center text-brand-sepia">
              <User className="w-12 h-12" />
            </div>
            <div className="absolute inset-0 bg-brand-sepia/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Settings className="w-6 h-6" />
            </div>
          </motion.div>
          
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-serif italic text-brand-sepia mb-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsEditing(true)}>{profile.name}</h1>
            <p className="text-brand-ink/40 italic flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4" /> Storyteller since {profile.joined}
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 border border-brand-sepia/20 rounded-full text-xs font-bold uppercase tracking-widest text-brand-sepia hover:bg-brand-sepia/5 transition-colors"
            >
              Edit Persona
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-brand-clay/10 text-brand-clay rounded-full hover:bg-brand-clay hover:text-white transition-all shadow-lg shadow-brand-clay/10"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-brand-ink/5 space-y-2">
              {[
                { id: "orders", label: "My Stories", icon: Bookmark, desc: "Order History" },
                { id: "subs", label: "Chapters", icon: Coffee, desc: "Subscriptions" },
                { id: "settings", label: "Identity", icon: User, desc: "Account Info" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${
                    activeTab === tab.id 
                    ? "bg-brand-sepia text-white shadow-lg shadow-brand-sepia/20" 
                    : "hover:bg-brand-cream text-brand-ink"
                  }`}
                >
                  <tab.icon className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold leading-none mb-1">{tab.label}</p>
                    <p className={`text-[10px] uppercase tracking-widest ${activeTab === tab.id ? "text-white/60" : "text-brand-ink/40"}`}>
                      {tab.desc}
                    </p>
                  </div>
                  {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4 opacity-60" />}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-brand-ink/5 min-h-[500px]">
              {activeTab === "orders" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-serif italic text-brand-sepia">My Stories</h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">{orders.length} Narratives Found</span>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order, i) => (
                      <div key={i} className="group p-6 rounded-3xl border border-brand-ink/5 hover:border-brand-sepia/20 hover:bg-brand-cream/50 transition-all">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 items-start mb-4">
                          <div>
                            <span className="text-[10px] font-bold text-brand-clay uppercase tracking-[0.2em]">{order.id}</span>
                            <p className="text-sm text-brand-ink/40">{order.date}</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            order.status === "Completed" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                          }`}>
                            {order.status}
                          </div>
                        </div>
                        <p className="text-brand-sepia font-serif italic text-lg mb-4">{order.items}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-brand-ink/5">
                          <p className="text-xl font-bold text-brand-sepia">{order.total}</p>
                          <button className="text-xs font-bold text-brand-clay underline uppercase tracking-widest">Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "subs" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                  <AnimatePresence>
                    {activePass && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-brand-cream/30 border border-brand-sepia/20 rounded-[40px] p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-brand-sepia rounded-2xl flex items-center justify-center text-white">
                              <Coffee className="w-8 h-8" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-1">Active Chapter</p>
                              <h3 className="text-2xl font-serif italic text-brand-sepia">{activePass}</h3>
                            </div>
                          </div>
                          <button 
                            onClick={handleManageSub}
                            className="px-10 py-4 bg-brand-sepia text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-ink transition-colors shadow-lg"
                          >
                            Manage Subscription
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <h2 className="text-3xl font-serif italic text-brand-sepia mb-8">Discover Coffee Passes</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {[
                        { 
                          name: "The Daily Brew Pass", 
                          price: "₹1,499/mo", 
                          perks: ["One drink every day", "15% off on all pastries", "Free Wi-Fi access", "Reserved seating"],
                          color: "bg-brand-sepia",
                          highlight: "Most Popular"
                        },
                        { 
                          name: "Infinite Refill Pass", 
                          price: "₹2,999/mo", 
                          perks: ["Unlimited black coffee", "Unlimited house tea", "20% off on all items", "Invitations to secret readings"],
                          color: "bg-brand-clay",
                          highlight: "The Alchemist's Choice"
                        }
                      ].map((pass, i) => (
                        <div key={i} className={`${pass.color} text-white rounded-[40px] p-10 relative overflow-hidden group shadow-xl`}>
                          <div className="relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full mb-6 inline-block">
                              {pass.highlight}
                            </span>
                            <h4 className="text-2xl font-serif italic mb-2">{pass.name}</h4>
                            <p className="text-3xl font-bold mb-8">{pass.price}</p>
                            
                            <ul className="space-y-4 mb-10">
                              {pass.perks.map((perk, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm opacity-90">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-paper" />
                                  {perk}
                                </li>
                              ))}
                            </ul>
                            
                            <button 
                                onClick={() => handleSubscribePass(pass.name, pass.price)}
                                disabled={activePass === pass.name}
                                className={`w-full py-4 ${activePass === pass.name ? "bg-white text-brand-sepia opacity-100 cursor-default" : "bg-white text-brand-ink hover:bg-brand-paper shadow-lg"} rounded-2xl font-bold text-xs uppercase tracking-widest transition-all`}
                            >
                              {activePass === pass.name ? "✓ Active Member" : "Subscribe to Chapter"}
                            </button>
                          </div>
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                   <h2 className="text-3xl font-serif italic text-brand-sepia">Personal Narrative</h2>

                   <div className="grid md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-sepia group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Email Address</p>
                            <p className="text-sm font-bold text-brand-sepia">{profile.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-sepia group-hover:scale-110 transition-transform">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Contact Number</p>
                            <p className="text-sm font-bold text-brand-sepia">{profile.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-sepia group-hover:scale-110 transition-transform">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Current Sanctuary</p>
                            <p className="text-sm font-bold text-brand-sepia">{profile.location}</p>
                          </div>
                        </div>
                     </div>

                     <div className="bg-brand-cream p-8 rounded-[40px] border border-brand-sepia/10 self-start">
                        <div className="flex items-center gap-3 mb-4">
                          <Package className="w-5 h-5 text-brand-clay" />
                          <h4 className="font-serif italic text-lg">Quick Stats</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between pb-3 border-b border-brand-sepia/10">
                            <span className="text-xs text-brand-ink/40 tracking-widest uppercase">Total Orders</span>
                            <span className="font-bold text-brand-sepia">24</span>
                          </div>
                          <div className="flex justify-between pb-3 border-b border-brand-sepia/10">
                            <span className="text-xs text-brand-ink/40 tracking-widest uppercase">Loyalty Verse</span>
                            <span className="font-bold text-brand-sepia">1,250 pts</span>
                          </div>
                        </div>
                        <button 
                          onClick={handleClaimReward}
                          disabled={rewardClaimed}
                          className={`w-full mt-6 py-4 ${rewardClaimed ? 'bg-green-600' : 'bg-brand-clay'} text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-sepia transition-all scale-100 hover:scale-105 active:scale-95`}
                        >
                          {rewardClaimed ? 'Successfully Claimed!' : 'Claim Rewards'}
                        </button>
                     </div>
                   </div>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Edit Persona Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-brand-sepia/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-8 md:p-12 overflow-hidden"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-8 right-8 p-3 hover:bg-brand-cream rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-brand-ink" />
              </button>

              <h2 className="text-3xl font-serif italic text-brand-sepia mb-8">Refine Your Persona</h2>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Email Address</label>
                    <input 
                      type="email" 
                      value={editForm.email}
                      onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Phone</label>
                    <input 
                      type="tel" 
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Location</label>
                  <input 
                    type="text" 
                    value={editForm.location}
                    onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full bg-brand-paper px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-sepia/20" 
                  />
                </div>

                <div className="pt-4 flex flex-col md:flex-row gap-4">
                  <button 
                    type="submit"
                    className="flex-grow py-5 bg-brand-sepia text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-ink transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-5 border border-brand-sepia/20 text-brand-sepia rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-sepia/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
