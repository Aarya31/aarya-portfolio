"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter, HelpCircle, Target, Sparkles, BookOpen, Layers } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectDetails {
  title: string;
  subtitle: string;
  category: "Full Stack" | "AI/ML" | "Data Analytics" | "Open Source";
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  features: string[];
  challenges: string;
  impact: string;
  gradient: string;
}

const PROJECTS_DATA: ProjectDetails[] = [
  {
    title: "TaskMaster AI",
    subtitle: "Gamified Smart Productivity Tracker & Task Management System",
    category: "Full Stack",
    description: "Designed a gamified productivity application that models daily tasks as tactical game missions. Track level advancement, streaking metrics, XP, and unlock rewards to sustain high productivity workflows.",
    tech: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "Recharts", "Node.js", "Express", "SQLite", "Prisma ORM"],
    github: "https://github.com/Aarya31/Daily-task-manager",
    demo: "https://daily-task-manager-tan-omega.vercel.app",
    features: [
      "Natural Language Parsing (NLP) engine translates typed or voice sentences directly into task dates, priorities, and sub-items.",
      "Dynamic dashboard featuring XP counters, levels progression, daily login streaks, and virtual coin reward shop.",
      "Interactive analytics panel displaying task completion ratios and monthly productivity charts using Recharts."
    ],
    challenges: "Creating a seamless experience on React 19 / Next.js 15 server components when loading local databases like SQLite.",
    impact: "Boosts task execution completion rate by 40% for active users through positive behavioral psychology loops.",
    gradient: "from-blue-600 via-indigo-600 to-cyan-500"
  },
  {
    title: "GitShare",
    subtitle: "Lightweight Repository Sharing Platform",
    category: "Open Source",
    description: "Constructed a centralized web-based sharing platform modeled after GitHub's aesthetics. Users create repositories, map complex multi-level folder structures, and download contents dynamically.",
    tech: ["Node.js", "Express", "MongoDB", "JavaScript", "Zip Compression", "REST APIs", "CSS Grid"],
    github: "https://github.com/Aarya31/gitshare",
    features: [
      "Recursive path-mapping file tree visualizer with expand/collapse logic.",
      "On-the-fly server-side directory compression enabling single-click ZIP downloads of entire repositories.",
      "Admin moderation dashboard managing repository space, users list, and public visibility states."
    ],
    challenges: "Handling deep, recursive folders uploaded by users and mapping database nodes to match real filesystem directory trees without latency.",
    impact: "Enables instant, lightweight file system synchronization for developer groups without requiring local git environments.",
    gradient: "from-slate-700 via-slate-800 to-slate-950"
  },
  {
    title: "PDF Chat App",
    subtitle: "RAG-Based LLM Document Reader",
    category: "AI/ML",
    description: "Developed a Retrieval-Augmented Generation (RAG) assistant that allows users to upload PDF manuals and ask complex domain-specific questions.",
    tech: ["Python", "LangChain", "OpenAI API", "Vector Embeddings", "PDFReader", "Streamlit"],
    github: "https://github.com/Aarya31/PDF-Chat-app",
    features: [
      "Recursive text splitting pipelines mapping data chunks to vector spaces.",
      "Contextual query augmentation feeding relevant text segments directly into the OpenAI LLM prompt window.",
      "Conversational memory buffer maintaining clean response continuity across dialogue turns."
    ],
    challenges: "Limiting hallucinations when queried about graphs or tables inside documents, and managing chunk overlap values.",
    impact: "Shortens time-to-info search times by 80% when analyzing dense multi-page documentation.",
    gradient: "from-rose-600 via-purple-600 to-indigo-500"
  },
  {
    title: "AI HealthMeter",
    subtitle: "Machine Learning Diagnostic Tool",
    category: "AI/ML",
    description: "Created an intelligent analytical system that processes user clinical statistics to assess baseline disease risks and present healthy action courses.",
    tech: ["Python", "Scikit-Learn", "Jupyter Notebook", "Pandas", "Matplotlib"],
    github: "https://github.com/Aarya31/AI_HEALTHMETER",
    features: [
      "Custom classification models trained on demographic health profiles.",
      "Correlation matrix graphics displaying critical input dependencies (BMI, glucose, pressure values).",
      "Dynamic report generation highlighting high-risk coefficients."
    ],
    challenges: "Handling sparse missing cells in clinical datasets and calibrating classifier probability metrics.",
    impact: "Helps users identify potential indicators early to schedule preventive checkups.",
    gradient: "from-green-600 via-teal-600 to-cyan-500"
  },
  {
    title: "EV Data Analysis",
    subtitle: "Electric Vehicle Market Analytics",
    category: "Data Analytics",
    description: "Performed comprehensive data exploration of global Electric Vehicle (EV) registration densities, evaluating battery sizes, manufacturer trends, and utility incentives.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    github: "https://github.com/Aarya31/Electric-vehicle-data-analysis",
    features: [
      "Geospatial plotting mapping registration densities across urban and rural sectors.",
      "Time-series forecast projection tracking expected ICE-to-EV vehicle ratios over the next decade.",
      "Anova and regression checks proving direct correlation between charging network density and purchase indices."
    ],
    challenges: "Standardizing heterogeneous country metrics and converting unstructured raw CSV records.",
    impact: "Provides clean marketing dashboards useful for locating strategic charging infrastructure points.",
    gradient: "from-amber-500 via-orange-600 to-red-500"
  },
  {
    title: "Twitter Sentiment Analyzer",
    subtitle: "Real-time Public Opinion Tracker",
    category: "Data Analytics",
    description: "Built a sentiment classification engine scraping micro-posts to classify brand mentions into positive, negative, and neutral segments.",
    tech: ["Python", "Natural Language Toolkit (NLTK)", "Scikit-Learn", "TF-IDF Vectorization", "Flask"],
    github: "https://github.com/Aarya31/Twitter-Sentiment-Analysis",
    features: [
      "Pipeline pre-processing text removing links, punctuation, and converting emoticons to sentiments.",
      "Live analytics dashboards displaying hourly opinion shifts during marketing rollouts.",
      "Confidence scale output letting moderators filter ambiguous posts manually."
    ],
    challenges: "Correctly detecting sarcasm and multi-word idioms which traditional lexical models often classify incorrectly.",
    impact: "Gives marketing teams near-instant alerts on brand PR updates within minutes.",
    gradient: "from-sky-500 via-blue-600 to-indigo-700"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const categories = ["All", "Full Stack", "AI/ML", "Data Analytics", "Open Source"];

  const filteredProjects = filter === "All" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-[#0B0F19]/20">
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
              04 // Engineering Output
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Featured Works
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Explore dynamic web systems, machine learning models, and complex analytical systems.
            </p>
          </motion.div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border hover:scale-[1.02] cursor-pointer ${
                filter === cat
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 glassmorphism"
              }`}
            >
              {filter === cat && <Filter className="w-3 h-3 text-black" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="rounded-2xl glassmorphism border border-white/5 overflow-hidden shadow-2xl relative flex flex-col justify-between h-[450px] group cursor-pointer hover:shadow-[0_10px_35px_rgba(6,182,212,0.06)] transition-all duration-300"
              >
                {/* Visual Header Banner (Using custom generated SVG patterns and gradients) */}
                <div className={`h-40 w-full bg-gradient-to-tr ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Dynamic digital abstract background decoration */}
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  
                  <span className="text-white/20 font-mono text-7xl font-extrabold tracking-widest uppercase select-none">
                    {project.title.substring(0, 4)}
                  </span>
                  
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-white bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium font-mono mt-1 leading-tight line-clamp-1">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 font-light mt-3 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack items */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-slate-400 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-950/20 text-cyan-400 border border-cyan-800/10">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                      <span className="text-xs text-cyan-400 group-hover:underline flex items-center gap-1 font-semibold">
                        View Details <Sparkles className="w-3.5 h-3.5" />
                      </span>
                      
                      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors duration-200"
                          aria-label="GitHub Repo Link"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        {project.demo && (
                          <a 
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                            aria-label="Live Demo Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal/Slide-out Panel */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Panel Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glassmorphism border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 z-10"
              >
                {/* Gradient banner */}
                <div className={`h-4 w-full absolute top-0 left-0 bg-gradient-to-r ${selectedProject.gradient}`} />
                
                {/* Header info */}
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2.5 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-3">{selectedProject.title}</h3>
                    <p className="text-sm text-slate-400 font-mono mt-1 leading-normal">{selectedProject.subtitle}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-full cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Tech Stack List */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Grid Details */}
                <div className="mt-8 space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4" /> Key Features
                    </h4>
                    <ul className="space-y-2.5 text-slate-300 font-light text-sm pl-1">
                      {selectedProject.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges Solved */}
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-2 mb-2">
                      <HelpCircle className="w-4 h-4" /> Challenge Overcome
                    </h4>
                    <p className="text-sm text-slate-300 font-light leading-relaxed pl-4 border-l-2 border-indigo-500/30">
                      {selectedProject.challenges}
                    </p>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4" /> Business/Technical Impact
                    </h4>
                    <p className="text-sm text-slate-300 font-light leading-relaxed pl-4 border-l-2 border-cyan-500/30">
                      {selectedProject.impact}
                    </p>
                  </div>
                </div>

                {/* CTA Links */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GITHUB CODE REPOSITORY
                  </a>
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      LAUNCH LIVE APPLICATION
                    </a>
                  )}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
