import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Wifi, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const ROLES = [
  "Java Backend Engineer",
  "Full Stack Developer",
  "System Design Enthusiast",
  "DSA Problem Solver",
  "UI/UX Designer",
];

// Futuristic HUD stat bubble
const HUDBadge: React.FC<{ val: string; label: string; delay: number; className?: string }> = ({ val, label, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute glass corner-tl corner-br rounded-2xl px-4 py-3 flex flex-col gap-0.5 shadow-glow-sm animate-float z-20 ${className}`}
    style={{ animationDelay: `${delay * 800}ms` }}
  >
    <span className="font-sans font-black text-lg text-neon text-accent leading-none">{val}</span>
    <span className="font-mono text-[9px] text-secondary uppercase tracking-widest">{label}</span>
  </motion.div>
);

export const Hero: React.FC = () => {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 28 : 72;
    const t = setTimeout(() => {
      if (!isDeleting && roleText.length < current.length) {
        setRoleText(current.slice(0, roleText.length + 1));
      } else if (isDeleting && roleText.length > 0) {
        setRoleText(current.slice(0, roleText.length - 1));
      } else if (isDeleting && roleText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((p) => (p + 1) % ROLES.length);
      }
    }, speed);
    if (!isDeleting && roleText === current) {
      const p = setTimeout(() => setIsDeleting(true), 1800);
      return () => { clearTimeout(t); clearTimeout(p); };
    }
    return () => clearTimeout(t);
  }, [roleText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Full-screen futuristic grid backdrop */}
      <div className="absolute inset-0 hex-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 scan-overlay opacity-70 pointer-events-none" />

      {/* Animated Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden sm:overflow-visible">
        <div className="animate-breathe"><div className="orb orb-1 absolute -top-32 -left-48" /></div>
        <div className="animate-breathe" style={{ animationDelay: '2.5s' }}><div className="orb orb-2 absolute top-1/2 -right-64" /></div>
        <div className="animate-breathe" style={{ animationDelay: '5s' }}><div className="orb orb-3 absolute bottom-0 left-1/3" /></div>
      </div>

      {/* Radial vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,rgba(7,11,20,0.6)_100%)] pointer-events-none" />

      {/* Horizontal shimmer lines for HUD feel */}
      <div className="absolute top-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent pointer-events-none" />
      <div className="absolute top-[85%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accentSec/10 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 order-2 lg:order-1"
          >
            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-3 self-start"
            >
              <div className="flex items-center gap-2 glass border-glow-animate px-4 py-2 rounded-full"
                style={{ border: '1px solid rgba(45,255,160,0.25)' }}>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"
                  style={{ boxShadow: '0 0 8px #2DFFA0, 0 0 20px rgba(45,255,160,0.4)' }} />
                <span className="font-mono text-[11px] font-bold tracking-widest text-success uppercase">Available for Work</span>
              </div>
              {/* HUD identifier */}
              <span className="font-mono text-[9px] text-muted tracking-widest hidden sm:block">SYS_ID:2026</span>
            </motion.div>

            {/* Name — massive, neon-lit */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 50, skewY: 3 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-black leading-[0.82] tracking-tighter select-none"
                style={{ fontSize: 'clamp(4rem, 10vw, 8.5rem)' }}
              >
                <span className="block text-white" style={{
                  textShadow: '0 0 40px rgba(255,255,255,0.15)'
                }}>SOUMYA</span>
                <span className="block text-gradient-accent text-neon-sec"
                  style={{
                    WebkitTextStroke: '0px',
                    filter: 'drop-shadow(0 0 30px rgba(61,219,255,0.4)) drop-shadow(0 0 80px rgba(139,111,255,0.2))',
                  }}
                >PADHI</span>
              </motion.h1>
            </div>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 h-7"
            >
              <ChevronRight size={16} className="text-accent shrink-0" />
              <span className="font-mono text-base md:text-lg text-secondary font-medium">
                {roleText}
                <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 animate-typewriter align-middle text-neon"
                  style={{ boxShadow: '0 0 8px rgba(61,219,255,0.8)' }} />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-body text-base text-secondary leading-relaxed max-w-[48ch]"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* Meta info row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2.5"
            >
              {[
                { icon: <MapPin size={11} className="text-accent" />, text: PERSONAL_INFO.location },
                { icon: <Wifi size={11} className="text-success" />, text: 'Remote OK' },
                { icon: <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 6px rgba(61,219,255,0.8)' }} />, text: 'Open to Work' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-xs text-secondary font-medium"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                  {icon}
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group btn-primary text-sm font-bold"
                style={{ boxShadow: '0 0 0 rgba(61,219,255,0)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(61,219,255,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(61,219,255,0)')}
              >
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="/Mine_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary text-sm font-bold"
              >
                <Download size={15} />
                Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Futuristic Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Floating HUD stat badges */}
            <HUDBadge val="500+" label="DSA Solved" delay={1.0} className="-left-6 top-12" />
            <HUDBadge val="10+" label="Projects" delay={1.2} className="-right-4 bottom-28 animate-float-slow" />

            {/* Card glow aura */}
            <div
              className="absolute inset-0 rounded-3xl animate-glow-pulse"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(61,219,255,0.12) 0%, rgba(139,111,255,0.08) 50%, transparent 70%)',
                transform: 'scale(1.4)',
                filter: 'blur(20px)',
              }}
            />

            {/* Main profile card */}
            <div className="relative w-full max-w-[340px]">
              {/* Gradient border glow ring */}
              <div className="absolute -inset-[1.5px] rounded-[26px] pointer-events-none z-0"
                style={{ background: 'linear-gradient(135deg, rgba(61,219,255,0.4) 0%, rgba(139,111,255,0.25) 50%, rgba(61,219,255,0.15) 100%)' }} />

              <div className="relative z-10 rounded-[24px] overflow-hidden shimmer-card glass-noise"
                style={{ background: 'rgba(10,16,32,0.8)', backdropFilter: 'blur(30px)' }}>

                {/* Futuristic HUD top bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b"
                  style={{ borderColor: 'rgba(61,219,255,0.12)', background: 'rgba(7,11,20,0.5)' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-success" style={{ boxShadow: '0 0 6px #2DFFA0' }} />
                    <div className="w-2 h-2 rounded-full bg-warning opacity-70" />
                    <div className="w-2 h-2 rounded-full bg-error opacity-50" />
                  </div>
                  <span className="font-mono text-[9px] text-muted tracking-widest uppercase">PROFILE_V2.1</span>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 8px rgba(61,219,255,0.8)' }} />
                </div>

                {/* Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-surfaceDeep">
                  {/* Top gradient overlay */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-accent/6 to-transparent z-10 pointer-events-none" />
                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[rgba(10,16,32,0.95)] to-transparent z-10 pointer-events-none" />
                  {/* Corner bracket decorations */}
                  <div className="absolute top-3 left-3 w-5 h-5 z-20 pointer-events-none"
                    style={{ borderTop: '1.5px solid rgba(61,219,255,0.6)', borderLeft: '1.5px solid rgba(61,219,255,0.6)' }} />
                  <div className="absolute top-3 right-3 w-5 h-5 z-20 pointer-events-none"
                    style={{ borderTop: '1.5px solid rgba(61,219,255,0.6)', borderRight: '1.5px solid rgba(61,219,255,0.6)' }} />
                  <div className="absolute bottom-32 left-3 w-5 h-5 z-20 pointer-events-none"
                    style={{ borderBottom: '1.5px solid rgba(61,219,255,0.6)', borderLeft: '1.5px solid rgba(61,219,255,0.6)' }} />
                  <div className="absolute bottom-32 right-3 w-5 h-5 z-20 pointer-events-none"
                    style={{ borderBottom: '1.5px solid rgba(61,219,255,0.6)', borderRight: '1.5px solid rgba(61,219,255,0.6)' }} />

                  <img
                    src="/profile_v2.jpg"
                    alt="Soumya Ranjan Padhi"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    style={{ filter: 'contrast(1.08) brightness(0.92) saturate(1.1)' }}
                  />
                </div>

                {/* Info strip */}
                <div className="px-5 py-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-sans font-black text-base text-white">Soumya Ranjan</h3>
                      <p className="font-mono text-[10px] text-secondary mt-0.5">Backend Engineer · Java</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(45,255,160,0.08)', border: '1px solid rgba(45,255,160,0.2)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      <span className="font-mono text-[9px] font-bold text-success uppercase">Active</span>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
};