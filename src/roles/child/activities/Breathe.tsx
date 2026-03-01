import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, X } from "lucide-react";

interface BreatheProps {
    onClose: () => void;
}

export const Breathe: React.FC<BreatheProps> = ({ onClose }) => {
    const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
    const [cycleCount, setCycleCount] = useState(0);

    useEffect(() => {
        let timer: any;
        if (phase === "inhale") {
            timer = setTimeout(() => setPhase("hold"), 4000);
        } else if (phase === "hold") {
            timer = setTimeout(() => setPhase("exhale"), 4000);
        } else {
            timer = setTimeout(() => {
                setPhase("inhale");
                setCycleCount((c) => c + 1);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bloom-bg flex flex-col items-center justify-center p-8 transition-colors duration-[4000ms]"
            style={{
                backgroundColor: phase === "inhale" ? "rgba(15, 10, 30, 1)" : phase === "hold" ? "rgba(20, 30, 50, 1)" : "rgba(10, 30, 20, 1)"
            }}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
            >
                <X size={24} />
            </button>

            {/* Background ambient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: phase === "inhale" ? 1.5 : 1,
                        opacity: phase === "inhale" ? 0.3 : 0.1,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sky-500/20 blur-[120px]"
                />
            </div>

            <div className="relative z-10 text-center">
                <motion.div
                    animate={{
                        scale: phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 0.8,
                        rotate: phase === "inhale" ? 0 : 180,
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/10 flex items-center justify-center relative mb-16"
                >
                    {/* Inner pulsating circle */}
                    <motion.div
                        animate={{
                            scale: phase === "inhale" ? 1 : phase === "hold" ? 1 : 0.2,
                            backgroundColor: phase === "inhale" ? "rgba(56, 189, 248, 0.4)" : phase === "hold" ? "rgba(167, 139, 250, 0.4)" : "rgba(110, 231, 183, 0.4)",
                            boxShadow: phase === "inhale" ? "0 0 40px rgba(56, 189, 248, 0.4)" : "0 0 60px rgba(167, 139, 250, 0.4)",
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="w-full h-full rounded-full"
                    />

                    <div className="absolute flex flex-col items-center">
                        <Wind size={48} className="text-white mb-4 opacity-50" />
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize tracking-tight">
                            {phase === "inhale" ? "Breathe In" : phase === "hold" ? "Gentle Hold" : "Breathe Out"}
                        </h2>
                        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-sm">
                            Cycle {cycleCount + 1}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 1, 0],
                        x: Math.random() * 200 - 100,
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: "10%",
                    }}
                />
            ))}
        </motion.div>
    );
};
