import React from "react";
import { motion } from "framer-motion";
import { Pill, Brain, Heart, FileText } from "lucide-react";

const events = [
    { icon: <Pill size={14} />, label: "Medication Adjusted", time: "Today, 09:00", detail: "Sertraline 25mg → 50mg", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
    { icon: <Brain size={14} />, label: "CBT Session", time: "Yesterday, 14:30", detail: "Focus: catastrophizing patterns. Progress noted.", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
    { icon: <Heart size={14} />, label: "Mood Check-in", time: "2 days ago", detail: "Self-reported 2/5 with high anxiety score", color: "#F43F5E", bg: "rgba(244,63,94,0.12)" },
    { icon: <FileText size={14} />, label: "Parent Report", time: "3 days ago", detail: "Sleep improving. Less irritability at home.", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
];

export const ClinicalTimeline: React.FC = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-black text-white text-sm uppercase tracking-widest">Clinical Timeline</h4>
                <button className="text-[11px] font-bold" style={{ color: "#3B82F6" }}>View All</button>
            </div>
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: "rgba(59,130,246,0.1)" }} />

                <div className="flex flex-col gap-4 pl-10">
                    {events.map((ev, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative">
                            {/* Dot on line */}
                            <div className="absolute -left-11 w-6 h-6 rounded-lg flex items-center justify-center" style={{ top: 2, background: ev.bg, border: `1px solid ${ev.color}30`, color: ev.color }}>
                                {ev.icon}
                            </div>
                            <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-white/70">{ev.label}</span>
                                    <span className="text-[10px] text-white/25">{ev.time}</span>
                                </div>
                                <p className="text-[11px] text-white/35 leading-relaxed">{ev.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
