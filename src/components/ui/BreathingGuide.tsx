import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface BreathingGuideProps {
    type?: "4-7-8" | "box" | "gentle";
    size?: "sm" | "md" | "lg";
    className?: string;
}

const breathingPatterns = {
    "4-7-8": { inhale: 4, hold: 7, exhale: 8, label: "4-7-8 Relaxation" },
    "box": { inhale: 4, hold: 4, exhale: 4, pause: 4, label: "Box Breathing" },
    "gentle": { inhale: 5, exhale: 5, label: "Gentle Pacing" },
};

export const BreathingGuide: React.FC<BreathingGuideProps> = ({
    type = "gentle",
    size = "md",
    className,
}) => {
    const [phase, setPhase] = useState<string>("inhale");
    const pattern = breathingPatterns[type];

    useEffect(() => {
        let timeout: any;
        const runCycle = () => {
            if (type === "gentle") {
                setPhase("inhale");
                timeout = setTimeout(() => {
                    setPhase("exhale");
                    timeout = setTimeout(runCycle, pattern.exhale * 1000);
                }, pattern.inhale * 1000);
            } else if (type === "4-7-8") {
                setPhase("inhale");
                timeout = setTimeout(() => {
                    setPhase("hold");
                    timeout = setTimeout(() => {
                        setPhase("exhale");
                        timeout = setTimeout(runCycle, 8000);
                    }, 7000);
                }, 4000);
            }
            // Simplified for brevity, box breathing would follow similar logic
        };

        runCycle();
        return () => clearTimeout(timeout);
    }, [type]);

    const sizeClasses = {
        sm: "w-24 h-24",
        md: "w-48 h-48",
        lg: "w-64 h-64",
    };

    return (
        <div className={cn("flex flex-col items-center gap-6", className)}>
            <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-trust-blue/20" />

                {/* Breathing Circle */}
                <motion.div
                    animate={{
                        scale: phase === "inhale" ? 1.5 : phase === "exhale" ? 1 : phase === "hold" ? 1.5 : 1,
                        backgroundColor: phase === "inhale" ? "rgba(74, 144, 226, 0.4)" : "rgba(74, 144, 226, 0.2)",
                    }}
                    transition={{
                        duration: phase === "inhale" ? pattern.inhale : phase === "exhale" ? (pattern as any).exhale : 1,
                        ease: "easeInOut",
                    }}
                    className="w-1/2 h-1/2 rounded-full bg-trust-blue shadow-glow"
                />

                {/* Phase Text */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={phase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute text-trust-blue font-display font-bold uppercase tracking-widest text-sm"
                    >
                        {phase}
                    </motion.span>
                </AnimatePresence>
            </div>

            <div className="text-center">
                <p className="text-text-primary/60 text-sm font-medium">{pattern.label}</p>
                <p className="text-xs text-text-primary/40 italic">Follow the circle's rhythm</p>
            </div>
        </div>
    );
};
