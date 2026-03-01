import React from "react";
import { motion } from "framer-motion";

const family = [
    { name: "Leo", age: "8y", mood: 4, moodEmoji: "😊", color: "#4F46E5", status: "Good" },
    { name: "Maya", age: "12y", mood: 5, moodEmoji: "🌟", color: "#0EA5E9", status: "Great" },
    { name: "You", age: "Parent", mood: 3, moodEmoji: "🙂", color: "#10B981", status: "Okay", isParent: true },
];

const moodBg: Record<number, string> = {
    1: "#F43F5E", 2: "#F59E0B", 3: "#EAB308", 4: "#4F46E5", 5: "#10B981",
};

export const FamilyConstellation: React.FC = () => {
    return (
        <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
            {family.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-display font-black text-white shrink-0 relative" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}aa)` }}>
                        {member.name[0]}
                        {/* Mood indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px]" style={{ background: moodBg[member.mood] ?? "#ccc" }}>
                            {member.moodEmoji}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-display font-black text-gray-900 text-sm">{member.name}</span>
                            {member.isParent && <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-500">You</span>}
                            <span className="text-[11px] text-gray-300">· {member.age}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 rounded-full overflow-hidden bg-gray-100">
                                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(member.mood / 5) * 100}%`, background: moodBg[member.mood] ?? "#ccc" }} />
                            </div>
                            <span className="text-[11px] font-bold text-gray-400">{member.status}</span>
                        </div>
                    </div>

                    <div className="text-gray-200 group-hover:text-indigo-400 transition-colors text-lg">→</div>
                </motion.div>
            ))}
        </div>
    );
};
