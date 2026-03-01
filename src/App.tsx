import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChildDashboard } from "./roles/child/ChildDashboard";
import { ParentDashboard } from "./roles/parent/ParentDashboard";
import { DoctorDashboard } from "./roles/doctor/DoctorDashboard";
import { LandingPage } from "./components/LandingPage";
import { fadeIn } from "./utils/animations";

type Role = "child" | "parent" | "doctor";
type View = "landing" | "role-selection" | "dashboard";

const roles = [
  {
    id: "child" as Role,
    label: "Child",
    emoji: "🌱",
    desc: "A safe, magical garden for expression",
    gradient: "from-violet-500 via-purple-500 to-pink-400",
    glow: "shadow-[0_0_60px_rgba(167,139,250,0.4)]",
    textGlow: "text-violet-300",
  },
  {
    id: "parent" as Role,
    label: "Parent",
    emoji: "🔭",
    desc: "Observations and nurturing guidance",
    gradient: "from-sky-400 via-indigo-500 to-violet-500",
    glow: "shadow-[0_0_60px_rgba(99,102,241,0.35)]",
    textGlow: "text-indigo-300",
  },
  {
    id: "doctor" as Role,
    label: "Doctor",
    emoji: "🩺",
    desc: "Clinical command and longitudinal tracking",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    glow: "shadow-[0_0_60px_rgba(59,130,246,0.4)]",
    textGlow: "text-blue-300",
  },
];

function App() {
  const [view, setView] = useState<View>("landing");
  const [role, setRole] = useState<Role | null>(null);

  const handleStart = () => setView("role-selection");
  const selectRole = (r: Role) => {
    setRole(r);
    setView("dashboard");
  };

  const backToSelection = () => {
    setView("role-selection");
    setRole(null);
  };

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && (
        <motion.div key="landing" variants={fadeIn} initial="initial" animate="animate" exit="exit">
          <LandingPage onStart={handleStart} />
        </motion.div>
      )}

      {view === "role-selection" && (
        <motion.div
          key="role-selection"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-[#060A12] flex flex-col items-center justify-center p-8 relative"
        >
          {/* Background effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">Choose your perspective</h1>
            <p className="text-white/40 text-lg">Select the dashboard you'd like to explore.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
            {roles.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectRole(r.id)}
                className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-left overflow-hidden"
              >
                <div className={`h-1.5 w-12 rounded-full mb-8 bg-gradient-to-r ${r.gradient} group-hover:w-full transition-all duration-500`} />
                <div className={`text-5xl mb-6 block w-16 h-16 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center shadow-lg border border-white/10`}>
                  {r.emoji}
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-2">{r.label}</h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">{r.desc}</p>
                <div className={`flex items-center gap-2 text-sm font-bold ${r.textGlow}`}>
                  Select Role <span className="text-lg">→</span>
                </div>
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setView("landing")}
            className="mt-12 text-white/20 hover:text-white/40 transition-colors text-sm font-bold"
          >
            Back to Home
          </button>
        </motion.div>
      )}

      {view === "dashboard" && role && (
        <motion.div key="dashboard" variants={fadeIn} initial="initial" animate="animate" exit="exit" className="relative min-h-screen">
          {role === "child" && <ChildDashboard onBack={backToSelection} />}
          {role === "parent" && <ParentDashboard onBack={backToSelection} />}
          {role === "doctor" && <DoctorDashboard onBack={backToSelection} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
