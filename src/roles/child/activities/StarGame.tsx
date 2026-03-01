import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy } from "lucide-react";

interface StarGameProps {
    onClose: () => void;
}

interface Star {
    id: number;
    x: number;
    delay: number;
}

export const StarGame: React.FC<StarGameProps> = ({ onClose }) => {
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState<Star[]>([]);
    const [gameOver] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (stars.length < 10 && !gameOver) {
                setStars(prev => [...prev, {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    delay: Math.random() * 2
                }]);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [stars, gameOver]);

    const catchStar = (id: number) => {
        setScore(s => s + 1);
        setStars(prev => prev.filter(s => s.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A1F] flex flex-col items-center justify-center overflow-hidden h-screen select-none"
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all z-50"
            >
                <X size={24} />
            </button>

            {/* Background Starfield */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full w-0.5 h-0.5"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random()
                        }}
                    />
                ))}
            </div>

            {/* UI */}
            <div className="absolute top-8 left-8 flex items-center gap-4 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 z-50">
                <Trophy size={20} className="text-amber-400" />
                <span className="text-2xl font-display font-black text-white">{score}</span>
            </div>

            {/* Game Canvas */}
            <div className="relative w-full max-w-2xl h-[80vh] cursor-crosshair">
                <AnimatePresence>
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: [0, 600], opacity: 1 }}
                            exit={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 5, ease: "linear" }}
                            onPointerDown={() => catchStar(star.id)}
                            className="absolute w-12 h-12 flex items-center justify-center cursor-pointer group"
                            style={{ left: `${star.x}%` }}
                            onAnimationComplete={() => setStars(p => p.filter(s => s.id !== star.id))}
                        >
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-3xl filter drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]"
                            >
                                ⭐
                            </motion.div>
                            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="text-center mt-12 space-y-4 relative z-10">
                <h2 className="text-2xl font-display font-black text-white">Star Catcher</h2>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Gently catch the falling stars to fill your jar</p>
            </div>
        </motion.div>
    );
};
