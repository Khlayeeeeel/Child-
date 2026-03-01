import React from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, Heart, Plus, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../utils/animations";

export const ActionConsole: React.FC = () => {
    return (
        <div className="space-y-6">
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Quick Connect Card */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <MessageCircle size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Therapist Chat</span>
                    </div>
                    <h4 className="font-display font-black text-gray-900 mb-2">Message Dr. Amara</h4>
                    <p className="text-gray-400 text-xs mb-6">Response time: ~2 hours</p>
                    <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all">
                        Send Message
                    </button>
                </motion.div>

                {/* Schedule Card */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                            <Calendar size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sessions</span>
                    </div>
                    <h4 className="font-display font-black text-gray-900 mb-2">Book Follow-up</h4>
                    <p className="text-gray-400 text-xs mb-6">Next available: Tomorrow 10:00</p>
                    <button className="w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all">
                        Open Scheduler
                    </button>
                </motion.div>
            </motion.div>

            {/* Nurturing Tasks */}
            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="font-display font-black text-gray-900">Nurturing Journey</h4>
                        <p className="text-gray-400 text-xs">Recommended actions for this week</p>
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="space-y-3">
                    {[
                        { id: 1, title: "Garden Observation", done: true, time: "2m", color: "indigo" },
                        { id: 2, title: "Emotion Mirroring Session", done: false, time: "15m", color: "pink" },
                        { id: 3, title: "Read: Anxiety Metaphors", done: false, time: "5m", color: "sky" },
                    ].map((task) => (
                        <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-50 group cursor-pointer hover:border-indigo-100 transition-all">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${task.done ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-gray-100 text-gray-300'}`}>
                                <Heart size={14} fill={task.done ? "currentColor" : "none"} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-xs font-bold leading-none mb-1 ${task.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                    {task.title}
                                </p>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{task.time} task</span>
                            </div>
                            <ChevronRight size={14} className="text-gray-200 group-hover:text-indigo-400 transition-colors" />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
