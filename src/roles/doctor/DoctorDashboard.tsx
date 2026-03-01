import React, { useState } from "react";
import { PatientTriageBoard } from "./PatientTriageBoard";
import { DiagnosticWorkspace } from "./DiagnosticWorkspace";
import { PatientProfileDeepDive } from "./PatientProfileDeepDive";
import { Search, LogOut, LayoutGrid, Users, BarChart2, MessageSquare, Settings, Filter, AlertTriangle, CheckCircle2, Clock, Terminal, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import { fadeInUp, staggerContainer } from "../../utils/animations";
import { motion } from "framer-motion";

type Panel = "triage" | "analytics";

const nav = [
    { icon: <LayoutGrid size={18} />, label: "Overview" },
    { icon: <Users size={18} />, label: "Patient Directory" },
    { icon: <BarChart2 size={18} />, label: "Insights" },
    { icon: <MessageSquare size={18} />, label: "Messaging" },
    { icon: <Settings size={18} />, label: "Preferences" },
];

interface DoctorDashboardProps {
    onBack?: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onBack }) => {
    const [activeNav, setActiveNav] = useState(0);
    const [panel, setPanel] = useState<Panel>("triage");
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    const openDeepDive = (patient: any) => setSelectedPatient(patient);
    const closeDeepDive = () => setSelectedPatient(null);

    return (
        <div className="min-h-screen flex overflow-hidden selection:bg-blue-500/30" style={{ background: "#060A12" }}>
            {/* Side Rail */}
            <aside className="w-[80px] flex flex-col items-center py-10 gap-10 shrink-0 border-r border-white/5 bg-[#0A0F1A]">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 text-white font-black font-display text-xl">D</div>

                <div className="flex-1 flex flex-col gap-4 mt-6">
                    {nav.map((item, i) => (
                        <button
                            key={i}
                            title={item.label}
                            onClick={() => setActiveNav(i)}
                            className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group relative",
                                activeNav === i ? "bg-blue-600/10 text-blue-400 shadow-inner shadow-white/5" : "text-white/20 hover:text-white/60 hover:bg-white/5"
                            )}
                        >
                            {item.icon}
                            {activeNav === i && <motion.div layoutId="nav-glow" className="absolute left-0 w-1 h-6 rounded-full bg-blue-500" />}
                        </button>
                    ))}
                </div>

                <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/20 hover:text-rose-400 hover:bg-rose-500/5 transition-all">
                    <LogOut size={18} />
                </button>
            </aside>

            {/* Main Command Workspace */}
            <main className="flex-1 flex flex-col h-screen">
                {/* Header bar */}
                <header className="h-[80px] flex items-center justify-between px-10 shrink-0 border-b border-white/5 bg-[#060A12]/80 backdrop-blur-xl">
                    <div className="flex items-center gap-6">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex items-center justify-center group"
                                title="Exit to Role Selection"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                        )}
                        <div>
                            <h2 className="font-display font-black text-white text-xl tracking-tight">Clinical Command</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <p className="text-white/20 text-[10px] uppercase font-mono tracking-[0.2em]">Operational · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Context Switcher */}
                        <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-1">
                            {["triage", "analytics"].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPanel(p as Panel)}
                                    className={cn(
                                        "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                        panel === p ? "bg-blue-600/20 text-blue-400 shadow-inner shadow-white/5" : "text-white/30 hover:text-white/50"
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={15} />
                            <input
                                placeholder="Search metrics..."
                                className="pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-2xl text-xs text-white focus:ring-1 focus:ring-blue-500/30 w-72 transition-all outline-none"
                            />
                        </div>

                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-white/10 flex items-center justify-center font-display font-black text-blue-400 text-xs shadow-lg">AM</div>
                    </div>
                </header>

                {/* Dynamic Canvas Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="flex-1 overflow-y-auto p-10 light-scroll space-y-10"
                    >
                        {panel === "triage" ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-display font-black text-white tracking-tight">Active Surveillance</h3>
                                        <p className="text-white/30 text-xs mt-1">Real-time risk distribution across patient directory</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white/10 transition-all flex items-center gap-2">
                                            <Filter size={14} /> Filter Set
                                        </button>
                                        <button className="px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-400">
                                            <Terminal size={14} className="mr-2 inline" /> Gen-AI Summary
                                        </button>
                                    </div>
                                </div>

                                <motion.div variants={fadeInUp}>
                                    <PatientTriageBoard onSelectPatient={openDeepDive} />
                                </motion.div>

                                {/* Risk Overview Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: "Critical Alerts", value: "02", status: "Attention Required", icon: <AlertTriangle size={20} />, color: "rose" },
                                        { label: "Stability Index", value: "86%", status: "System Normal", icon: <CheckCircle2 size={20} />, color: "emerald" },
                                        { label: "Review Pipeline", value: "05", status: "Today's Agenda", icon: <Clock size={20} />, color: "amber" },
                                    ].map((s, i) => (
                                        <motion.div
                                            key={i}
                                            variants={fadeInUp}
                                            className={cn(
                                                "p-6 rounded-[2.5rem] border transition-all",
                                                `bg-${s.color}-500/5 border-${s.color}-500/10 hover:border-${s.color}-500/20`
                                            )}
                                        >
                                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", `bg-${s.color}-500/20 text-${s.color}-400`)}>
                                                {s.icon}
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{s.label}</p>
                                            <p className={cn("text-3xl font-display font-black mb-1", `text-${s.color}-400`)}>{s.value}</p>
                                            <p className="text-[10px] text-white/30 font-medium">{s.status}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <motion.div variants={fadeInUp} className="space-y-6">
                                <div>
                                    <h3 className="text-3xl font-display font-black text-white tracking-tight">Clinical Analytics</h3>
                                    <p className="text-white/30 text-xs mt-1">Cross-sectional correlation and trend modeling</p>
                                </div>
                                <DiagnosticWorkspace />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Deep Dive Modal */}
            <PatientProfileDeepDive
                isOpen={!!selectedPatient}
                onClose={closeDeepDive}
                patient={selectedPatient}
            />
        </div>
    );
};
