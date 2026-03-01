import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Palette, X, RotateCcw } from "lucide-react";

interface ColorStudioProps {
    onClose: () => void;
}

export const ColorStudio: React.FC<ColorStudioProps> = ({ onClose }) => {
    const [selectedColor, setSelectedColor] = useState("#A78BFA");
    const [brushSize, setBrushSize] = useState(12);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const colors = [
        "#F9A8D4", "#A78BFA", "#6EE7B7", "#FCD34D", "#F43F5E", "#3B82F6", "#FFFFFF"
    ];

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext("2d");
        ctx?.beginPath();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = selectedColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-bloom-bg flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                        <Palette size={20} />
                    </div>
                    <h3 className="font-display font-black text-xl text-white">Color Studio</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
                {/* Toolbar */}
                <div className="lg:w-24 bg-white/5 lg:border-r border-white/10 p-6 flex lg:flex-col items-center justify-center gap-6 z-20 order-2 lg:order-1">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                        >
                            <div className="w-full h-full rounded-full" style={{ background: color }} />
                        </button>
                    ))}
                    <div className="h-px w-8 bg-white/10 my-2 hidden lg:block" />
                    <button
                        onClick={clearCanvas}
                        className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-white/40 transition-all"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-[#1A1030] relative overflow-hidden order-1 lg:order-2">
                    {/* Ambient grid background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                    <canvas
                        ref={canvasRef}
                        width={1200}
                        height={800}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-full cursor-crosshair touch-none"
                    />
                </div>

                {/* Floating Brush Size Controller */}
                <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <input
                        type="range" min="2" max="50" value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        className="w-32 accent-violet-500"
                    />
                    <div className="w-6 h-6 rounded-full bg-white/40" />
                </div>
            </div>
        </motion.div>
    );
};
