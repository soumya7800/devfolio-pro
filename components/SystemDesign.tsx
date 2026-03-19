import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Server, Database, Wifi } from 'lucide-react';
import { CASE_STUDIES } from '../constants';
import { SystemDesignModal } from './SystemDesignModal';
import { TiltCard } from './TiltCard';
import { CaseStudy } from '../types';

const icons = [Server, Database, Wifi];

export const SystemDesign: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="system-design" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accentSec/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 mb-14"
        >
          <span className="section-label" style={{ background: 'rgba(139,111,255,0.08)', border: '1px solid rgba(139,111,255,0.22)', color: '#8B6FFF' }}>
            Architecture
          </span>
          <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            System <span className="text-gradient-accent">Design</span>
          </h2>
          <p className="font-body text-secondary text-sm max-w-[52ch]">
            Deep dives into architectural decisions, trade-offs, and scalability.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CASE_STUDIES.map((study, idx) => {
            const Icon = icons[idx] || Layers;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedStudy(study)}
                className="cursor-pointer h-full"
              >
                <TiltCard intensity={10} className="group relative glass rounded-2xl overflow-hidden shimmer-card glass-noise flex flex-col h-full w-full" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
                  style={{ border: '1px solid rgba(139,111,255,0.3)', boxShadow: '0 0 40px rgba(139,111,255,0.1)' }} />
                {/* Top sweep line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accentSec/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 scale-x-0 group-hover:scale-x-100" style={{ transformOrigin: 'left', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s' }} />

                {/* Card header */}
                <div className="p-5 border-b border-borderSubtle flex items-center justify-between bg-surfaceDeep/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accentSec/20 to-accent/10 border border-accentSec/25 flex items-center justify-center group-hover:border-accentSec/50 group-hover:shadow-glow-sec transition-all duration-300">
                      <Icon size={16} className="text-accentSec" />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-secondary">Case {idx + 1}</span>
                  </div>
                  <span className="chip-sec chip text-[9px]">Sys Arch</span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-5 flex-grow">
                  <h3 className="font-sans font-black text-xl text-white leading-tight group-hover:text-gradient-accent transition-all">
                    {study.title}
                  </h3>
                  <p className="font-body text-sm text-secondary leading-relaxed">{study.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {study.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="chip-sec chip text-[9px] py-0.5 px-2">{topic}</span>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="mt-auto pt-4 border-t border-borderSubtle flex flex-wrap gap-1.5">
                    {study.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="font-mono text-[9px] font-bold text-muted bg-white/4 border border-white/6 px-2 py-1 rounded-lg">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-6 py-4 border-t border-borderSubtle flex items-center justify-between text-secondary group-hover:text-accent transition-colors">
                  <span className="font-sans text-xs font-semibold">Deep Dive</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <SystemDesignModal
        isOpen={!!selectedStudy}
        onClose={() => setSelectedStudy(null)}
        caseStudy={selectedStudy}
      />
    </section>
  );
};