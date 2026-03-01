import React from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, MessageSquare, Palette } from "lucide-react";
import { cn } from "../../lib/utils";

interface LogEntry {
    id: number;
    child: string;
    activity: string;
    summary: string;
    time: string;
    type: "mood" | "chat" | "activity";
    isVisible: boolean;
}

const logEntries: LogEntry[] = [
    {
        id: 1,
        child: "Leo",
        activity: "Mood logged",
        summary: "Felt 'Good' today after school 😊",
        time: "2h ago",
        type: "mood",
        isVisible: true,
    },
    {
        id: 2,
        child: "Maya",
        activity: "Breathing session",
        summary: "Completed 5-min calming exercise",
        time: "3h ago",
        type: "activity",
        isVisible: true,
    },
    {
        id: 3,
        child: "Leo",
        activity: "Chat with Bloom",
        summary: "Private conversation with AI companion (hidden)",
        time: "4h ago",
        type: "chat",
        isVisible: false,
    },
    {
        id: 4,
        child: "Maya",
        activity: "Color Studio",
        summary: "Spent 15 min in creative drawing session",
        time: "Yesterday",
        type: "activity",
        isVisible: true,
    },
];

const typeStyles = {
    mood: { icon: <span className="text-base">💜</span>, color: "bg-purple-50 text-purple-500" },
    chat: { icon: <MessageSquare size={14} />, color: "bg-trust-blue/10 text-trust-blue" },
    activity: { icon: <Palette size={14} />, color: "bg-sunset-hug/10 text-sunset-hug" },
};

export const ConnectionLog: React.FC = () => {
    return (
        <div className="bg-white rounded-[2rem] border border-trust-blue/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-trust-blue/5 flex items-center justify-between">
                <div>
                    <h4 className="font-display font-bold text-text-primary">Connection Log</h4>
                    <p className="text-xs text-text-primary/40 mt-0.5">Aggregated activity — summaries only</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-primary/40">
                    <Lock size={12} />
                    <span>Privacy protected</span>
                </div>
            </div>

            <div className="divide-y divide-trust-blue/5">
                {logEntries.map((entry, i) => {
                    const style = typeStyles[entry.type];
                    return (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-cloud-whisper/30 transition-colors"
                        >
                            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", style.color)}>
                                {style.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="font-bold text-xs text-trust-blue">{entry.child}</span>
                                    <span className="text-xs text-text-primary/40">·</span>
                                    <span className="text-xs font-medium text-text-primary/60">{entry.activity}</span>
                                </div>
                                <p className={cn("text-xs truncate", !entry.isVisible && "text-text-primary/30 italic")}>
                                    {entry.isVisible ? entry.summary : "🔒 Child chose to keep this private"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] text-text-primary/30">{entry.time}</span>
                                {entry.isVisible ? (
                                    <Eye size={14} className="text-text-primary/20" />
                                ) : (
                                    <EyeOff size={14} className="text-growth-end/40" />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
