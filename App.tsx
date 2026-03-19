import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialGrid } from './components/SocialGrid';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { SystemDesign } from './components/SystemDesign';
import { Certifications } from './components/Certifications';
import { Stats } from './components/Stats';
import { Achievements } from './components/Achievements';
import { Footer } from './components/Footer';

// ──────────────────────────────────────────
// OxygenOS 15 Boot Loader  (Aquamorphic 2.0)
// ──────────────────────────────────────────
const PHASES = [
  { label: 'Initializing kernel...', pct: 0 },
  { label: 'Loading OxygenOS 15...', pct: 28 },
  { label: 'Mounting interface...',  pct: 62 },
  { label: 'Applying themes...',     pct: 84 },
  { label: 'Ready',                  pct: 100 },
];

const BootLoader: React.FC = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    PHASES.forEach((p, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => {
        setPhaseIdx(i);
        setProgress(p.pct);
      }, 300 + i * 480));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#050810' }}
    >
      {/* Subtle hex grid */}
      <div className="absolute inset-0 hex-grid opacity-40 pointer-events-none" />
      {/* Scan lines */}
      <div className="absolute inset-0 scan-overlay opacity-50 pointer-events-none" />
      {/* Orbs */}
      <div className="orb orb-1 absolute -top-40 -left-40 opacity-60" />
      <div className="orb orb-2 absolute -bottom-40 -right-40 opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-10 w-full max-w-[280px] px-6 relative z-10"
      >
        {/* OP Logo Mark + Progress Ring */}
        <div className="relative" style={{ width: 120, height: 120 }}>
          {/* Outer slow spin ring */}
          <div className="absolute inset-0 rounded-full border border-accent/15 animate-spin-slow" />
          {/* Mid dashed ring */}
          <div className="absolute inset-3 rounded-full border border-dashed border-accentSec/15 animate-spin-rev" />
          {/* SVG progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3DDBFF" />
                <stop offset="100%" stopColor="#8B6FFF" />
              </linearGradient>
              <filter id="bootGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Track */}
            <circle cx="50" cy="50" r={r} fill="none"
              stroke="rgba(61,219,255,0.08)" strokeWidth="2" />
            {/* Progress arc */}
            <motion.circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="url(#bootGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#bootGlow)"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ * (1 - progress / 100) }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </svg>
          {/* Center: OnePlus-style O mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(61,219,255,0.15) 0%, transparent 70%)',
                boxShadow: '0 0 20px rgba(61,219,255,0.3), 0 0 60px rgba(61,219,255,0.1)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" stroke="#3DDBFF" strokeWidth="2" />
                <circle cx="11" cy="11" r="5" fill="rgba(61,219,255,0.25)"
                  stroke="#8B6FFF" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-sans font-black text-3xl tracking-tight">
            <span className="text-white">SOUMYA</span>
            <span className="text-gradient-accent"> PADHI</span>
          </h1>
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">Backend Engineer · Java</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={phaseIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[11px] text-accent mt-1 tracking-widest"
            >
              {PHASES[phaseIdx].label}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between mb-2 font-mono text-[10px] text-muted">
            <span className="tracking-widest uppercase">Loading</span>
            <span className="text-accent font-bold">{progress}%</span>
          </div>
          <div className="w-full h-px bg-white/8 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full absolute top-0 left-0"
              style={{
                background: 'linear-gradient(90deg, #3DDBFF, #8B6FFF)',
                boxShadow: '0 0 12px rgba(61,219,255,0.8)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
          {/* Segment dots */}
          <div className="flex justify-between mt-2">
            {PHASES.map((p, i) => (
              <div key={i}
                className="w-1 h-1 rounded-full transition-all duration-500"
                style={{
                  background: phaseIdx >= i ? '#3DDBFF' : 'rgba(255,255,255,0.1)',
                  boxShadow: phaseIdx >= i ? '0 0 6px rgba(61,219,255,0.8)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ──────────────────────────────────────────
// App Root
// ──────────────────────────────────────────
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
        { threshold: 0.08 }
      );
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [isLoading]);

  return (
    <div className="bg-background min-h-screen text-primary relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5, ease: [0.4,0,0.2,1] }}>
            <BootLoader />
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <main className="relative z-10 w-full overflow-x-hidden">
              <Hero />
              <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-0">
                <SocialGrid />
                <Stats />
                <Skills />
                <Experience />
                <Projects />
                <SystemDesign />
                <Certifications />
                <Achievements />
              </div>
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;