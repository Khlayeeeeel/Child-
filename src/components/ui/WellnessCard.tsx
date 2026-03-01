import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface WellnessCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
    color?: string;
}

export const WellnessCard: React.FC<WellnessCardProps> = ({
    title,
    description,
    icon,
    onClick,
    className,
    color = "violet",
}) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "group relative text-left p-6 rounded-[2rem] border transition-all duration-300 overflow-hidden",
                "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10 shadow-xl",
                className
            )}
        >
            {/* Animated Gradient Glow */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                `bg-gradient-to-br from-${color}-500/10 via-transparent to-transparent`
            )} />

            {/* Side Accent Line */}
            <div className={cn(
                "absolute top-6 left-0 h-8 w-1 h-full rounded-r-full group-hover:h-full transition-all duration-500",
                `bg-${color}-500`
            )} />

            {/* Icon Container */}
            <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-300",
                `bg-${color}-500/10 border-${color}-500/20 group-hover:bg-${color}-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-${color}-500/30`
            )}>
                {icon}
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-display font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{description}</p>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: `var(--color-${color}-primary, currentColor)` }} />
        </motion.button>
    );
};
