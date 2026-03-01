import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Palette, Music, BookOpen, Sparkles, HeartHandshake } from "lucide-react";
import { Breathe } from "./activities/Breathe";
import { ColorStudio } from "./activities/ColorStudio";
import { SoundGarden } from "./activities/SoundGarden";
import { MyJournal } from "./activities/MyJournal";
import { StarGame } from "./activities/StarGame";

const activities = [
    { id: "breathe", icon: <Wind size={24} />, label: "Breathe", desc: "Calm your storm", color: "from-sky-400 to-cyan-300", glow: "rgba(56,189,248,0.2)", emoji: "🌬️" },
    { id: "color", icon: <Palette size={24} />, label: "Color Studio", desc: "Paint your feelings", color: "from-violet-400 to-pink-400", glow: "rgba(167,139,250,0.2)", emoji: "🎨" },
    { id: "sound", icon: <Music size={24} />, label: "Sound Garden", desc: "Healing melodies", color: "from-emerald-400 to-teal-300", glow: "rgba(52,211,153,0.2)", emoji: "🎵" },
    { id: "journal", icon: <BookOpen size={24} />, label: "My Journal", desc: "Write it out", color: "from-amber-400 to-orange-300", glow: "rgba(251,191,36,0.2)", emoji: "📓" },
    { id: "star", icon: <Sparkles size={24} />, label: "Star Game", desc: "Play & relax", color: "from-rose-400 to-pink-300", glow: "rgba(251,113,133,0.2)", emoji: "⭐" },
    { id: "bloom", icon: <HeartHandshake size={24} />, label: "Talk to Bloom", desc: "Chat with your friend", color: "from-indigo-400 to-violet-400", glow: "rgba(99,102,241,0.2)", emoji: "💜" },
];

interface ActivityGladeProps {
    onOpenChat?: () => void;
}

export const ActivityGlade: React.FC<ActivityGladeProps> = ({ onOpenChat }) => {
    const [activeActivity, setActiveActivity] = useState<string | null>(null);

    const handleAction = (id: string) => {
        if (id === "bloom") {
            onOpenChat?.();
        } else {
            setActiveActivity(id);
        }
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {activities.map((act, i) => (
                    <motion.button
                        key={act.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, type: "spring", damping: 18 }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAction(act.id)}
                        className="group relative rounded-2xl p-5 text-left overflow-hidden transition-all duration-300"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        {/* Hover glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ boxShadow: `inset 0 0 30px ${act.glow}` }} />
                        {/* Top gradient line */}
                        <div className={`h-0.5 w-8 rounded-full mb-4 bg-gradient-to-r ${act.color} group-hover:w-full transition-all duration-500`} />

                        {/* Emoji badge */}
                        <div className="text-3xl mb-3 block">{act.emoji}</div>

                        <h4 className="font-display font-black text-white text-base mb-0.5">{act.label}</h4>
                        <p className="text-white/35 text-xs">{act.desc}</p>

                        {/* Arrow */}
                        <div className={`absolute bottom-4 right-4 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r ${act.color} bg-clip-text text-transparent font-bold`}>
                            Try →
                        </div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {activeActivity === "breathe" && (
                    <Breathe key="breathe" onClose={() => setActiveActivity(null)} />
                )}
                {activeActivity === "color" && (
                    <ColorStudio key="color" onClose={() => setActiveActivity(null)} />
                )}
                {activeActivity === "sound" && (
                    <SoundGarden key="sound" onClose={() => setActiveActivity(null)} />
                )}
                {activeActivity === "journal" && (
                    <MyJournal key="journal" onClose={() => setActiveActivity(null)} />
                )}
                {activeActivity === "star" && (
                    <StarGame key="star" onClose={() => setActiveActivity(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};
