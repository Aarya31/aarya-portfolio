"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Download, ArrowRight, FileText } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TYPING_ROLES = [
  "Software Engineer",
  "AI/ML Enthusiast",
  "Full-Stack Developer",
  "Problem Solver"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = TYPING_ROLES[roleIndex];
    
    if (!isDeleting) {
      if (currentText !== currentRole) {
        timer = setTimeout(() => {
          setCurrentText(currentRole.substring(0, currentText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(currentRole.substring(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
      }
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full max-w-7xl">
        
        {/* RIGHT SIDE (Text & Bio Info) */}
        <div className="flex-1 text-left max-w-2xl">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl font-medium text-slate-400 tracking-wide font-mono"
          >
            Hi, I'm
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight mt-1 text-white"
          >
            Aarya Prajapat
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-10 mt-3 flex items-center"
          >
            <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              {currentText}
            </span>
            <span className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-cyan-400 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed font-light"
          >
            Software Engineer passionate about building scalable software solutions, intelligent AI-powered applications, and modern web experiences. Experienced in Full Stack Development, Machine Learning, Data Analytics, and solving real-world business challenges through technology.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <a 
              href="#projects"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]"
            >
              View Projects
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a 
              href="#resume"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 border border-slate-700 rounded-lg bg-slate-900/40 hover:bg-slate-800/80 hover:text-white hover:border-slate-600 glassmorphism hover:scale-[1.02]"
            >
              Download Resume
              <Download className="w-4 h-4 ml-2" />
            </a>

            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:text-white hover:underline hover:scale-[1.02]"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex items-center gap-6"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Connect:</span>
            
            <a 
              href="https://github.com/Aarya31" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-300 p-2 hover:bg-slate-950 rounded-full border border-transparent hover:border-slate-800/80 glassmorphism hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a 
              href="https://www.linkedin.com/in/aarya-prajapat/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 p-2 hover:bg-slate-950 rounded-full border border-transparent hover:border-slate-800/80 glassmorphism hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a 
              href="mailto:aaryaprajapat85@gmail.com"
              className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 p-2 hover:bg-slate-950 rounded-full border border-transparent hover:border-slate-800/80 glassmorphism hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* LEFT SIDE (Portrait Headshot) */}
        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-[340px] md:max-w-[450px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-72 h-72 md:w-96 md:h-96"
          >
            {/* Glowing Gradient Background Ring */}
            <div className="absolute inset-[-15px] rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600 opacity-20 blur-xl animate-pulse-slow pointer-events-none" />

            {/* Orbiting Tech Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] rounded-full border border-dashed border-cyan-500/30 pointer-events-none"
            />
            
            {/* Main Image Container */}
            <div className="w-full h-full rounded-2xl overflow-hidden glassmorphism p-3 relative group">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-950">
                <Image
                  src="/portrait.jpg"
                  alt="Aarya Prajapat Portrait"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 288px, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-80" />
              </div>
              
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glassmorphism border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Aarya Prajapat</h4>
                  <p className="text-[11px] text-cyan-400 font-mono">Software Engineer @ TCS</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
