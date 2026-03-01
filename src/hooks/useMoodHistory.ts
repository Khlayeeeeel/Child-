import { useState, useCallback } from "react";

export interface MoodEntry {
    value: number;
    label: string;
    timestamp: number;
    note?: string;
}

const STORAGE_KEY = "mindbloom_mood_history";

export function useMoodHistory() {
    const [history, setHistory] = useState<MoodEntry[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const addEntry = useCallback((entry: Omit<MoodEntry, "timestamp">) => {
        const newEntry: MoodEntry = { ...entry, timestamp: Date.now() };
        setHistory((prev) => {
            const updated = [newEntry, ...prev].slice(0, 100); // keep last 100
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const todayEntries = history.filter(
        (e) => new Date(e.timestamp).toDateString() === new Date().toDateString()
    );

    const weekStreak = (() => {
        const days = new Set(
            history.map((e) => new Date(e.timestamp).toDateString())
        );
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            if (days.has(d.toDateString())) streak++;
            else break;
        }
        return streak;
    })();

    return { history, addEntry, todayEntries, weekStreak };
}
