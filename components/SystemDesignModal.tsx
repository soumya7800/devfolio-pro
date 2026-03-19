import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, AlertTriangle, Cpu } from 'lucide-react';
import { CaseStudy } from '../types';

interface SystemDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export const SystemDesignModal: React.FC<SystemDesignModalProps> = ({ isOpen, onClose, caseStudy }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] cursor-pointer"
            style={{ background: 'rgba(7,11,20,0.88)', backdropFilter: 'blur(16px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4 sm:p-8"
          >
            <div
              className="relative glass-high rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden shimmer-card"
              style={{ border: '1px solid rgba(139,111,255,0.2)', boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(139,111,255,0.1)' }}
            >
              {/* Ambient glows inside modal */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accentSec/6 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between p-6 md:p-8 border-b border-borderSubtle bg-surfaceDeep/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="section-label" style={{ background: 'rgba(139,111,255,0.08)', border: '1px solid rgba(139,111,255,0.22)', color: '#8B6FFF' }}>
                      System Architecture
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-white text-2xl sm:text-3xl md:text-4xl tracking-tight">{caseStudy.title}</h2>
                  <p className="font-body text-sm text-secondary mt-2 max-w-2xl">{caseStudy.description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="ml-4 w-9 h-9 glass rounded-full flex items-center justify-center text-secondary hover:text-white border border-borderSubtle hover:border-accent/30 transition-all shrink-0"
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Scrollable body */}
              <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 space-y-7">
                {/* Tech stack */}
                {caseStudy.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span key={tech} className="chip text-[10px]">{tech}</span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Challenges + Topics */}
                  <div className="lg:col-span-1 flex flex-col gap-4">
                    {/* Challenges */}
                    <div className="glass rounded-2xl p-5" style={{ border: '1px solid rgba(255,183,71,0.15)' }}>
                      <h3 className="flex items-center gap-2 font-sans font-bold text-sm text-warning mb-4">
                        <AlertTriangle size={14} />
                        Challenges
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {caseStudy.challenges?.map((ch, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-warning mt-2 shrink-0 opacity-70" />
                            <p className="font-body text-xs text-secondary leading-relaxed">{ch}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Core Topics */}
                    <div className="glass rounded-2xl p-5" style={{ border: '1px solid rgba(139,111,255,0.15)' }}>
                      <h3 className="flex items-center gap-2 font-sans font-bold text-sm text-accentSec mb-4">
                        <Cpu size={14} />
                        Core Topics
                      </h3>
                      <div className="flex flex-col gap-2">
                        {caseStudy.topics.map((topic) => (
                          <span key={topic} className="chip-sec chip text-[10px] self-start">{topic}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Deep dive markdown */}
                  <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-7" style={{ border: '1px solid rgba(61,219,255,0.1)' }}>
                    <h3 className="flex items-center gap-2 font-sans font-bold text-sm text-accent mb-5">
                      <Layers size={14} />
                      System Specification
                    </h3>
                    <div className="space-y-5 font-body text-sm text-secondary leading-relaxed">
                      {caseStudy.details?.split('\n').map((line, i) => {
                        if (line.startsWith('###')) {
                          return (
                            <h4 key={i} className="font-sans font-black text-base text-white mt-6 mb-2 tracking-tight">
                              {line.replace('###', '').trim()}
                            </h4>
                          );
                        }
                        if (line.startsWith('1.') || line.startsWith('-')) {
                          return (
                            <div key={i} className="flex gap-3 pl-3 border-l-2 border-accent/20 py-1">
                              <span className="text-accent opacity-60 shrink-0 text-xs mt-0.5">›</span>
                              <span>{line.substring(line.indexOf(' ') + 1)}</span>
                            </div>
                          );
                        }
                        if (line.trim() === '') return <div key={i} className="h-1" />;
                        return <p key={i} className="text-secondary">{line}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
