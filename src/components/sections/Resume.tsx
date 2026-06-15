"use client";

import { motion } from "framer-motion";
import { Download, FileText, CheckCircle2, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Resume() {
  const handlePrintResume = () => {
    // Elegant browser native print command trigger configured for styled resume printing
    window.print();
  };

  return (
    <section id="resume" className="relative py-24 overflow-hidden bg-[#050505] print:p-0 print:bg-white print:text-black">
      <div className="container mx-auto px-6 z-10 w-full max-w-7xl print:px-0">
        
        {/* Section Header (Hidden on print) */}
        <div className="text-center max-w-3xl mx-auto mb-16 print:hidden">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase font-mono">
              10 // Resume Hub
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Interactive CV
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              Preview, download, or trigger a printer-friendly version of my professional profile.
            </p>
          </motion.div>
        </div>

        {/* Outer Container */}
        <div className="max-w-4xl mx-auto">
          
          {/* Action Header bar (Hidden on print) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" /> interactive_cv_preview.pdf
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrintResume}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Print CV
              </button>
              <button 
                onClick={handlePrintResume}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>

          {/* Styled Digital Resume Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-2xl border border-white/5 bg-slate-950 p-8 md:p-12 shadow-2xl relative text-left select-text print:border-none print:bg-white print:shadow-none print:p-0"
          >
            {/* Header branding */}
            <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-white/10 pb-8 print:border-slate-300">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight print:text-black">Aarya Prajapat</h1>
                <p className="text-cyan-400 font-mono text-sm mt-1 print:text-blue-700">Software Engineer | Full Stack & AI Developer</p>
                <p className="text-slate-400 font-light text-sm mt-3 max-w-xl leading-relaxed print:text-slate-600">
                  Software Engineer at TCS with expertise in Java, Angular, and Spring Boot. Passionate about machine learning, data science model ensembles, and deploying high-performance applications.
                </p>
              </div>

              <div className="mt-6 md:mt-0 flex flex-col gap-2 text-xs text-slate-400 font-light font-mono print:text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-blue-700" />
                  <span>aaryaprajapat85@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 print:text-blue-700" />
                  <span>+91 9518301858</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-blue-700" />
                  <span>Pune / Nagpur, India</span>
                </div>
                <div className="flex items-center gap-2 print:hidden">
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <a href="https://github.com/Aarya31" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/Aarya31
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Content Body grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
              
              {/* Left Column (Work Experience & Projects) - Col span 8 */}
              <div className="md:col-span-8 space-y-8">
                
                {/* Work Experience */}
                <div>
                  <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-4 print:text-blue-700 print:border-b print:border-slate-300 print:pb-1">
                    WORK EXPERIENCE
                  </h3>
                  
                  <div className="space-y-6">
                    {/* TCS */}
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-bold text-white print:text-black">Software Engineer</h4>
                        <span className="text-xs font-mono text-slate-400 print:text-slate-600">Mar 2026 – Present</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-300 mt-0.5 print:text-slate-700">Tata Consultancy Services (TCS)</div>
                      <ul className="list-disc pl-5 mt-3 space-y-1.5 text-xs text-slate-400 font-light leading-relaxed print:text-slate-600">
                        <li>Develop scalable enterprise backends using Java 17, Spring Boot services, and microservice endpoints.</li>
                        <li>Build rich and responsive dashboard interfaces using Angular frameworks.</li>
                        <li>Design optimized PostgreSQL schemas, mapping database relationships via Hibernate ORM layers.</li>
                        <li>Participate in agile sprint events, contributing clean code and peer test reviews.</li>
                      </ul>
                    </div>

                    {/* AVA Soy */}
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-bold text-white print:text-black">Student Intern</h4>
                        <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jun 2024 – Aug 2024</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-300 mt-0.5 print:text-slate-700">AVA Soy Nutrients</div>
                      <ul className="list-disc pl-5 mt-3 space-y-1.5 text-xs text-slate-400 font-light leading-relaxed print:text-slate-600">
                        <li>Created the product showcase site using HTML, CSS, and vanilla JS modules.</li>
                        <li>Planned site structures, reducing client load latency by 35% using asset minification.</li>
                        <li>Wrote search engine optimization descriptors, boosting visibility by 15%.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Key Projects */}
                <div>
                  <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-4 print:text-blue-700 print:border-b print:border-slate-300 print:pb-1">
                    SELECTED PROJECTS
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-white print:text-black">
                        TaskMaster AI — Gamified Smart Productivity System
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed print:text-slate-600">
                        Full-stack Next.js app translating tasks into gaming missions (streaks, XP, Levels). Integrates NLP parsing for query classifications. (Stack: React, Next.js 15, Tailwind, Recharts, Express, SQLite).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white print:text-black">
                        GitShare — Centralized Folder Sharing Platform
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed print:text-slate-600">
                        Lightweight dashboard mapping recursive file structures, enabling folder zip compressions, user security filters, and admin spaces. (Stack: Node.js, Express, MongoDB).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white print:text-black">
                        Tea Leaves Pathology CNN Classification
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed print:text-slate-600">
                        Multi-model deep learning classifier combining MobileNet, DenseNet, and Inception layers to identify leaf diseases with 96.4% testing accuracy. (Stack: Python, PyTorch, FastAPI).
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Skills & Education) - Col span 4 */}
              <div className="md:col-span-4 space-y-8 md:border-l md:border-white/10 md:pl-6 print:border-slate-300">
                
                {/* Tech Skills */}
                <div>
                  <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-4 print:text-blue-700 print:border-b print:border-slate-300 print:pb-1">
                    SKILLS SUMMARY
                  </h3>
                  
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="font-semibold text-slate-300 block print:text-slate-800">Languages:</span>
                      <span className="text-slate-400 font-light print:text-slate-600">Java, Python, TypeScript, SQL, JavaScript, C++</span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-300 block print:text-slate-800">Frameworks:</span>
                      <span className="text-slate-400 font-light print:text-slate-600">Spring Boot, Angular, React, Next.js 15, Node.js</span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-300 block print:text-slate-800">Databases / ORMs:</span>
                      <span className="text-slate-400 font-light print:text-slate-600">PostgreSQL, MongoDB, MySQL, Hibernate, SQLite</span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-300 block print:text-slate-800">AI & Analytics:</span>
                      <span className="text-slate-400 font-light print:text-slate-600">PyTorch, CNN, MobileNet, LangChain, Pandas, NumPy</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-4 print:text-blue-700 print:border-b print:border-slate-300 print:pb-1">
                    EDUCATION
                  </h3>

                  <div className="text-xs space-y-3">
                    <div>
                      <span className="font-bold text-slate-300 block print:text-black">B.Tech CSE - Data Science</span>
                      <span className="text-slate-400 font-light print:text-slate-600">RCOEM Nagpur</span>
                      <span className="text-[10px] text-slate-500 block font-mono">2021 – 2025</span>
                    </div>
                  </div>
                </div>

                {/* Honors */}
                <div>
                  <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-4 print:text-blue-700 print:border-b print:border-slate-300 print:pb-1">
                    HONORS
                  </h3>

                  <ul className="text-xs space-y-2 text-slate-400 font-light list-disc pl-4 print:text-slate-600">
                    <li>GeeksforGeeks Campus Club Creativity Head & PR Team Leader</li>
                    <li>College Volleyball Team Player</li>
                    <li>Academic Distinction honors</li>
                  </ul>
                </div>

              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
