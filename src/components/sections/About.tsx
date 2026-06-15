"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Code, Cpu, Database, Award, ArrowUpRight, GraduationCap } from "lucide-react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatCounter({ value, suffix = "", label }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (end === 0) return;
      const duration = 1500; // 1.5 seconds
      const increment = end / (duration / 16); // ~60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 rounded-xl glassmorphism border border-white/5 flex flex-col justify-center min-h-[130px] shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      <div className="text-3xl md:text-4xl font-extrabold text-white font-mono bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-slate-400 mt-2 tracking-wider uppercase font-medium">{label}</div>
    </div>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-slate-900 bg-black/40">
      <div className="container mx-auto px-6 z-10 w-full max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase font-mono">
              01 // Storytelling
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Engineering Journey
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Merging deep mathematical frameworks with full-stack capabilities to design intelligent system architectures.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Main Story (Col span 2) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 p-8 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center text-cyan-400 mb-6">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Core Philosophy</h3>
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                I believe code is not just a tool to solve problems, but an art form of structuring complex systems elegantly. My path started with an intense interest in how algorithms organize raw data. Over the years, this evolved into a robust technical suite spanning Java Enterprise backends, dynamic React-based interfaces, and scalable machine learning pipelines.
              </p>
            </div>
            <a 
              href="https://github.com/Aarya31"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 group-hover:text-white hover:underline transition-colors duration-300 w-fit cursor-pointer"
            >
              EXPLORE REPOS <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Card 2: AI Focus (Col span 1) */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-800/30 flex items-center justify-center text-indigo-400 mb-6">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI & Data Science</h3>
              <p className="text-slate-300 font-light leading-relaxed text-sm">
                Specialized in Data Science during my B.Tech, which anchored my mathematical foundation. I develop deep learning systems (MobileNet, DenseNet, CNNs) for complex image classification tasks and construct Retrieval-Augmented Generation (RAG) models for natural language interaction.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-800/20 px-3 py-2 rounded-lg w-fit">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Deep Neural Nets Expert
            </div>
          </motion.div>

          {/* Card 3: Stack Summary (Col span 1) */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-800/30 flex items-center justify-center text-purple-400 mb-6">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Engineering</h3>
              <p className="text-slate-300 font-light leading-relaxed text-sm">
                From relational database mapping (PostgreSQL, MySQL, SQLite) to Spring Boot services and microservices deployment, I prioritize clean REST API contracts, caching mechanisms, and robust backend scalability.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs text-purple-300 bg-purple-950/40 border border-purple-800/20 px-3 py-2 rounded-lg w-fit">
              <Database className="w-4 h-4 text-purple-400" />
              Spring Boot + Angular Suite
            </div>
          </motion.div>

          {/* Card 4: Quick Details (Col span 2) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 p-8 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-950/50 border border-blue-800/30 flex items-center justify-center text-blue-400 mb-6">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Academic & Technical Pedigree</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-slate-300 font-light">
                <div className="flex flex-col gap-1 border-l-2 border-cyan-500/30 pl-4">
                  <span className="font-semibold text-white">B.Tech CSE - Data Science</span>
                  <span>Shri Ramdeobaba College of Engineering and Management (RCOEM)</span>
                  <span className="text-xs text-slate-400">Nagpur, India</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-indigo-500/30 pl-4">
                  <span className="font-semibold text-white">Software Engineer at TCS</span>
                  <span>Tata Consultancy Services - Enterprise Dev Team</span>
                  <span className="text-xs text-slate-400">Java/Spring Stack & Cloud Integrations</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">#AI_ML</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">#FullStack_Java</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">#Angular</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">#Python_PyTorch</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full">
          <StatCounter value={15} suffix="+" label="Projects Completed" />
          <StatCounter value={25} suffix="+" label="Technologies Mastered" />
          <StatCounter value={6} suffix="+" label="Months of Experience" />
          <StatCounter value={580} suffix="+" label="Git Contributions" />
        </div>

      </div>
    </section>
  );
}
