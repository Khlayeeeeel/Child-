import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle } from "lucide-react";

const insights = [
    { title: "Mood Trend", value: "Improving", delta: "+0.4", up: true, icon: <TrendingUp size={16} />, trend: [10, 20, 15, 28, 42, 38, 58], color: "#4F46E5", light: "rgba(79,70,229,0.08)", border: "rgba(79,70,229,0.15)" },
    { title: "Sleep Quality", value: "Stable", delta: "7.1h avg", up: true, icon: <TrendingUp size={16} />, trend: [50, 45, 55, 50, 52, 60, 55], color: "#0EA5E9", light: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.15)" },
    { title: "Anxiety Alert", value: "Elevated", delta: "↑ Tues", up: false, icon: <AlertCircle size={16} />, trend: [5, 10, 8, 40, 15, 10, 8], color: "#F43F5E", light: "rgba(244,63,94,0.07)", border: "rgba(244,63,94,0.12)" },
];

export const InsightTelescope: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, i) => {
                const max = Math.max(...insight.trend);
                const points = insight.trend.map((v, idx) => `${(idx / (insight.trend.length - 1)) * 100},${100 - (v / max) * 80}`).join(" ");
                return (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="rounded-2xl p-5 border transition-all hover:shadow-md"
                        style={{ background: insight.light, borderColor: insight.border }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2" style={{ color: insight.color }}>
                                {insight.icon}
                                <span className="text-xs font-bold uppercase tracking-widest">{insight.title}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${insight.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"}`}>
                                {insight.delta}
                            </span>
                        </div>

                        <p className="text-xl font-display font-black text-gray-900 mb-4">{insight.value}</p>

                        {/* Sparkline */}
                        <svg viewBox="0 0 100 100" className="w-full h-14" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={insight.color} stopOpacity="0.2" />
                                    <stop offset="100%" stopColor={insight.color} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <polyline points={points} fill="none" stroke={insight.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <polygon points={`0,100 ${points} 100,100`} fill={`url(#g${i})`} />
                        </svg>

                        <div className="flex justify-between text-[10px] text-gray-300 mt-1 font-bold">
                            <span>Mon</span><span>Sun</span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
