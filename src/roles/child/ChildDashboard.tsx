import React, { useState } from "react";
import { motion } from "framer-motion";
import { CompanionAvatar } from "../../components/ui/CompanionAvatar";
import { MoodMeadow } from "./MoodMeadow";
import { ActivityGlade } from "./ActivityGlade";
import { ConversationStream } from "./ConversationStream";
import { ProgressBloom } from "../../components/ui/ProgressBloom";
import { useMoodHistory } from "../../hooks/useMoodHistory";
import { MessageCircle, Flame, Sparkles, Star, ArrowLeft } from "lucide-react";

interface ChildDashboardProps {
    onBack?: () => void;
}

export const ChildDashboard: React.FC<ChildDashboardProps> = ({ onBack }) => {
    const [chatOpen, setChatOpen] = useState(false);
    const { weekStreak } = useMoodHistory();
    const progress = Math.min(weekStreak * 14.28, 100);

    return (
        <div className="min-h-screen relative overflow-x-hidden" style={{ background: "var(--color-bloom-bg)" }}>
            {/* === ANIMATED BACKGROUND === */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)" }} />
                <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, rgba(249,168,212,0.12) 0%, transparent 70%)", animationDelay: "2s" }} />
                <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, rgba(110,231,183,0.08) 0%, transparent 70%)", animationDelay: "4s" }} />
                {/* Stars */}
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 2 + 1,
                            height: Math.random() * 2 + 1,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.4 + 0.05,
                            animation: `pulse-glow ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* === NAVIGATION === */}
            {onBack && (
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="fixed top-8 left-8 z-[60] flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200 font-bold text-xs transition-all backdrop-blur-md"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Roles</span>
                </motion.button>
            )}

            {/* === HEADER === */}
            <header className="relative z-10 w-full max-w-5xl mx-auto pt-16 pb-6 px-6 flex flex-col items-center text-center">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                    <CompanionAvatar mood={3} size="lg" className="mb-8" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)" }}>
                        <Sparkles size={14} className="text-violet-300" />
                        <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">Your Safe Space</span>
                    </div>
                    <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-display font-black leading-none mb-4">
                        <span className="text-white">Hello, </span>
                        <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">Little Star</span>
                        <span className="text-3xl ml-3">🌟</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-lg mx-auto">
                        Welcome back to your magical garden. How is your heart feeling today?
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-4 mt-8">
                    {weekStreak > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.25)" }}>
                            <Flame size={16} className="text-amber-400" />
                            <span className="text-amber-300 text-sm font-bold">{weekStreak} day streak 🔥</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(110,231,183,0.12)", border: "1px solid rgba(110,231,183,0.2)" }}>
                        <Star size={16} className="text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-bold">Bloom {Math.round(progress)}% grown</span>
                    </div>
                </motion.div>
            </header>

            {/* === MOOD SECTION === */}
            <section className="relative z-10 w-full max-w-5xl mx-auto px-6 mb-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
                        <MoodMeadow />
                    </div>
                </motion.div>
            </section>

            {/* === PROGRESS BLOOM + STREAK === */}
            <section className="relative z-10 w-full max-w-5xl mx-auto px-6 mb-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-3xl p-8 flex items-center gap-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <ProgressBloom progress={progress} size="md" />
                    <div className="flex-1">
                        <h3 className="text-2xl font-display font-black text-white mb-2">Your Bloom is Growing 🌸</h3>
                        <p className="text-white/40 text-sm mb-5 leading-relaxed">Track mood daily to help your flower bloom! You're on a {weekStreak}-day journey.</p>
                        <div className="flex gap-2">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="flex-1 h-2 rounded-full transition-all duration-500" style={{ background: i < weekStreak ? "linear-gradient(to right, #A78BFA, #F9A8D4)" : "rgba(255,255,255,0.08)" }} />
                            ))}
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-white/20 uppercase tracking-widest">Mon</span>
                            <span className="text-[10px] text-white/20 uppercase tracking-widest">Sun</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* === ACTIVITIES === */}
            <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-32">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-display font-black text-white">Today's Activities</h2>
                            <p className="text-white/30 text-sm">Pick something that feels good ✨</p>
                        </div>
                    </div>
                    <ActivityGlade onOpenChat={() => setChatOpen(true)} />
                </motion.div>
            </section>

            {/* === CHAT BUTTON + OVERLAY === */}
            <ConversationStream isOpen={chatOpen} onClose={() => setChatOpen(false)} />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChatOpen((v) => !v)}
                className="fixed bottom-8 right-8 z-[110] w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl relative"
                style={{ background: "linear-gradient(135deg, #A78BFA, #F9A8D4)", boxShadow: "0 0 40px rgba(167,139,250,0.5)" }}
            >
                <MessageCircle size={24} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2" style={{ background: "#FCD34D", borderColor: "var(--color-bloom-bg)" }} />
            </motion.button>
        </div>
    );
};
