import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ProgressBloomProps {
    progress: number; // 0 to 100
    label?: string;
    size?: "md" | "lg";
    className?: string;
}

export const ProgressBloom: React.FC<ProgressBloomProps> = ({
    progress,
    label,
    size = "md",
    className,
}) => {
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);
    const scale = 0.6 + (normalizedProgress / 100) * 0.4;
    const opacity = 0.5 + (normalizedProgress / 100) * 0.5;

    return (
        <div className={cn("flex flex-col items-center gap-6", className)}>
            <div className={cn(
                "relative flex items-center justify-center",
                size === "lg" ? "w-48 h-48" : "w-32 h-32"
            )}>
                {/* Ambient Glow */}
                <motion.div
                    animate={{
                        scale: [scale, scale * 1.1, scale],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-[-20%] inset-y-[-20%] rounded-full bg-violet-500/20 blur-3xl pointer-events-none"
                />

                {/* Petals / Geometric Bloom */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: i * 45 }}
                        animate={{
                            scale: scale,
                            opacity: opacity * 0.8,
                            rotate: i * 45 + (normalizedProgress * 0.1),
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 20,
                            delay: i * 0.05,
                        }}
                        className="absolute w-full h-[30%] rounded-full"
                        style={{
                            background: `linear-gradient(90deg, transparent, rgba(167, 139, 250, ${0.1 + (normalizedProgress / 200)}), rgba(249, 168, 212, ${0.2 + (normalizedProgress / 200)}))`,
                            transformOrigin: "center",
                            top: "35%",
                        }}
                    />
                ))}

                {/* Central Core (The "Seed") */}
                <motion.div
                    animate={{
                        scale: scale * 0.9,
                        boxShadow: [
                            "0 0 20px rgba(167, 139, 250, 0.2)",
                            "0 0 40px rgba(167, 139, 250, 0.4)",
                            "0 0 20px rgba(167, 139, 250, 0.2)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative w-2/5 h-2/5 rounded-[2rem] bg-gradient-to-br from-violet-400 to-pink-400 z-10 flex items-center justify-center border border-white/20 shadow-2xl"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-display font-black text-white leading-none">{Math.round(normalizedProgress)}</span>
                        <span className="text-[8px] font-black text-white/60 uppercase tracking-widest mt-1">Growth</span>
                    </div>
                </motion.div>
            </div>

            {label && (
                <div className="text-center">
                    <p className="text-xs font-black text-violet-300 uppercase tracking-[0.2em]">{label}</p>
                </div>
            )}
        </div>
    );
};
