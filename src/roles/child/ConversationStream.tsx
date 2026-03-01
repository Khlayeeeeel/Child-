import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Mic, SmilePlus } from "lucide-react";
import { CompanionAvatar } from "../../components/ui/CompanionAvatar";
import { cn } from "../../lib/utils";

interface Message {
    id: number;
    text: string;
    from: "user" | "companion";
    time: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        from: "companion",
        text: "Hey there! I'm so glad you're here. How's your heart feeling today? 🌿",
        time: "just now",
    },
];

const companionReplies = [
    "That sounds really interesting! Tell me more 😊",
    "I hear you. It's okay to feel that way 💙",
    "You're doing amazing just by sharing that! 🌟",
    "Thanks for trusting me with that. You're brave 🌸",
    "Hmm, I'm thinking... would a breathing exercise help right now? 🌬️",
];

export const ConversationStream: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [companionState, setCompanionState] = useState<"idle" | "happy" | "thinking" | "calm">("idle");

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            from: "user",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setCompanionState("thinking");

        setTimeout(() => {
            const reply: Message = {
                id: Date.now() + 1,
                from: "companion",
                text: companionReplies[Math.floor(Math.random() * companionReplies.length)],
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, reply]);
            setCompanionState("happy");
            setTimeout(() => setCompanionState("idle"), 2000);
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-28 right-8 z-[120] w-[360px] max-h-[70vh] bg-white rounded-[2rem] shadow-xl border border-trust-blue/10 flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-5 border-b border-trust-blue/5 bg-gradient-to-r from-trust-blue/5 to-transparent">
                        <CompanionAvatar
                            mood={companionState === "happy" ? 5 : companionState === "calm" ? 4 : 3}
                            size="sm"
                        />
                        <div className="flex-1">
                            <h3 className="font-display font-bold text-sm text-text-primary">Bloom</h3>
                            <p className="text-xs text-trust-blue/70">Your safe companion ✨</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-trust-blue/10 transition-colors text-text-primary/40"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn("flex gap-2 max-w-[85%]", msg.from === "user" && "self-end flex-row-reverse")}
                            >
                                {msg.from === "companion" && (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-trust-blue to-sunset-hug shrink-0 mt-1" />
                                )}
                                <div
                                    className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.from === "companion"
                                            ? "bg-cloud-whisper text-text-primary rounded-tl-sm"
                                            : "bg-trust-blue text-white rounded-tr-sm"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {/* Typing indicator */}
                        {companionState === "thinking" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-2 items-center"
                            >
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-trust-blue to-sunset-hug shrink-0" />
                                <div className="bg-cloud-whisper px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                            className="w-1.5 h-1.5 rounded-full bg-trust-blue/60 block"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-trust-blue/5 flex gap-2 items-center">
                        <button className="p-2 text-text-primary/30 hover:text-trust-blue transition-colors">
                            <SmilePlus size={20} />
                        </button>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Tell me anything..."
                            className="flex-1 text-sm py-2 px-3 bg-cloud-whisper rounded-full focus:outline-none focus:ring-2 focus:ring-trust-blue/20"
                        />
                        <button className="p-2 text-text-primary/30 hover:text-trust-blue transition-colors">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className="w-9 h-9 rounded-full bg-trust-blue flex items-center justify-center text-white shadow-md disabled:opacity-40 hover:shadow-glow transition-all"
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
