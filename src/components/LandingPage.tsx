import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";
import { Sparkles, Shield, Heart, ArrowRight } from "lucide-react";

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-[#060A12] text-white selection:bg-violet-500/30">
            {/* Ambient background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
            </div>

            <main className="relative z-10">
                {/* Navigation */}
                <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-violet-500/20">
                            🌸
                        </div>
                        <span className="font-display font-black text-xl tracking-tight">MindBloom</span>
                    </div>
                    <button
                        onClick={onStart}
                        className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
                    >
                        Launch Experience
                    </button>
                </nav>

                {/* Hero Section */}
                <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto text-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8">
                            <Sparkles size={14} className="text-violet-400" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">Next-Gen Therapeutic Platform</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-[clamp(3rem,8vw,6.5rem)] font-display font-black leading-[0.9] tracking-tighter mb-8"
                        >
                            Nurturing <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-rose-300 bg-clip-text text-transparent italic">Minds</span><br />
                            Together.
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
                        >
                            A multisensory, role-based platform designed with clinical precision
                            and childlike wonder to promote emotional growth and family harmony.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={onStart}
                                className="group px-8 py-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-black text-lg shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.4)] transition-all flex items-center gap-3"
                            >
                                Enter Perspective
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-black text-lg">
                                The Philosophy
                            </button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Feature Bento */}
                <section className="px-8 py-32 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Heart size={24} className="text-pink-400" />,
                                title: "Safe Garden",
                                desc: "A gamified, non-judgmental space for children to express their internal worlds through creative metaphors.",
                                bg: "from-pink-500/10 to-violet-500/5",
                            },
                            {
                                icon: <Shield size={24} className="text-blue-400" />,
                                title: "Clinical Command",
                                desc: "Advanced data stratification and longitudinal tracking for therapists to monitor risk and progress.",
                                bg: "from-blue-500/10 to-indigo-500/5",
                            },
                            {
                                icon: <Sparkles size={24} className="text-amber-400" />,
                                title: "Nurturing Grove",
                                desc: "Empowering tools for parents to observe patterns and receive actionable guidance without surveillance.",
                                bg: "from-amber-500/10 to-orange-500/5",
                            },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-8 rounded-3xl bg-gradient-to-br ${f.bg} border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all`}
                            >
                                <div className="mb-6">{f.icon}</div>
                                <h3 className="text-2xl font-display font-black mb-3">{f.title}</h3>
                                <p className="text-white/30 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-8 py-20 border-t border-white/5 text-center">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm">
                            🌸
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight">MindBloom</span>
                    </div>
                    <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
                        Privacy First · HIPAA-Ready · Science-Backed
                    </p>
                </footer>
            </main>
        </div>
    );
};
