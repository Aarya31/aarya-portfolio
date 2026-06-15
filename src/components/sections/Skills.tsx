"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Layout, Server, Database, BrainCircuit, LineChart, Cloud, Wrench, Shield, CheckCircle 
} from "lucide-react";

interface SkillItem {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  projects: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: SkillItem[];
  color: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: "Java", level: "Expert", projects: "TCS Enterprise Backend" },
      { name: "Python", level: "Expert", projects: "Tea Leaves, Sentiment Analysis" },
      { name: "TypeScript", level: "Advanced", projects: "Daily Task Manager" },
      { name: "JavaScript", level: "Expert", projects: "GitShare, Sorting Visualizer" },
      { name: "C++", level: "Advanced", projects: "Competitive Programming" },
      { name: "SQL", level: "Expert", projects: "Database Query Optimization" }
    ]
  },
  {
    title: "Frontend",
    icon: Layout,
    color: "from-cyan-400 to-teal-400",
    skills: [
      { name: "Angular", level: "Expert", projects: "TCS Web Modules" },
      { name: "React", level: "Expert", projects: "Portfolio, TaskMaster AI" },
      { name: "Next.js 15", level: "Expert", projects: "TaskMaster AI, Tea Leaves Portal" },
      { name: "Tailwind CSS", level: "Expert", projects: "Production Landing Pages" },
      { name: "Framer Motion", level: "Advanced", projects: "Premium UI Interactions" }
    ]
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "Spring Boot", level: "Expert", projects: "TCS Core APIs" },
      { name: "Node.js", level: "Expert", projects: "GitShare Platform" },
      { name: "Express", level: "Expert", projects: "GitShare REST Backend" },
      { name: "REST APIs", level: "Expert", projects: "Secure Microservices" },
      { name: "Hibernate", level: "Advanced", projects: "Spring Data JPA Mappings" }
    ]
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-purple-500 to-indigo-500",
    skills: [
      { name: "PostgreSQL", level: "Advanced", projects: "Enterprise DB Solutions" },
      { name: "MongoDB", level: "Expert", projects: "GitShare Cloud Database" },
      { name: "MySQL", level: "Advanced", projects: "Relational Schema Design" },
      { name: "SQLite", level: "Advanced", projects: "Daily Task Manager Local" },
      { name: "Prisma ORM", level: "Advanced", projects: "Next.js DB Client Connection" }
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    color: "from-pink-500 to-rose-400",
    skills: [
      { name: "Deep Learning", level: "Advanced", projects: "Tea Leaves Model Ensemble" },
      { name: "MobileNet / DenseNet", level: "Advanced", projects: "Tea Leaves classification" },
      { name: "CNNs / Inception", level: "Advanced", projects: "Selfie Recognition" },
      { name: "LangChain", level: "Advanced", projects: "PDF Chat Application" },
      { name: "OpenAI API", level: "Advanced", projects: "LLM Chat Assistant integration" }
    ]
  },
  {
    title: "Data Analytics",
    icon: LineChart,
    color: "from-emerald-400 to-teal-500",
    skills: [
      { name: "Pandas & NumPy", level: "Advanced", projects: "EV Data Analysis" },
      { name: "Scikit-Learn", level: "Advanced", projects: "Sentiment Analysis Model" },
      { name: "Matplotlib & Seaborn", level: "Advanced", projects: "Jupyter Analytical Charts" },
      { name: "Recharts", level: "Advanced", projects: "TaskMaster Productivity Graph" },
      { name: "Jupyter Notebook", level: "Expert", projects: "AI HealthMeter Research" }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-sky-500 to-blue-400",
    skills: [
      { name: "Vercel", level: "Expert", projects: "Frontend deployments" },
      { name: "Docker", level: "Advanced", projects: "IPL platform containerization" },
      { name: "Git & GitHub", level: "Expert", projects: "Version Control, Team Collaboration" },
      { name: "GitHub Actions", level: "Advanced", projects: "CI/CD automated testing" }
    ]
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    color: "from-amber-400 to-orange-500",
    skills: [
      { name: "Figma", level: "Advanced", projects: "UI Wireframing & Prototyping" },
      { name: "Salesforce CRM", level: "Intermediate", projects: "Academic CRM Coursework" },
      { name: "Postman", level: "Expert", projects: "REST API Endpoint Validation" },
      { name: "Agile / Scrum", level: "Expert", projects: "TCS Enterprise Sprint Delivery" }
    ]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="skills" className="relative py-24 overflow-hidden border-t border-slate-900 bg-black/30">
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
              03 // Technical Arsenal
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Skills Spectrum
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Hover over cards to view expertise details and real-world project applications.
            </p>
          </motion.div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-5xl mx-auto">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border hover:scale-[1.02] cursor-pointer ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 glassmorphism"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Cards Grid */}
        <div className="max-w-5xl mx-auto min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SKILL_CATEGORIES[activeCategory].skills.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl glassmorphism border border-white/5 shadow-2xl relative overflow-hidden group hover:shadow-[0_10px_30px_rgba(6,182,212,0.08)] glow-border"
                >
                  {/* Glowing background gradient spot on hover */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${SKILL_CATEGORIES[activeCategory].color} opacity-[0.02] group-hover:opacity-[0.15] blur-xl transition-all duration-500 pointer-events-none`} />

                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded-full">
                      {skill.level}
                    </span>
                  </div>

                  <div className="space-y-1.5 mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Applied In:</span>
                    <span className="text-xs text-slate-300 font-light block line-clamp-2">
                      {skill.projects}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-end">
                    <CheckCircle className={`w-4 h-4 text-cyan-500 opacity-30 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
