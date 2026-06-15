"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, AlertTriangle, Lightbulb, BarChart4, Target, Database, ExternalLink } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Spotlight() {
  const [activeTab, setActiveTab] = useState<"problem" | "approach" | "models" | "results" | "impact">("problem");

  const tabContent = {
    problem: {
      title: "Agricultural Crop Loss Due to Delayed Pathology Detection",
      icon: AlertTriangle,
      color: "text-red-400 bg-red-950/30 border-red-900/30",
      content: [
        "Fungal leaf diseases (e.g., Brown Blight, Algal Leaf Spot) spread rapidly across tea plantations, causing up to 45% crop degradation if untreated.",
        "Manual inspection by pathologists is slow, expensive, and error-prone, especially in vast terraced tea gardens.",
        "Early diagnostics are critical: detecting disease spots at early stages (with less than 5% leaf coverage) allows targeting treatments localized to specific bush clusters rather than spraying entire crops."
      ]
    },
    approach: {
      title: "Edge-Enabled Multi-Model Deep Learning Pipeline",
      icon: Lightbulb,
      color: "text-amber-400 bg-amber-950/30 border-amber-900/30",
      content: [
        "We designed a multi-layer Convolutional Neural Network (CNN) pipeline that takes raw leaf images, performs adaptive preprocessing (histogram equalization + crop resizing), and feeds them into an ensemble classifier.",
        "To enable deployment on mobile devices carried by field workers, we coupled edge-optimized feature extractors with a cloud validation backend.",
        "Data augmentation techniques (rotations, color jitters, perspective shifts) were applied to build model robustness against varying sunlight and shadow conditions."
      ]
    },
    models: {
      title: "Ensemble Architecture: MobileNet + DenseNet + Inception",
      icon: BrainCircuit,
      color: "text-cyan-400 bg-cyan-950/30 border-cyan-900/30",
      content: [
        "MobileNetV2: Serves as the high-speed edge feature extractor. Leverages depthwise separable convolutions to run in less than 50ms on mobile devices.",
        "DenseNet121: Encourages feature reuse by connecting all layers directly with each other. Excels at detecting subtle gradient patterns inside leaf spots.",
        "InceptionV3: Uses multi-scale convolution kernels (1x1, 3x3, 5x5) in parallel. Captures both tiny, focal lesions and large-scale leaf spot regions.",
        "Weighted Softmax Average: An ensemble layer weights predictions dynamically, mitigating individual network vulnerabilities."
      ]
    },
    results: {
      title: "Industry-Grade Validation & Inference Accuracy",
      icon: BarChart4,
      color: "text-emerald-400 bg-emerald-950/30 border-emerald-900/30",
      content: [
        "96.4% Categorization Accuracy: Achieved on standard tea pathology datasets (covering 6 separate leaf diseases and healthy samples).",
        "Sub-15ms Server Inference: Python PyTorch backend hosted via FastAPI delivers predictions in milliseconds.",
        "False Positive Rate: Reduced to less than 2.8%, ensuring farmers do not misapply expensive chemical fertilizers/fungicides."
      ]
    },
    impact: {
      title: "Empowering Rural Farms & Safeguarding Yields",
      icon: Target,
      color: "text-purple-400 bg-purple-950/30 border-purple-900/30",
      content: [
        "Early Intervention: Minimizes pesticide overuse by localized targeted spraying, lowering chemical costs by 30%.",
        "Empowerment: Non-expert farmers diagnose issues within seconds by snapping a phone photo.",
        "Sustainable Agriculture: Supports regional crop surveillance, flagging disease outbreaks to municipal councils in real-time."
      ]
    }
  };

  return (
    <section id="spotlight" className="relative py-24 overflow-hidden border-t border-slate-900 bg-black/50">
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
              05 // Deep Learning Spotlight
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Tea Leaves Pathology AI
            </h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
              An interactive dive into the neural architectures built to safeguard tea crop yields.
            </p>
          </motion.div>
        </div>

        {/* Outer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Left Side: Technical Architecture Visualizer */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl glassmorphism border border-white/5 bg-slate-950/40 relative flex flex-col items-center justify-center min-h-[400px] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">System Architecture Diagram</span>
              </div>

              {/* Styled SVG Architecture Diagram */}
              <svg viewBox="0 0 400 340" className="w-full max-w-[360px] h-auto mt-6 text-slate-400 font-sans font-medium select-none">
                {/* Image Input Node */}
                <rect x="145" y="10" width="110" height="36" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <text x="200" y="32" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Input Image (Leaf)</text>

                {/* Arrow down */}
                <line x1="200" y1="46" x2="200" y2="70" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Preprocessing node */}
                <rect x="135" y="70" width="130" height="36" rx="6" fill="#0f172a" stroke="#0891b2" strokeWidth="1.5" />
                <text x="200" y="88" textAnchor="middle" fill="#38bdf8" fontSize="10">Adaptive Contrast & Resize</text>

                {/* Splits arrows */}
                <path d="M 200 106 L 200 120 L 70 120 L 70 140" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <path d="M 200 106 L 200 140" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                <path d="M 200 106 L 200 120 L 330 120 L 330 140" fill="none" stroke="#ec4899" strokeWidth="1.5" />

                {/* Ensemble Columns */}
                {/* 1. MobileNet */}
                <rect x="20" y="140" width="100" height="42" rx="6" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="70" y="158" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">MobileNetV2</text>
                <text x="70" y="172" textAnchor="middle" fill="#64748b" fontSize="8">Depthwise (Edge)</text>

                {/* 2. DenseNet */}
                <rect x="150" y="140" width="100" height="42" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="200" y="158" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">DenseNet121</text>
                <text x="200" y="172" textAnchor="middle" fill="#64748b" fontSize="8">Feature Reuse</text>

                {/* 3. Inception */}
                <rect x="280" y="140" width="100" height="42" rx="6" fill="#500725" stroke="#db2777" strokeWidth="1.5" />
                <text x="330" y="158" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">InceptionV3</text>
                <text x="330" y="172" textAnchor="middle" fill="#64748b" fontSize="8">Multi-scale Kernels</text>

                {/* Combine arrows */}
                <path d="M 70 182 L 70 205 L 200 205" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                <path d="M 200 182 L 200 220" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                <path d="M 330 182 L 330 205 L 200 205" fill="none" stroke="#db2777" strokeWidth="1.5" />

                {/* Ensemble layer node */}
                <rect x="135" y="220" width="130" height="36" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="200" y="238" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Softmax Average Layer</text>
                <text x="200" y="249" textAnchor="middle" fill="#64748b" fontSize="8">Dynamic Weights</text>

                {/* Arrow down */}
                <line x1="200" y1="256" x2="200" y2="280" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Output Classification node */}
                <rect x="135" y="280" width="130" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="200" y="298" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Diagnostic Output</text>
                <text x="200" y="309" textAnchor="middle" fill="#a7f3d0" fontSize="8">96.4% Acc Classification</text>
              </svg>
            </motion.div>
          </div>

          {/* Right Side: Tab Details content */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Tabs button list */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {(Object.keys(tabContent) as Array<keyof typeof tabContent>).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      isActive 
                        ? "bg-white text-black border-white" 
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white glassmorphism"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tab Panel */}
            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 p-6 md:p-8 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const IconComponent = tabContent[activeTab].icon;
                        return (
                          <div className={`p-2.5 rounded-lg border ${tabContent[activeTab].color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                        );
                      })()}
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {tabContent[activeTab].title}
                      </h3>
                    </div>

                    {/* Bullet List */}
                    <ul className="space-y-4 text-slate-300 font-light text-sm md:text-base">
                      {tabContent[activeTab].content.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href="https://github.com/Aarya31/frontend_tealeaves"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-slate-800 bg-slate-950/40 hover:bg-slate-900 hover:text-white transition-all cursor-pointer glassmorphism"
                      >
                        <Github className="w-3.5 h-3.5" /> Code Repo
                      </a>
                      <a 
                        href="https://frontend-tealeaves-qer2.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-white hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">SECT. 05 // SYSTEM ACTIVE</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
