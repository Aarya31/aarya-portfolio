"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import BackgroundMesh from "@/components/ui/BackgroundMesh";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Spotlight from "@/components/sections/Spotlight";
import Achievements from "@/components/sections/Achievements";
import Education from "@/components/sections/Education";
import GithubDashboard from "@/components/sections/Github";
import Contact from "@/components/sections/Contact";
import Resume from "@/components/sections/Resume";
import { Terminal, Mail } from "lucide-react";

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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Loader screen (futuristic animated entry) */}
      <LoadingScreen />

      {/* 2. Interactive mesh background */}
      <BackgroundMesh />

      {/* 3. Header / Floating Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 print:hidden ${
        scrolled 
          ? "py-4 bg-[#050505]/75 border-b border-white/5 backdrop-blur-md shadow-lg" 
          : "py-6 bg-transparent"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
          {/* Logo brand */}
          <a href="#home" className="flex items-center gap-2 text-white font-semibold tracking-wider font-mono">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AARYA.DEV</span>
          </a>

          {/* Desktop Nav menu */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">ABOUT</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">EXPERIENCE</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">SKILLS</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">PROJECTS</a>
            <a href="#spotlight" className="hover:text-cyan-400 transition-colors">SPOTLIGHT</a>
            <a href="#github" className="hover:text-cyan-400 transition-colors">GITHUB</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">CONTACT</a>
          </nav>

          {/* Nav CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="#resume" 
              className="px-4 py-2 text-xs font-mono font-semibold tracking-wider border border-cyan-800/40 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-400 transition-all glassmorphism"
            >
              RESUME.PDF
            </a>
          </div>
        </div>
      </header>

      {/* 4. Single-page layout sections */}
      <main className="relative z-10 w-full min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Spotlight />
        <Achievements />
        <Education />
        <GithubDashboard />
        <Contact />
        <Resume />
      </main>

      {/* 5. Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-[#050505] print:hidden">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>&copy; {new Date().getFullYear()} Aarya Prajapat. All rights reserved.</span>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://github.com/Aarya31" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aarya-prajapat/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:aaryaprajapat85@gmail.com" 
              className="hover:text-indigo-400 transition-colors"
              aria-label="Email Aarya"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
