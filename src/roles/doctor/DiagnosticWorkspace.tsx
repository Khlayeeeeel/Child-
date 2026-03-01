import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { fadeInUp } from "../../utils/animations";

interface DataPoint {
    day: string;
    mood: number;
    sleep: number;
    activity: number;
}

const weekData: DataPoint[] = [
    { day: "Mon", mood: 3, sleep: 7, activity: 60 },
    { day: "Tue", mood: 2, sleep: 5, activity: 20 },
    { day: "Wed", mood: 3, sleep: 6, activity: 45 },
    { day: "Thu", mood: 4, sleep: 8, activity: 80 },
    { day: "Fri", mood: 5, sleep: 8, activity: 90 },
    { day: "Sat", mood: 4, sleep: 9, activity: 70 },
    { day: "Sun", mood: 3, sleep: 7, activity: 50 },
];

const moodColors = ["", "#F43F5E", "#F59E0B", "#EAB308", "#3B82F6", "#10B981"];

const tabs = ["Mood vs Sleep", "Activity Impact", "Clinical Summary"] as const;
type Tab = typeof tabs[number];

export const DiagnosticWorkspace: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("Mood vs Sleep");

    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl"
        >
            {/* Tab Nav */}
            <div className="flex gap-1 p-2 bg-white/[0.03] border-b border-white/5">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all",
                            activeTab === tab
                                ? "bg-blue-600/20 text-blue-400 shadow-inner shadow-white/5"
                                : "text-white/20 hover:text-white/40"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="p-10">
                {activeTab === "Mood vs Sleep" && (
                    <div className="space-y-10">
                        <div className="flex items-end gap-5 h-48">
                            {weekData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="relative w-full h-full flex flex-col justify-end">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(d.sleep / 10) * 100}%` }}
                                            className="w-full rounded-xl bg-blue-500/10 border border-blue-500/10 relative"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.05 + 0.3 }}
                                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-lg shadow-lg border-2 border-[#060A12]"
                                                style={{ background: moodColors[d.mood] }}
                                            />
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{d.day}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-8 border-t border-white/5 pt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" />
                                <span className="text-xs text-white/40 font-medium">Sleep Hours (Rel)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-emerald-500" />
                                <span className="text-xs text-white/40 font-medium">Positive Affect Index</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Activity Impact" && (
                    <div className="space-y-6">
                        {weekData.map((d, i) => (
                            <div key={i} className="flex items-center gap-6 group">
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest w-12">{d.day}</span>
                                <div className="flex-1 h-2 bg-white/[0.03] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${d.activity}%` }}
                                        transition={{ delay: i * 0.05 }}
                                        className="h-full rounded-full"
                                        style={{ background: `linear-gradient(to right, ${moodColors[d.mood]}44, ${moodColors[d.mood]})` }}
                                    />
                                </div>
                                <span className="text-[10px] font-mono text-white/30 w-16 text-right leading-none">{d.activity} MINS</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Clinical Summary" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Affect Intensity", value: "Moderate", sub: "+12% Displacement", color: "blue" },
                            { label: "Sleep Adherence", value: "Consistent", sub: "Mean 7.1h/day", color: "emerald" },
                            { label: "Activity Sync", value: "High Corr", sub: "Pearson 0.82", color: "amber" },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{stat.label}</p>
                                <p className={cn("text-2xl font-display font-black", `text-${stat.color}-400`)}>{stat.value}</p>
                                <p className="text-[10px] text-white/30 mt-1">{stat.sub}</p>
                            </div>
                        ))}
                        <div className="col-span-1 md:col-span-3 p-6 rounded-[2rem] bg-blue-600/5 border border-blue-500/10 mt-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Automated Finding</h4>
                            <p className="text-xs text-white/50 leading-relaxed font-medium">
                                Longitudinal analysis suggests a high positive correlation between activity triggers
                                and emotional regulation. Recommend focusing on morning activity blocks for P001.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
