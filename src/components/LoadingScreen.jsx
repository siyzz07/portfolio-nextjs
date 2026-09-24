"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let currentProgress = 0;
    
    // Fast, smooth progress timer
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 6;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        }, 150);
      } else {
        setProgress(currentProgress);
      }
    }, 30);

    // Absolute failsafe fallback: Force dismiss after 1.2s max on slow/throttled mobile devices
    const failsafe = setTimeout(() => {
      clearInterval(interval);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center p-4 overflow-hidden select-none"
      onClick={() => onCompleteRef.current?.()}
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xs w-full">
        {/* Animated Glowing Monogram */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-400 border-l-indigo-400 opacity-60"
          />
          <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-black tracking-tight text-white">
              S<span className="text-indigo-400">S</span>
            </span>
          </div>
        </div>

        {/* Text and Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-3 px-1">
          <span className="tracking-widest uppercase text-[11px] text-slate-300">
            Loading Experience
          </span>
          <span className="font-bold text-indigo-400">{progress}%</span>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-6 text-[11px] font-mono text-slate-400 text-center tracking-wide">
          Shibin Siyad • Full Stack Developer
        </p>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
