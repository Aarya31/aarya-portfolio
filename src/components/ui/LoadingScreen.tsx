"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto terminate loading after 2.6s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Animated Matrix Grid Overlay */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Futuristic Scanning line */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40 scanning-line pointer-events-none" />

          {/* Ambient center radial glow */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Particle rings / scanner */}
          <div className="relative flex items-center justify-center w-40 h-40 mb-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed border-indigo-500/20"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 opacity-20 blur-sm"
            />
            {/* Pulsing center dot */}
            <div className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </div>

          {/* Typing Name and Title */}
          <div className="text-center z-10 font-sans px-4">
            <motion.h1 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-extrabold tracking-widest text-white uppercase"
            >
              Aarya Prajapat
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-2 mt-4 text-xs md:text-sm tracking-[0.3em] font-medium text-cyan-400 uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Software Engineer
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </motion.div>
          </div>

          {/* Loading progress bar */}
          <div className="absolute bottom-20 w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-cyan-500 to-indigo-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
