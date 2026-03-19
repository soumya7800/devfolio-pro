import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { ChevronRight } from 'lucide-react';

const ACCENT = [
  { from: 'rgba(61,219,255,0.18)',  border: 'rgba(61,219,255,0.28)',  icon: '#3DDBFF', chip: 'rgba(61,219,255,0.10)',  chipBorder: 'rgba(61,219,255,0.20)',  neon: '0 0 18px rgba(61,219,255,0.4)'  },
  { from: 'rgba(139,111,255,0.18)', border: 'rgba(139,111,255,0.28)', icon: '#8B6FFF', chip: 'rgba(139,111,255,0.10)', chipBorder: 'rgba(139,111,255,0.20)', neon: '0 0 18px rgba(139,111,255,0.4)' },
  { from: 'rgba(255,107,157,0.18)', border: 'rgba(255,107,157,0.28)', icon: '#FF6B9D', chip: 'rgba(255,107,157,0.10)', chipBorder: 'rgba(255,107,157,0.20)', neon: '0 0 18px rgba(255,107,157,0.4)'  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accentSec/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 mb-14"
        >
          <span className="section-label">Capabilities</span>
          <h2
            className="font-sans font-black tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Technical <span className="text-gradient-accent text-neon">Stack</span>
          </h2>
          <p className="font-body text-secondary text-base max-w-[48ch] mt-1">
            Core technologies I use to build scalable, production-ready systems.
          </p>
        </motion.div>

        {/* Grid of category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const col = ACCENT[idx % ACCENT.length];
            return (
              <SkillCard key={cat.title} cat={cat} col={col} idx={idx} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  cat: typeof import('../constants').SKILL_CATEGORIES[0];
  col: typeof ACCENT[0];
  idx: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ cat, col, idx }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative glass rounded-2xl p-6 shimmer-card overflow-hidden cursor-default flex flex-col gap-4"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${col.from} 0%, transparent 65%)`,
          border: `1px solid ${col.border}`,
          boxShadow: col.neon,
        }}
      />
      {/* Top sweep line */}
      <div
        className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${col.icon}, transparent)` }}
      />

      {/* Card header */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: col.from,
            border: `1px solid ${col.border}`,
          }}
        >
          <cat.icon size={18} style={{ color: col.icon }} />
        </div>
        <div className="min-w-0">
          <h3 className="font-sans font-bold text-sm text-white truncate">{cat.title}</h3>
          <p className="font-mono text-[9px] text-muted tracking-widest uppercase mt-0.5">
            {cat.skills.length} skills
          </p>
        </div>
      </div>

      {/* Horizontal scroll chip row */}
      <div className="relative">
        {/* Fade-out gradient on right to hint scrollability */}
        <div
          className="absolute top-0 right-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(10,16,32,0.9), transparent)' }}
        />
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cat.skills.map((skill, si) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 + si * 0.04 }}
              whileHover={{ scale: 1.06 }}
              className="shrink-0 text-[10px] font-semibold font-sans px-3 py-1.5 rounded-full cursor-default transition-all duration-200 whitespace-nowrap"
              style={{
                background: col.chip,
                border: `1px solid ${col.chipBorder}`,
                color: col.icon,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${col.chipBorder}`;
                (e.currentTarget as HTMLElement).style.background = col.from;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.background = col.chip;
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Scroll hint chevron — only visible when overflowing */}
      <div className="flex items-center justify-end">
        <span className="font-mono text-[9px] text-muted flex items-center gap-0.5 opacity-50">
          scroll <ChevronRight size={10} />
        </span>
      </div>
    </motion.div>
  );
};