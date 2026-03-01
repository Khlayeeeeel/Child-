import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CompanionAvatarProps {
    mood?: number;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    isAnimated?: boolean;
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
    mood = 3,
    size = "md",
    className,
    isAnimated = true,
}) => {
    const sizeMap = {
        sm: "w-12 h-12",
        md: "w-24 h-24",
        lg: "w-40 h-40",
        xl: "w-64 h-64",
    };

    const ambientColor = mood > 3 ? "rgba(110, 231, 183, 0.3)" : mood < 3 ? "rgba(244, 63, 94, 0.3)" : "rgba(167, 139, 250, 0.3)";

    return (
        <div className={cn("relative flex items-center justify-center", sizeMap[size], className)}>
            {/* Ambient Pulsing Aura */}
            {isAnimated && (
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[-20%] rounded-full blur-[40px]"
                    style={{ backgroundColor: ambientColor }}
                />
            )}

            {/* Main Companion Body (Liquid-like) */}
            <motion.div
                animate={isAnimated ? {
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%"
                    ],
                    rotate: [0, 5, -5, 0],
                } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-400 shadow-2xl border border-white/20 overflow-hidden"
            >
                {/* Soft Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-y-[-50%] group-hover:translate-y-[50%] transition-transform duration-1000" />

                {/* Eyes / Face (Metaphorical) */}
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-full flex justify-center gap-4 px-4">
                    <motion.div
                        animate={isAnimated ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                        className="w-2 h-3 bg-white rounded-full opacity-80"
                    />
                    <motion.div
                        animate={isAnimated ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                        className="w-2 h-3 bg-white rounded-full opacity-80"
                    />
                </div>

                {/* Reflection */}
                <div className="absolute top-2 left-1/4 w-1/4 h-1/8 bg-white/20 rounded-full blur-sm" />
            </motion.div>

            {/* Floating Particles */}
            {isAnimated && [...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, i % 2 === 0 ? 10 : -10, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.8,
                    }}
                    className="absolute w-2 h-2 rounded-full bg-white/40 blur-[1px]"
                    style={{
                        top: `${20 + i * 20}%`,
                        left: `${10 + i * 30}%`,
                    }}
                />
            ))}
        </div>
    );
};
