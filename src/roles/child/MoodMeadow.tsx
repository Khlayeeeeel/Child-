import React, { useState } from "react";
import { motion } from "framer-motion";

const moods = [
    { value: 1, label: "Not Great", icon: "😢", color: "from-red-500 to-rose-400" },
    { value: 2, label: "Meh", icon: "😕", color: "from-orange-400 to-amber-300" },
    { value: 3, label: "Okay", icon: "🙂", color: "from-yellow-400 to-lime-300" },
    { value: 4, label: "Good", icon: "😊", color: "from-sky-400 to-blue-400" },
    { value: 5, label: "Amazing!", icon: "🌟", color: "from-violet-400 to-pink-400" },
];

export const MoodMeadow: React.FC = () => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-black text-white mb-1">How are you feeling?</h2>
                <p className="text-white/30 text-sm">Tap the orb that matches your heart right now</p>
            </div>

            {/* Mood Orbs - Horizontal layout */}
            <div className="flex justify-center gap-5 mb-8 flex-wrap">
                {moods.map((mood, index) => (
                    <motion.button
                        key={mood.value}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.08, type: "spring", damping: 15 }}
                        whileHover={{ scale: 1.12, y: -4 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setSelected(mood.value === selected ? null : mood.value)}
                        className="flex flex-col items-center gap-2.5 group"
                    >
                        <div className="relative">
                            {/* Glow ring when active */}
                            {selected === mood.value && (
                                <motion.div
                                    layoutId="mood-ring"
                                    className={`absolute -inset-3 rounded-full bg-gradient-to-r ${mood.color} opacity-30 blur-md`}
                                    initial={false}
                                    transition={{ type: "spring", damping: 20 }}
                                />
                            )}
                            {/* Orb */}
                            <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${mood.color} transition-all duration-300 ${selected === mood.value ? "shadow-lg scale-110 ring-2 ring-white/30" : "opacity-70 group-hover:opacity-100"}`}>
                                {mood.icon}
                            </div>
                        </div>
                        <span className={`text-xs font-bold transition-colors ${selected === mood.value ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                            {mood.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Confirmation */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}>
                        <span className="text-violet-300 font-bold">
                            Bloom felt that! You're feeling <span className="text-white">{moods.find((m) => m.value === selected)?.label}</span> {moods.find((m) => m.value === selected)?.icon}
                        </span>
                    </div>
                    <div className="mt-3">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="px-8 py-3 rounded-2xl text-sm font-bold text-white"
                            style={{ background: "linear-gradient(135deg, #A78BFA, #F9A8D4)", boxShadow: "0 0 30px rgba(167,139,250,0.4)" }}
                        >
                            Save & Continue ✓
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
