import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Activity, Clock, FileText, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
// Animation imports removed as localized animations are used alternatively

interface PatientProfileDeepDiveProps {
    isOpen: boolean;
    onClose: () => void;
    patient: any;
}

export const PatientProfileDeepDive: React.FC<PatientProfileDeepDiveProps> = ({ isOpen, onClose, patient }) => {
    if (!patient) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-4xl z-[100] bg-[#060A12] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-10 py-8 scroll-glass border-b border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[2rem] bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl font-display font-black text-indigo-400">
                                    {patient.name[0]}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-display font-black text-white">{patient.name}</h2>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-xs font-mono text-white/30 tracking-widest uppercase">{patient.id}</span>
                                        <span className="text-xs font-bold text-indigo-500/80 uppercase tracking-widest">Active Monitoring</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-12 light-scroll">

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Longitudinal Risk", value: "High", detail: (p: any) => p.score, color: "rose", icon: <AlertTriangle size={18} /> },
                                    { label: "Mood Avg (7d)", value: "3.2", detail: "Improving Trend", color: "amber", icon: <TrendingUp size={18} /> },
                                    { label: "Adherence", value: "94%", detail: "Medication & Logs", color: "emerald", icon: <ShieldCheck size={18} /> },
                                ].map((stat, i) => (
                                    <div key={i} className={`p-6 rounded-3xl bg-${stat.color}-500/5 border border-${stat.color}-500/10 flex flex-col gap-4`}>
                                        <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400`}>
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.label}</p>
                                            <p className={`text-2xl font-display font-black text-${stat.color}-400`}>{stat.value}</p>
                                            <p className="text-[10px] text-white/30 font-medium">{typeof stat.detail === 'function' ? stat.detail(patient) : stat.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Data Visuals - Neural Mapping (Conceptual Placeholder) */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display font-black text-xl text-white tracking-tight flex items-center gap-3">
                                        <Brain size={20} className="text-indigo-400" /> Neural State Mapping
                                    </h3>
                                    <div className="flex gap-2">
                                        {["Mood", "Anxiety", "Focus"].map(t => (
                                            <button key={t} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-white/50 hover:bg-white/10">{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-64 rounded-3xl bg-gradient-to-br from-indigo-900/10 to-transparent border border-white/5 p-8 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)]" />
                                    <p className="text-white/20 text-xs font-mono uppercase tracking-widest text-center">
                                        Longitudinal correlation matrix generating...<br />
                                        <span className="text-[10px]">Comparing mood vs socialization patterns</span>
                                    </p>
                                    {/* Decorative Neural-like lines */}
                                    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                                        <path d="M100 100 Q 200 50 400 300 T 700 150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-indigo-500" />
                                    </svg>
                                </div>
                            </section>

                            {/* Clinical Timeline Integration */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display font-black text-xl text-white tracking-tight flex items-center gap-3">
                                        <Clock size={20} className="text-sky-400" /> Patient Activity Log
                                    </h3>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-white/30">Download Report</button>
                                </div>
                                <div className="rounded-3xl bg-white/5 border border-white/5 p-8">
                                    {/* Reuse or replicate ClinicalTimeline logic here if needed, or point to it */}
                                    <div className="space-y-8 relative">
                                        <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
                                        {[
                                            { icon: <Brain size={12} />, title: "Therapy Session #12", time: "Feb 27, 2026", color: "indigo" },
                                            { icon: <Activity size={12} />, title: "Acute Anxiety Spike", time: "Feb 25, 2026", color: "rose" },
                                            { icon: <FileText size={12} />, title: "Medication Change (Sertraline)", time: "Feb 22, 2026", color: "amber" },
                                        ].map((step, i) => (
                                            <div key={i} className="pl-10 relative">
                                                <div className={`absolute left-0 top-0.5 w-6 h-6 rounded-lg bg-${step.color}-600/20 border border-${step.color}-500/20 flex items-center justify-center text-${step.color}-400`}>
                                                    {step.icon}
                                                </div>
                                                <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                                                <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">{step.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Action Bar (Pinned Bottom in thought, but part of content here) */}
                            <div className="flex gap-4 pt-8 border-t border-white/5">
                                <button className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-xl shadow-indigo-600/20">Create Intervention Plan</button>
                                <button className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm">Update Diagnostics</button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
