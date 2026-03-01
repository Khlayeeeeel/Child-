import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Heart, Save, Sparkles } from "lucide-react";

interface MyJournalProps {
    onClose: () => void;
}

export const MyJournal: React.FC<MyJournalProps> = ({ onClose }) => {
    const [entry, setEntry] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] bg-bloom-bg flex flex-col items-center p-8 md:p-16"
        >
            <div className="w-full max-w-3xl flex-1 flex flex-col bg-bloom-surface rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                {/* Magic gradient background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 blur-[100px] pointer-events-none" />

                {/* Header */}
                <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="font-display font-black text-2xl text-white">My Secret Garden Journal</h3>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-10 flex flex-col relative">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-400" /> Today's discovery...
                    </p>

                    <textarea
                        value={entry}
                        onChange={(e) => setEntry(e.target.value)}
                        placeholder="What made your heart smile today?"
                        className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl text-white/80 placeholder:text-white/10 resize-none font-display leading-relaxed"
                    />

                    {/* Toolbar/Footer */}
                    <div className="mt-8 flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="p-4 rounded-2xl bg-white/5 text-pink-400 hover:bg-white/10 transition-all">
                                <Heart size={20} fill={entry ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            disabled={!entry.trim() || isSaving}
                            className="px-8 py-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-black flex items-center gap-3 shadow-lg shadow-violet-500/20 disabled:opacity-30 disabled:shadow-none transition-all"
                        >
                            {isSaving ? "Planting Entry..." : saved ? "Entry Planted! 🌸" : (
                                <>
                                    Save Entry
                                    <Save size={18} />
                                </>
                            )}
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {saved && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="absolute inset-0 flex items-center justify-center bg-bloom-bg/80 backdrop-blur-md rounded-3xl z-50 pointer-events-none"
                            >
                                <div className="text-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 1 }}
                                        className="text-6xl mb-6"
                                    >
                                        🌸
                                    </motion.div>
                                    <h4 className="text-3xl font-display font-black text-white tracking-tight">Your story is blooming.</h4>
                                    <p className="text-white/40 mt-2">I'll keep it safe for you.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};
