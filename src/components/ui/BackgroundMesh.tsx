"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BackgroundMesh() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates using MotionValues for high-performance updates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glowing light follow
  const springConfig = { stiffness: 60, damping: 25, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Generate random stable background particles to avoid shifting layouts
    const generated: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    setParticles(generated);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] pointer-events-none z-0"
      style={{ isolation: "isolate" }}
    >
      {/* 1. Global Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.15] mix-blend-overlay" />

      {/* 2. Interactive Cursor Radial Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,rgba(79,70,229,0.05)_40%,transparent_70%)] blur-[50px] pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 3. Static Glowing Backdrops */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-indigo-900/10 blur-[130px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* 4. Slow Ambient Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white opacity-[0.15]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
