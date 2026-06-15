"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

interface Course {
  name: string;
  focus: string;
}

const COURSES: Course[] = [
  { name: "Machine Learning", focus: "Supervised/Unsupervised models, regression, feature selection, sklearn" },
  { name: "Deep Learning", focus: "Neural networks, Convolutional nets (CNN), optimization algorithms, PyTorch" },
  { name: "Business Intelligence", focus: "Data warehousing patterns, ETL frameworks, analytical pipelines" },
  { name: "Data Warehousing", focus: "Dimensional modeling, star/snowflake schema setups, OLAP operations" },
  { name: "Salesforce CRM", focus: "Customer relation workflows, cloud modules, platform configurations" }
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 overflow-hidden border-t border-slate-900 bg-black/30">
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
              07 // Academic Foundation
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Education
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Academic pedigree and specialized data science course structures.
            </p>
          </motion.div>
        </div>

        {/* Education grid card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Degree card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl glassmorphism border border-white/5 bg-slate-950/40 relative flex flex-col justify-between h-full shadow-2xl glow-border"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center text-cyan-400 mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                
                <span className="px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/10 rounded">
                  Bachelor of Technology
                </span>
                
                <h3 className="text-2xl font-bold text-white mt-4 tracking-tight leading-snug">
                  Computer Science & Engineering (Data Science)
                </h3>
                
                <h4 className="text-base font-semibold text-slate-300 mt-2">
                  Shri Ramdeobaba College of Engineering and Management (RCOEM)
                </h4>

                <div className="flex flex-col gap-2 mt-6 text-sm text-slate-400 font-light">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>Period: 2021 – 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Nagpur, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-500">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>FIRST-CLASS DISTINCTION</span>
              </div>
            </motion.div>
          </div>

          {/* Coursework details */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="p-8 rounded-2xl glassmorphism border border-white/5 bg-slate-950/20 shadow-2xl h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5 mb-6">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Key Coursework Focus
                </h3>

                <div className="flex flex-col gap-4">
                  {COURSES.map((course, cIdx) => (
                    <div 
                      key={cIdx}
                      className="p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-2"
                    >
                      <span className="text-sm font-semibold text-white tracking-wide shrink-0">
                        {course.name}
                      </span>
                      <span className="text-xs text-slate-400 font-light md:text-right">
                        {course.focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-xs font-mono text-slate-500 text-right">
                COURSES VERIFIED BY UNIVERSITY SYLLABUS
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
