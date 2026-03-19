import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const ACCENT_COLS = [
  { from: 'rgba(61,219,255,0.2)',  to: 'rgba(61,219,255,0.05)',  border: 'rgba(61,219,255,0.25)',  icon: '#3DDBFF', neon: '0 0 20px rgba(61,219,255,0.4)' },
  { from: 'rgba(139,111,255,0.2)', to: 'rgba(139,111,255,0.05)', border: 'rgba(139,111,255,0.25)', icon: '#8B6FFF', neon: '0 0 20px rgba(139,111,255,0.4)' },
  { from: 'rgba(255,107,157,0.2)', to: 'rgba(255,107,157,0.05)', border: 'rgba(255,107,157,0.25)', icon: '#FF6B9D', neon: '0 0 20px rgba(255,107,157,0.4)' },
];

export const Skills: React.FC = () => (
  <section id="skills" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-accentSec/8 rounded-full blur-[100px] pointer-events-none" />

    <div className="relative z-10 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-3 mb-14"
      >
        <span className="section-label">Capabilities</span>
        <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          Technical <span className="text-gradient-accent text-neon">Stack</span>
        </h2>
        <p className="font-body text-secondary text-base max-w-[48ch] mt-1">
          Core technologies I use to build scalable, production-ready systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const col = ACCENT_COLS[idx % ACCENT_COLS.length];
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative glass rounded-2xl p-6 shimmer-card overflow-hidden cursor-default"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Dynamic hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${col.from} 0%, transparent 60%)`,
                  border: `1px solid ${col.border}`,
                  boxShadow: `${col.neon}`,
                }} />
              {/* Top sweep line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-400 scale-x-0 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, transparent, ${col.icon}, transparent)`, transformOrigin: 'left', transition: 'transform 0.4s ease, opacity 0.3s' }} />

              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${col.from}, ${col.to})`,
                    border: `1px solid ${col.border}`,
                    boxShadow: `0 0 0 ${col.icon}00`,
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = col.neon}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
                >
                  <cat.icon size={18} style={{ color: col.icon }} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white group-hover:transition-all" style={{ }}>
                    {cat.title}
                  </h3>
                  <p className="font-mono text-[9px] text-muted tracking-widest uppercase mt-0.5">{cat.skills.length} skills</p>
                </div>
              </div>

              {/* Chip grid */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06 }}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-default transition-all duration-200 font-sans"
                    style={{
                      background: `${col.from.replace('0.2', '0.08')}`,
                      border: `1px solid ${col.border.replace('0.25', '0.15')}`,
                      color: col.icon,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = col.from.replace('0.2', '0.15');
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${col.border.replace('0.25','0.3')}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = col.from.replace('0.2', '0.08');
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);