import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="fixed top-24 left-6 z-40 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-brand-ink/5 flex items-center gap-2 text-brand-sepia font-bold text-sm"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden md:inline">Return to Story</span>
    </motion.button>
  );
}
