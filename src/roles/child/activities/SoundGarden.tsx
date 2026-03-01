import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, CloudRain, Sun, Wind } from "lucide-react";

interface SoundGardenProps {
    onClose: () => void;
}

export const SoundGarden: React.FC<SoundGardenProps> = ({ onClose }) => {
    const [activeSound, setActiveSound] = useState<string | null>(null);

    const sounds = [
        { id: "rain", label: "Rain Forest", icon: <CloudRain size={24} />, color: "rgba(56, 189, 248, 0.2)", textColor: "text-sky-400" },
        { id: "wind", label: "Summer Breeze", icon: <Wind size={24} />, color: "rgba(110, 231, 183, 0.2)", textColor: "text-emerald-400" },
        { id: "morning", label: "Morning Sun", icon: <Sun size={24} />, color: "rgba(252, 211, 77, 0.2)", textColor: "text-amber-400" },
        { id: "zen", label: "Zen Chimes", icon: <Volume2 size={24} />, color: "rgba(167, 139, 250, 0.2)", textColor: "text-violet-400" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0F1E] flex flex-col items-center justify-center p-8 overflow-hidden"
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all z-50"
            >
                <X size={24} />
            </button>

            {/* Floating sound nodes */}
            <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
                <AnimatePresence>
                    {activeSound && (
                        <motion.div
                            key={activeSound}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-x-0 inset-y-0 rounded-full bg-white/20 blur-[100px]"
                        />
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-8 md:gap-16 relative z-10">
                    {sounds.map((sound, i) => (
                        <motion.button
                            key={sound.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
                            className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 border-2 ${activeSound === sound.id ? 'border-white bg-white/10 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                            style={{ backgroundColor: activeSound === sound.id ? sound.color : "rgba(255, 255, 255, 0.05)" }}
                        >
                            <div className={sound.textColor}>{sound.icon}</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{sound.label}</span>

                            {activeSound === sound.id && (
                                <motion.div
                                    layoutId="pulse"
                                    className="absolute inset-0 rounded-[2.5rem] border-2 border-white/20 animate-ping opacity-20"
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="text-center mt-12 space-y-4">
                <h2 className="text-2xl font-display font-black text-white">Sound Garden</h2>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Select a mood sound to begin your journey</p>
            </div>

            {/* Background visual reactive elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={activeSound ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                            y: [0, -20, 0]
                        } : {}}
                        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-2 h-2 rounded-full bg-sky-400/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
