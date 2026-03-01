import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

// Combine motion props and base button props, avoiding conflicts
interface SafeButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "ghost" | "crisis";
    size?: "md" | "lg" | "xl";
    children: React.ReactNode;
}

export const SafeButton: React.FC<SafeButtonProps> = ({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}) => {
    const variants = {
        primary: "bg-trust-blue text-white shadow-md hover:shadow-glow",
        secondary: "bg-white text-trust-blue border-2 border-trust-blue/20 hover:bg-cloud-whisper",
        ghost: "bg-transparent text-trust-blue/60 hover:text-trust-blue hover:bg-trust-blue/5",
        crisis: "bg-growth-end/10 text-growth-end border-2 border-growth-end/20 hover:bg-growth-end/20",
    };

    const sizes = {
        md: "px-6 py-3 text-sm rounded-2xl",
        lg: "px-8 py-4 text-base rounded-3xl",
        xl: "px-10 py-6 text-lg rounded-[2.5rem] font-bold",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "font-display transition-all duration-300 flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
