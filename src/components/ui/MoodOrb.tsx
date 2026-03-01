import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface MoodOrbProps {
    value: number;
    label?: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

const moodColors = [
    "bg-growth-end",   // 1 - Crisis/Low
    "bg-growth-mid",   // 2 - Struggling
    "bg-yellow-400",   // 3 - Neutral
    "bg-trust-blue",   // 4 - Good
    "bg-growth-start", // 5 - Great
];

export const MoodOrb: React.FC<MoodOrbProps> = ({
    value,
    label,
    icon,
    isActive,
    onClick,
    className,
}) => {
    const colorClass = moodColors[Math.min(Math.max(value - 1, 0), moodColors.length - 1)];

    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClick}
                className={cn(
                    "relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300",
                    colorClass,
                    isActive && "ring-4 ring-offset-2 ring-trust-blue shadow-glow scale-110",
                    !isActive && "opacity-80 hover:opacity-100"
                )}
            >
                {icon && <span className="text-2xl">{icon}</span>}

                {/* Ambient pulse for active orb */}
                {isActive && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className={cn("absolute inset-0 rounded-full", colorClass)}
                    />
                )}
            </motion.button>
            {label && (
                <span className={cn(
                    "text-fluid-xs font-medium transition-colors",
                    isActive ? "text-trust-blue" : "text-text-primary/60"
                )}>
                    {label}
                </span>
            )}
        </div>
    );
};
