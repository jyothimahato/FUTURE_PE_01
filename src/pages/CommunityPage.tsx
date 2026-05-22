import { motion, AnimatePresence } from "motion/react";
import { Pin, Calendar, Users, Star, MessageSquarePlus, Share2, Heart, MapPin, User } from "lucide-react";
import { useState, FormEvent } from "react";
import BackButton from "../components/BackButton";

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      category: "Events",
      title: "Chapter & Verse: Poetry Slam",
      author: "Oliver Reed",
      date: "May 20, 2024",
      desc: "Join us for an evening of spoken word and acoustic melodies. All levels of poets welcome.",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      category: "Local",
      title: "Lost Fountain Pen",
      author: "Sarah J.",
      date: "May 12, 2024",
      desc: "Left a silver Pelikan pen near the window seat yesterday. It has high sentimental value. Please contact if found!",
      likes: 8,
      comments: 3
    },
    {
      id: 3,
      category: "Workshops",
      title: "Sourdough Secrets",
      author: "Chef Marcus",
      date: "June 05, 2024",
      desc: "A hands-on workshop on maintaining your starter and achieving the perfect crumb.",
      likes: 42,
      comments: 12
    },
    {
      id: 4,
      category: "Events",
      title: "Quiet Reading Hour",
      author: "The Story Cafe",
      date: "Every Monday",
      desc: "No devices, no talking. Just one hour of pure, unadulterated reading bliss with complimentary tea.",
      likes: 56,
      comments: 8
    }
  ]);

  const [isPosting, setIsPosting] = useState(false);
  const [noteForm, setNoteForm] = useState({ title: "", desc: "", category: "Local" });

  const handleJoinNarrative = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const handlePostNote = () => {
    setIsPosting(true);
  };

  const handleSubmitNote = (e: FormEvent) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      category: noteForm.category,
      title: noteForm.title,
      author: "New Storyteller",
      date: "Just Now",
      desc: noteForm.desc,
      likes: 0,
      comments: 0
    };
    setPosts([newPostObj, ...posts]);
    setIsPosting(false);
    setNoteForm({ title: "", desc: "", category: "Local" });
  };

  const handleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts([...likedPosts, id]);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const handleShare = (title: string) => {
    alert(`Link to "${title}" has been copied to your clipboard. Share the story!`);
  };

  const handleReadMore = (title: string) => {
    alert(`Opening full scroll for "${title}"...`);
  };

  const handleNomination = () => {
    alert("Thank you for recognizing a fellow storyteller! Your nomination for 'Customer of the Month' has been submitted for review.");
  };

  const filteredPosts = activeFilter === "all" ? posts : posts.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 bg-brand-paper min-h-screen">
      <BackButton />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sepia/5 text-brand-sepia text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Users className="w-3 h-3" /> Our Neighborhood
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-brand-sepia mb-6">The Community Board</h1>
          <p className="text-brand-ink/60 text-lg italic leading-relaxed">
            Where local tales intertwine. From lost ink to found friends, this is the heartbeat of our sanctuary's neighborhood.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Board */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-ink/5">
              <div className="flex gap-2">
                {["All", "Events", "Local", "Workshops"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter.toLowerCase())}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeFilter === filter.toLowerCase()
                      ? "bg-brand-sepia text-white shadow-lg shadow-brand-sepia/20"
                      : "bg-white text-brand-ink/40 hover:bg-brand-cream"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button 
                onClick={handlePostNote}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-clay hover:opacity-80 transition-opacity"
              >
                <MessageSquarePlus className="w-4 h-4" /> Post a Note
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-[40px] shadow-sm border border-brand-ink/5 hover:border-brand-sepia/20 transition-all relative group"
                >
                  <Pin className="absolute top-4 right-4 w-5 h-5 text-brand-sepia/20 group-hover:text-brand-sepia group-hover:rotate-12 transition-all" />
                  
                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-clay mb-2 inline-block">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-serif italic text-brand-sepia mb-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs text-brand-ink/40">by {post.author} • {post.date}</p>
                  </div>

                  <p className="text-sm text-brand-ink/60 mb-8 line-clamp-3">
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-brand-ink/5">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 text-[10px] font-bold transition-colors ${
                          likedPosts.includes(post.id) ? "text-red-500" : "text-brand-ink/40 hover:text-brand-sepia"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} /> {post.likes}
                      </button>
                      <button 
                        onClick={() => handleShare(post.title)}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-brand-ink/40 hover:text-brand-sepia transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleReadMore(post.title)}
                      className="text-[10px] font-bold uppercase tracking-widest text-brand-clay underline"
                    >
                      Read More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar / Spotlight */}
          <div className="lg:col-span-1 space-y-8">
            {/* Customer of the Month */}
            <div className="bg-brand-sepia text-white rounded-[50px] p-10 shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Star className="w-6 h-6 text-brand-clay" fill="currentColor" />
                  <h2 className="text-2xl font-serif italic">Spotlight</h2>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-[40px] p-6 mb-8 text-center border border-white/10">
                  <div className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-6 overflow-hidden shadow-2xl bg-white/20 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif italic mb-1">Arthur Penhaligon</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-4">Customer of the Month</p>
                  <p className="text-sm italic opacity-80 leading-relaxed mb-6">
                    "Often found in 'The Alchemist's Bar' corner with a cold brew and a well-loved copy of Dickens. Arthur has been part of our story for three years."
                  </p>
                  <div className="inline-flex gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest">Local Author</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest">Muffin Aficionado</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs opacity-60 italic mb-4">Nominate your favorite regular</p>
                  <button 
                    onClick={handleNomination}
                    className="w-full py-4 bg-brand-clay text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-sepia transition-all"
                  >
                    Submit Nomination
                  </button>
                </div>
              </div>
              <Users className="absolute bottom-[-30px] right-[-30px] w-64 h-64 text-white/5 -rotate-12" />
            </div>

            {/* Newsletter / Join */}
            <div className="bg-brand-paper p-8 rounded-[40px] border border-brand-sepia/10">
              <h3 className="text-xl font-serif italic text-brand-sepia mb-4">In the Loop</h3>
              <p className="text-sm text-brand-ink/60 mb-6 italic">Subscribe to our weekly "Dispatch from the Sanctuary" for neighborhood news and secret menu items.</p>
              
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-brand-sepia text-white rounded-2xl text-center"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest">Welcome to the Narrative!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleJoinNarrative} className="space-y-3">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your story email..." 
                      className="w-full bg-white px-6 py-4 rounded-2xl focus:outline-none border border-brand-ink/5 focus:ring-2 focus:ring-brand-sepia/20"
                    />
                    <button 
                      type="submit"
                      className="w-full py-4 bg-brand-sepia text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-ink transition-colors"
                    >
                      Join the Narrative
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Post a Note Modal */}
      <AnimatePresence>
        {isPosting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm" onClick={() => setIsPosting(false)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-paper w-full max-w-xl rounded-[50px] p-10 shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-serif italic text-brand-sepia">Pin Your Story</h2>
                  <button onClick={() => setIsPosting(false)} className="text-brand-ink/40 hover:text-brand-sepia transition-colors">
                    <MessageSquarePlus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <form onSubmit={handleSubmitNote} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-2 px-1">Note Category</label>
                    <div className="flex gap-2">
                      {["Local", "Events", "Workshops"].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNoteForm({ ...noteForm, category: cat })}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                            noteForm.category === cat 
                            ? "bg-brand-sepia text-white shadow-lg" 
                            : "bg-white text-brand-ink/40 border border-brand-ink/5"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-2 px-1">Tale Title</label>
                    <input 
                      type="text"
                      required
                      value={noteForm.title}
                      onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                      placeholder="Give your story a name..."
                      className="w-full bg-white px-6 py-4 rounded-2xl focus:outline-none border border-brand-ink/5 focus:ring-2 focus:ring-brand-sepia/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-2 px-1">The Narrative</label>
                    <textarea 
                      required
                      rows={4}
                      value={noteForm.desc}
                      onChange={(e) => setNoteForm({ ...noteForm, desc: e.target.value })}
                      placeholder="What would you like to share with the neighborhood? Lost items, upcoming meets, or just a friendly hallo..."
                      className="w-full bg-white px-6 py-4 rounded-2xl focus:outline-none border border-brand-ink/5 focus:ring-2 focus:ring-brand-sepia/20 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-brand-sepia text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-sepia/40 hover:bg-brand-ink transition-all mt-4"
                  >
                    Pin to the Board
                  </button>
                </form>
              </div>
              <Pin className="absolute bottom-[-40px] right-[-40px] w-64 h-64 text-brand-sepia opacity-[0.03] rotate-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
