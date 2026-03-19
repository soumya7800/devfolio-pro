import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowUpRight, Flame, Star } from 'lucide-react';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-accent/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 mb-14 text-center"
        >
          <span className="section-label">Milestones</span>
          <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Achieve<span className="text-gradient-accent">ments</span>
          </h2>
        </motion.div>

        {/* Main achievement card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative glass-high rounded-2xl overflow-hidden shimmer-card max-w-4xl mx-auto"
          style={{ border: '1px solid rgba(61,219,255,0.12)' }}
        >
          {/* Animated sweep on hover */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-accentSec opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Left: Content */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col gap-6 relative z-10">
              {/* Badge chip */}
              <div className="flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-warning/10 border border-warning/25">
                <Flame size={12} className="text-warning" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-warning">Verified Milestone</span>
              </div>

              {/* Big number */}
              <div className="flex flex-col">
                <span
                  className="font-sans font-black leading-none text-gradient-accent"
                  style={{ fontSize: 'clamp(5rem, 12vw, 8rem)' }}
                >
                  50
                </span>
                <span className="font-mono text-xs text-muted tracking-widest uppercase mt-1 border-l-2 border-accent/40 pl-3">
                  Day Problem Solving Streak
                </span>
              </div>

              {/* Title and desc */}
              <div>
                <h3 className="font-sans font-black text-2xl text-white mb-3 group-hover:text-gradient-accent transition-all">LeetCode Consistent Learner</h3>
                <p className="font-body text-sm text-secondary leading-relaxed max-w-md">
                  Maintained a 50-day streak of active algorithmic problem solving, demonstrating strong conviction to continuous learning and mastering data structures.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex gap-5">
                {[['500+', 'Problems Solved'], ['Top 15%', 'Global Rank'], ['50 Day', 'Streak']].map(([val, label]) => (
                  <div key={label} className="flex flex-col">
                    <span className="font-sans font-black text-lg text-accent">{val}</span>
                    <span className="font-mono text-[9px] text-muted uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="https://leetcode.com/medal/?showImg=0&id=9517581&isLevel=false"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 self-start btn-primary text-sm"
              >
                <Trophy size={15} />
                View Record
                <ArrowUpRight size={14} />
              </motion.a>
            </div>

            {/* Right: Badge / Visual */}
            <div className="md:col-span-2 relative flex items-center justify-center p-8 border-t md:border-t-0 md:border-l border-borderSubtle overflow-hidden bg-surfaceDeep/40 min-h-[280px]">
              {/* Background glow blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/6 to-accentSec/6 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-warning/10 rounded-full blur-[60px] animate-glow-pulse pointer-events-none" />

              {/* Decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-accent/10 animate-spin-slow pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-dashed border-accentSec/10 animate-spin-rev pointer-events-none" />

              {/* Badge image */}
              <div
                className="relative z-10 w-40 h-40 md:w-48 md:h-48 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <img
                  src="/badges/Screenshot 2026-02-20 120340.png"
                  alt="LeetCode 50 Days Badge"
                  className="w-full h-[200%] object-cover object-center filter brightness-110"
                  style={{ transform: 'scale(2.8) translateY(1.5%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Stars decoration */}
              {[{ top: '12%', left: '15%' }, { top: '20%', right: '12%' }, { bottom: '15%', left: '10%' }].map((style, i) => (
                <Star
                  key={i}
                  size={10}
                  className="absolute text-warning/40 fill-warning/20 animate-glow-pulse"
                  style={{ ...style, animationDelay: `${i * 0.4}s` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
