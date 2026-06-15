"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface RoleDescription {
  title: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  skills: string[];
}

const EXPERIENCES: RoleDescription[] = [
  {
    title: "Software Engineer",
    company: "Tata Consultancy Services (TCS)",
    location: "Pune, India",
    period: "March 2026 – Present",
    points: [
      "Architect and develop enterprise-grade backends using Java and Spring Boot, establishing highly scalable REST API microservices.",
      "Build dynamic and responsive frontend interfaces using Angular, integrating complex charts, dashboard data grids, and clean layout patterns.",
      "Orchestrate relational databases (PostgreSQL, MySQL), designing optimized indexing schema, complex subqueries, and Hibernate ORM mapping.",
      "Work actively in an Agile Scrum environment, participating in daily stand-ups, sprint planning, sprint retrospectives, and cross-functional design reviews.",
      "Apply secure software development lifecycle (SDLC) best practices, implementing OAuth2/JWT security tokens and writing comprehensive JUnit test configurations."
    ],
    skills: ["Java", "Spring Boot", "Angular", "REST APIs", "PostgreSQL", "Hibernate", "Agile Scrum", "JUnit"]
  },
  {
    title: "Student Intern",
    company: "AVA Soy Nutrients",
    location: "Nagpur, India",
    period: "June 2024 – August 2024",
    points: [
      "Spearheaded Frontend Development for the product showcase website, optimizing asset size to improve performance scores by 35%.",
      "Designed UI layouts using modern Figma design specifications, maintaining strict color schemes, fonts, and responsiveness guidelines.",
      "Established clear Site Architecture and Website Planning pathways, laying down reusable layout modules for easy long-term maintenance.",
      "Collaborated closely with marketing stakeholders to integrate lead capture forms, newsletter hooks, and search engine optimization (SEO) configurations."
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "UI Design", "Figma", "Site Architecture", "SEO Optimization"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden bg-black/10">
      <div className="container mx-auto px-6 z-10 w-full max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase font-mono">
              02 // Career Path
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Professional Timeline
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              My engineering track, combining enterprise backend operations with agile product creations.
            </p>
          </motion.div>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line (visible on md+) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent -translate-x-[1px] opacity-20 hidden md:block" />
          
          {/* Vertical left line (visible on mobile) */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent -translate-x-[1px] opacity-20 block md:hidden" />

          {/* Experience list */}
          <div className="flex flex-col gap-16 md:gap-24">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full"
                >
                  {/* Timeline bullet */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center -translate-x-1/2 z-10">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  </div>

                  {/* Left Side Content (TCS on Left, AVA on Right) */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:text-right" : "md:order-last md:text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 font-mono mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">{exp.title}</h3>
                      <h4 className="text-lg font-semibold text-indigo-400 mt-0.5">{exp.company}</h4>
                      
                      <div className={`flex items-center gap-1.5 text-slate-400 text-xs mt-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </div>

                      {/* Skills Tags */}
                      <div className={`flex flex-wrap gap-2 mt-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        {exp.skills.map((s, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/5 text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Side Content (Responsibilities list) */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 mt-6 md:mt-0 ${isEven ? "md:order-last" : ""}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="p-6 rounded-2xl glassmorphism border border-white/5 shadow-2xl relative overflow-hidden group glow-border"
                    >
                      <ul className="flex flex-col gap-3.5 text-slate-300 font-light text-sm">
                        {exp.points.map((p, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
