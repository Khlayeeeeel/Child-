import type { Variants } from "framer-motion";

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: 15 },
};

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const float: Variants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export const bloom: Variants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1
        }
    },
};
