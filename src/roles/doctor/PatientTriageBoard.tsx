import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Activity, ChevronRight } from "lucide-react";

const riskColors: Record<string, { text: string; bg: string; border: string }> = {
    high: { text: "#F43F5E", bg: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.2)" },
    med: { text: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
    low: { text: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
};

const patients = [
    { id: "P001", name: "Alice Thompson", age: 10, risk: "high", score: 8.4, trend: "up", mood: 2, session: "Today 15:30", dx: "GAD + MDD" },
    { id: "P002", name: "Marcus Webb", age: 9, risk: "med", score: 5.1, trend: "stable", mood: 3, session: "Thu 10:00", dx: "Adjustment Disorder" },
    { id: "P003", name: "Sonia Reyes", age: 13, risk: "low", score: 2.3, trend: "down", mood: 4, session: "Fri 14:00", dx: "Mild Anxiety" },
    { id: "P004", name: "James O'Brien", age: 11, risk: "med", score: 4.8, trend: "up", mood: 3, session: "Mon 09:00", dx: "ADHD + Anxiety" },
];

const moodDot: Record<number, string> = { 1: "#F43F5E", 2: "#F59E0B", 3: "#EAB308", 4: "#10B981", 5: "#3B82F6" };

interface PatientTriageBoardProps {
    onSelectPatient: (patient: any) => void;
}

export const PatientTriageBoard: React.FC<PatientTriageBoardProps> = ({ onSelectPatient }) => {
    return (
        <div className="rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02]">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] bg-white/[0.03] border-b border-white/5 text-white/30">
                <span className="col-span-4">Patient Profile</span>
                <span className="col-span-2">Clinical Dx</span>
                <span className="col-span-2">Risk Index</span>
                <span className="col-span-2">Current Affect</span>
                <span className="col-span-2 text-right">Action</span>
            </div>

            <div className="divide-y divide-white/5">
                {patients.map((p, i) => {
                    const R = riskColors[p.risk];
                    return (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => onSelectPatient(p)}
                            className="grid grid-cols-12 gap-3 px-8 py-5 items-center cursor-pointer hover:bg-white/[0.04] transition-all group"
                        >
                            {/* Name */}
                            <div className="col-span-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-display font-black text-white shrink-0 shadow-lg border border-white/10" style={{ background: `linear-gradient(135deg, ${R.text}aa, ${R.text}44)` }}>
                                    {p.name[0]}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm tracking-tight">{p.name}</p>
                                    <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest">{p.id} · {p.age}y</p>
                                </div>
                            </div>

                            {/* Diagnosis */}
                            <div className="col-span-2">
                                <span className="text-[11px] font-medium text-white/40">{p.dx}</span>
                            </div>

                            {/* Risk */}
                            <div className="col-span-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ color: R.text, background: R.bg, border: `1px solid ${R.border}` }}>
                                    {p.trend === "up" ? <TrendingUp size={10} /> : p.trend === "down" ? <TrendingDown size={10} /> : <Activity size={10} />}
                                    {p.risk} · {p.score}
                                </div>
                            </div>

                            {/* Mood */}
                            <div className="col-span-2 flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: moodDot[p.mood] ?? "#ccc", boxShadow: `0 0 10px ${moodDot[p.mood]}` }} />
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{["", "Distressed", "Unsettled", "Neutral", "Balanced", "Flourishing"][p.mood]}</span>
                            </div>

                            {/* Action */}
                            <div className="col-span-2 text-right">
                                <button className="p-2 rounded-lg bg-white/5 text-white/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
