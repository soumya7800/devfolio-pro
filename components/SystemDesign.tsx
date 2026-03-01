import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../constants';
import { motion } from 'framer-motion';
import { SystemDesignModal } from './SystemDesignModal';
import { CaseStudy } from '../types';

export const SystemDesign: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="system-design" className="py-24 relative bg-background border-b border-borderSubtle overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-start mb-20 group">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 mb-6 group-hover:bg-primary/10 transition-colors duration-300">
            <span className="w-1.5 h-1.5 bg-primary rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-primary">
              ARCHITECTURE_ANALYSIS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary tracking-tighter uppercase mb-6">
            System Design
          </h2>
          <p className="font-mono text-xs md:text-sm text-secondary uppercase tracking-widest border-l-2 border-primary/50 pl-4 py-1 leading-relaxed max-w-2xl">
            // DEEP DIVES INTO ARCHITECTURAL DECISIONS, TRADE-OFFS, AND SCALABILITY
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="group h-full flex flex-col cursor-pointer border border-borderSubtle bg-surface/40 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-surface/60 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] rounded-sm"
              onClick={() => setSelectedStudy(study)}
            >
              {/* Card Hover Highlight */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Top Bar */}
              <div className="flex justify-between items-center p-5 border-b border-borderSubtle/50 bg-surface/50 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-background border border-borderSubtle rounded-sm group-hover:border-primary/30 transition-colors">
                    <Layers size={14} className="text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-secondary group-hover:text-primary transition-colors">MODULE_{idx + 1}</span>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold bg-primary/10 text-primary px-3 py-1 border border-primary/20 rounded-sm">
                  SYS_ARCH
                </span>
              </div>

              {/* Title & Desc */}
              <div className="p-8 border-b border-borderSubtle flex-grow relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-primary mb-6 tracking-tighter uppercase group-hover:text-white transition-colors leading-[1.1]">
                  {study.title}
                </h3>
                {/* Content Box */}
                <div className="flex flex-col justify-between">
                  <p className="font-mono text-sm text-[#D1D1D1] leading-[1.8]">
                    {study.description}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-borderSubtle border-b border-borderSubtle relative z-10">
                <div className="p-6 bg-surface/60 group-hover:bg-surface/80 transition-colors">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-primary mb-4 tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-primary opacity-50"></span>
                    CORE_TOPICS
                  </div>
                  <div className="flex flex-col gap-3">
                    {study.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E6E6E6] line-clamp-1 group-hover:text-white transition-colors">
                        <span className="text-primary opacity-50 mr-2">{'> '}</span>{topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-surface/60 group-hover:bg-surface/80 transition-colors">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-primary mb-4 tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-primary opacity-50"></span>
                    TECH_STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="font-mono text-[10px] uppercase font-bold tracking-widest text-secondary border border-borderSubtle px-3 py-1.5 bg-background/50 rounded-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 bg-background/50 flex items-center justify-between text-secondary group-hover:text-primary transition-colors relative z-10 overflow-hidden">
                {/* Footer Glint */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-[scanline-hz_1s_linear_infinite]"></div>

                <span className="font-mono text-[10px] font-bold tracking-widest uppercase relative z-10">INITIALIZE_ANALYSIS</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-all relative z-10" />
              </div>
            </motion.div>
          ))}
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