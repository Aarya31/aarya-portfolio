"use client";

import { motion } from "framer-motion";
import { Award, Users, Trophy, GraduationCap, ArrowUpRight } from "lucide-react";

interface AchievementCard {
  title: string;
  category: "Leadership" | "Sports" | "Academic";
  detail: string;
  description: string;
  icon: any;
  color: string;
  glow: string;
}

const ACHIEVEMENTS_DATA: AchievementCard[] = [
  {
    title: "Creativity Head & PR Team",
    category: "Leadership",
    detail: "GeeksforGeeks (GFG) Campus Club",
    description: "Organized engineering hackathons, managed public relation campaigns, and oversaw all creative visual deliverables, expanding active club membership by 60%.",
    icon: Users,
    color: "text-blue-400 bg-blue-950/40 border-blue-900/30",
    glow: "rgba(37, 99, 235, 0.08)"
  },
  {
    title: "Inter-College Volleyball Player",
    category: "Sports",
    detail: "Varsity Sports Division",
    description: "Represented the college team in multiple regional inter-university volleyball tournaments, securing podium finishes and cultivating teamwork resilience.",
    icon: Trophy,
    color: "text-amber-400 bg-amber-950/40 border-amber-900/30",
    glow: "rgba(245, 158, 11, 0.08)"
  },
  {
    title: "B.Tech CSE - Data Science",
    category: "Academic",
    detail: "First-Class Academic Standing",
    description: "Maintained a strong GPA with consistent honors, demonstrating conceptual depth in advanced mathematical coursework, deep learning research, and data structures.",
    icon: GraduationCap,
    color: "text-purple-400 bg-purple-950/40 border-purple-900/30",
    glow: "rgba(139, 92, 246, 0.08)"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 overflow-hidden border-t border-slate-900 bg-black/10">
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
              06 // Honors & Contributions
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Achievements
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Leadership responsibilities, athletic contributions, and academic credentials.
            </p>
          </motion.div>
        </div>

        {/* Cards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ACHIEVEMENTS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl glassmorphism border border-white/5 relative overflow-hidden group shadow-2xl transition-all duration-300"
                style={{
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2), 0 0 40px ${item.glow}`
                }}
              >
                {/* Glowing hover dot */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-500 pointer-events-none" />

                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/20 border border-cyan-800/10">
                    {item.category}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <h4 className="text-sm font-semibold text-slate-400 font-mono mb-4">
                  {item.detail}
                </h4>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center justify-end text-xs font-mono text-slate-500 group-hover:text-white transition-colors duration-300">
                  VERIFIED <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
