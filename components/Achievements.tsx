import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowUpRight, Flame, Star, BookOpen } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { TiltCard } from './TiltCard';

const miniStats = [['500+', 'Problems'], ['Top 15%', 'Global Rank'], ['50 Day', 'Streak']];
const lc75Stats = [['75', 'Problems'], ['Top 20%', 'Global Rank'], ['100%', 'Complete']];

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-60 bg-accent/8 rounded-full blur-[100px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-warning/6 rounded-full blur-[80px] pointer-events-none animate-breathe" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-violet-500/6 rounded-full blur-[80px] pointer-events-none animate-breathe" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2 mb-10 text-center"
        >
          <span className="section-label">Milestones</span>
          <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Achieve<span className="text-gradient-accent text-neon">ments</span>
          </h2>
        </motion.div>

        {/* ── Row of cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">

          {/* ── Card 1: 50-Day Streak ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <TiltCard
              intensity={6}
              className="group relative glass-focus glass-highlight glass-noise rounded-xl overflow-hidden shimmer-card w-full h-full flex flex-col"
              style={{ border: '1px solid rgba(52,211,153,0.22)', boxShadow: '0 0 40px rgba(16,185,129,0.08), 0 20px 60px rgba(0,0,0,0.4)' }}
            >
              <div className="noise-overlay" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/8 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-green-500/6 rounded-full blur-[50px] pointer-events-none" />

              {/* Badge visual — top */}
              <div className="relative flex items-center justify-center py-6 bg-surfaceDeep/40 border-b border-borderSubtle overflow-hidden min-h-[160px]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-green-500/4 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-emerald-400/12 rounded-full blur-[50px] pointer-events-none" />

                <div
                  className="relative z-10 w-24 h-24 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', boxShadow: '0 0 30px rgba(52,211,153,0.2)' }}
                >
                  <img
                    src="/badges/Screenshot 2026-02-20 120340.png"
                    alt="LeetCode 50 Days Badge"
                    className="w-full h-[200%] object-cover object-center filter brightness-110"
                    style={{ transform: 'scale(2.8) translateY(1.5%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {[{ top: '14%', left: '10%' }, { top: '16%', right: '10%' }, { bottom: '12%', left: '8%' }].map((style, i) => (
                  <Star key={i} size={8} className="absolute animate-glow-pulse"
                    style={{ ...style, color: 'rgba(52,211,153,0.55)', fill: 'rgba(52,211,153,0.2)', animationDelay: `${i * 0.4}s` } as React.CSSProperties} />
                ))}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3.5 p-5 relative z-10 flex-1">
                <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full border"
                  style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.3)', boxShadow: '0 0 14px rgba(52,211,153,0.1)' }}>
                  <Flame size={10} style={{ color: '#34d399' }} />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: '#34d399' }}>Verified Milestone</span>
                </div>

                <div className="flex flex-col">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-sans font-black leading-none glow-number"
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 4rem)', color: '#34d399' }}
                  >
                    50
                  </motion.span>
                  <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-0.5 pl-2" style={{ borderLeft: '2px solid rgba(52,211,153,0.4)' }}>
                    Day Problem Solving Streak
                  </span>
                </div>

                <div>
                  <h3 className="font-sans font-black text-base text-white mb-1 transition-colors duration-300" onMouseEnter={e => (e.currentTarget.style.color = '#34d399')} onMouseLeave={e => (e.currentTarget.style.color = '')}>
                    LeetCode Consistent Learner
                  </h3>
                  <p className="font-body text-xs text-secondary leading-relaxed">
                    Maintained a 50-day streak of active algorithmic problem solving, mastering data structures and algorithms.
                  </p>
                </div>

                <div className="flex gap-4">
                  {miniStats.map(([val, label], i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }} className="flex flex-col">
                      <span className="font-sans font-black text-sm glow-number" style={{ color: '#34d399' }}>{val}</span>
                      <span className="font-mono text-[8px] text-muted uppercase tracking-widest">{label}</span>
                    </motion.div>
                  ))}
                </div>

                <MagneticButton
                  href="https://leetcode.com/medal/?showImg=0&id=9517581&isLevel=false"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 self-start btn-glass-hybrid px-4 py-2 rounded-lg font-bold text-xs mt-auto"
                  style={{ background: 'linear-gradient(135deg, #059669, #34d399)', color: '#fff', border: '1px solid rgba(52,211,153,0.5)', boxShadow: '0 0 20px rgba(5,150,105,0.35)' }}
                >
                  <Trophy size={12} className="relative z-10" />
                  <span className="relative z-10">View Record</span>
                  <ArrowUpRight size={11} className="relative z-10" />
                </MagneticButton>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Card 2: LeetCode 75 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <TiltCard
              intensity={6}
              className="group relative glass-focus glass-highlight glass-noise rounded-xl overflow-hidden shimmer-card w-full h-full flex flex-col"
              style={{ border: '1px solid rgba(56,189,248,0.22)', boxShadow: '0 0 40px rgba(14,165,233,0.08), 0 20px 60px rgba(0,0,0,0.4)' }}
            >
              <div className="noise-overlay" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/8 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-cyan-500/6 rounded-full blur-[50px] pointer-events-none" />

              {/* Badge visual — top */}
              <div className="relative flex items-center justify-center py-6 border-b border-borderSubtle overflow-hidden min-h-[160px]"
                style={{ background: 'rgba(8,16,30,0.4)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/6 to-cyan-500/4 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-[50px] pointer-events-none"
                  style={{ background: 'rgba(56,189,248,0.14)' }} />

                <div
                  className="relative z-10 w-24 h-24 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500 rounded-full"
                  style={{ boxShadow: '0 0 30px rgba(56,189,248,0.25)' }}
                >
                  <img
                    src="/badges/leetcode 75.png"
                    alt="LeetCode 75 Study Plan Badge"
                    className="w-full h-full object-cover filter brightness-110"
                    style={{ objectPosition: 'center 54%', transform: 'scale(3.2)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {[{ top: '14%', left: '10%' }, { top: '16%', right: '10%' }, { bottom: '12%', left: '8%' }, { bottom: '16%', right: '12%' }].map((style, i) => (
                  <Star key={i} size={8} className="absolute animate-glow-pulse"
                    style={{ ...style, color: 'rgba(56,189,248,0.55)', fill: 'rgba(56,189,248,0.2)', animationDelay: `${i * 0.35}s` } as React.CSSProperties} />
                ))}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3.5 p-5 relative z-10 flex-1">
                <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full border"
                  style={{ background: 'rgba(56,189,248,0.1)', borderColor: 'rgba(56,189,248,0.3)', boxShadow: '0 0 14px rgba(56,189,248,0.1)' }}>
                  <BookOpen size={10} style={{ color: '#38bdf8' }} />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: '#38bdf8' }}>Verified Achievement</span>
                </div>

                <div className="flex flex-col">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-sans font-black leading-none glow-number"
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 4rem)', color: '#38bdf8' }}
                  >
                    75
                  </motion.span>
                  <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-0.5 pl-2"
                    style={{ borderLeft: '2px solid rgba(56,189,248,0.4)' }}>
                    Curated Study Plan Completed
                  </span>
                </div>

                <div>
                  <h3
                    className="font-sans font-black text-base text-white mb-1 transition-colors duration-300"
                    onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '')}
                  >
                    LeetCode 75 — Study Plan
                  </h3>
                  <p className="font-body text-xs text-secondary leading-relaxed">
                    Completed the prestigious LeetCode 75 curated study plan — 75 essential problems covering arrays, trees, graphs, and dynamic programming.
                  </p>
                </div>

                <div className="flex gap-4">
                  {lc75Stats.map(([val, label], i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }} className="flex flex-col">
                      <span className="font-sans font-black text-sm glow-number" style={{ color: '#38bdf8' }}>{val}</span>
                      <span className="font-mono text-[8px] text-muted uppercase tracking-widest">{label}</span>
                    </motion.div>
                  ))}
                </div>

                <MagneticButton
                  href="https://leetcode.com/medal/?showImg=0&id=9830369&isLevel=false"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 self-start btn-glass-hybrid px-4 py-2 rounded-lg font-bold text-xs mt-auto"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #38bdf8)', color: '#fff', border: '1px solid rgba(56,189,248,0.5)', boxShadow: '0 0 20px rgba(14,165,233,0.35)' }}
                >
                  <Trophy size={12} className="relative z-10" />
                  <span className="relative z-10">View Record</span>
                  <ArrowUpRight size={11} className="relative z-10" />
                </MagneticButton>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
