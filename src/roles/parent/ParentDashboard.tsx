import React from "react";
import { motion } from "framer-motion";
import { FamilyConstellation } from "./FamilyConstellation";
import { InsightTelescope } from "./InsightTelescope";
import { ConnectionLog } from "./ConnectionLog";
import { ActionConsole } from "./ActionConsole";
import { Bell, Settings, Search, LayoutGrid, Heart, ArrowLeft } from "lucide-react";
import { fadeIn, fadeInUp, staggerContainer } from "../../utils/animations";

interface ParentDashboardProps {
    onBack?: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen light-scroll bg-[#F4F6FB] overflow-x-hidden">
            {/* === NAVBAR === */}
            <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl px-8 py-4 border-b border-gray-100 shadow-sm/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-indigo-600 transition-all flex items-center gap-2"
                                title="Back to Selection"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br from-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/20">
                                <Heart size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-display font-black text-gray-900 text-base leading-none">The Observatory</h1>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Family Wellness</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
                            <input placeholder="Search family..." className="pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 w-64 transition-all" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="relative w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
                                <Bell size={18} />
                                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
                            </button>
                            <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
                                <Settings size={18} />
                            </button>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-display font-black text-white text-sm shadow-md">M</div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-10">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-10"
                >
                    {/* Header Section */}
                    <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                                <LayoutGrid size={12} /> Dashboard Overview
                            </span>
                            <h2 className="text-4xl font-display font-black text-gray-900 tracking-tight">
                                Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent italic">Marie.</span>
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Here's a summary of your family's emotional landscape today.</p>
                        </div>
                    </motion.div>

                    {/* Core Layout Grid */}
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Column: Constellation + Insights */}
                        <div className="col-span-12 lg:col-span-8 space-y-10">
                            {/* Top Row: Family + Summary stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={fadeInUp} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-center">
                                    <FamilyConstellation />
                                </motion.div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { label: "Family Mood", value: "4.2", color: "text-indigo-600", bg: "bg-indigo-50", icon: "✨" },
                                        { label: "Active Goals", value: "3", color: "text-emerald-600", bg: "bg-emerald-50", icon: "🌱" },
                                        { label: "Unread Updates", value: "12", color: "text-rose-600", bg: "bg-rose-50", icon: "📬" },
                                    ].map((stat, i) => (
                                        <motion.div key={i} variants={fadeInUp} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-indigo-100 transition-all">
                                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center text-xl`}>{stat.icon}</div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                                                <p className={`text-2xl font-display font-black ${stat.color}`}>{stat.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Insights Section */}
                            <motion.section variants={fadeInUp}>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-display font-black text-2xl text-gray-900 tracking-tight">Trend Telescope</h3>
                                    <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Full History →</button>
                                </div>
                                <InsightTelescope />
                            </motion.section>

                            {/* Action Console Integration */}
                            <motion.section variants={fadeInUp}>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-display font-black text-2xl text-gray-900 tracking-tight">Active Interventions</h3>
                                </div>
                                <ActionConsole />
                            </motion.section>
                        </div>

                        {/* Right Column: Connection Log (Timeline) */}
                        <div className="col-span-12 lg:col-span-4">
                            <motion.div variants={fadeIn} className="sticky top-28">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-display font-black text-2xl text-gray-900 tracking-tight">Connection Log</h3>
                                </div>
                                <ConnectionLog />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
