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
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
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
                        onClick={onClose}
                        className="fixed inset-0 bg-background/90 z-[100] overflow-y-auto cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4 sm:p-6"
                    >
                        <div className="bg-surface/90 backdrop-blur-xl w-full max-w-5xl max-h-[90vh] border border-borderSubtle shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto relative overflow-hidden rounded-md">

                            {/* Inner Ambient Glow */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

                            {/* Header */}
                            <div className="p-6 md:p-8 border-b border-borderSubtle/50 bg-background/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 mb-4 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse"></span>
                                        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-primary">
                                            SYS_ARCHITECTURE
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary uppercase tracking-tighter leading-[1.1]">{caseStudy.title}</h2>
                                    <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#D1D1D1] mt-4 border-l-2 border-primary/50 pl-3 leading-relaxed">{caseStudy.description}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 border border-borderSubtle text-secondary hover:text-primary hover:border-primary hover:bg-surface transition-all self-start sm:self-auto bg-background/80 rounded-sm"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-transparent relative z-10 custom-scrollbar">

                                {/* Tech Stack Tags */}
                                {caseStudy.technologies && (
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.technologies.map(tech => (
                                            <span key={tech} className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest bg-background/80 text-primary border border-borderSubtle rounded-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {/* Left Column: Challenges */}
                                    <div className="lg:col-span-1 space-y-6">
                                        <div className="bg-background/60 backdrop-blur-sm border border-borderSubtle/50 p-6 rounded-sm">
                                            <h3 className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase font-bold text-primary mb-6 border-b border-borderSubtle/50 pb-3">
                                                <AlertTriangle size={14} className="text-[#f59e0b]" />
                                                CHALLENGES
                                            </h3>
                                            <ul className="space-y-4">
                                                {caseStudy.challenges?.map((challenge, idx) => (
                                                    <li key={idx} className="font-mono text-xs text-[#D1D1D1] leading-relaxed flex items-start gap-3">
                                                        <span className="text-[#f59e0b] select-none text-[10px] mt-[2px]">{'>>'}</span>
                                                        <span>{challenge}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-background/60 backdrop-blur-sm border border-borderSubtle/50 p-6 rounded-sm">
                                            <h3 className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase font-bold text-primary mb-6 border-b border-borderSubtle/50 pb-3">
                                                <Cpu size={14} className="text-primary" />
                                                COMPONENTS
                                            </h3>
                                            <div className="flex flex-col gap-2">
                                                {caseStudy.topics.map(topic => (
                                                    <span key={topic} className="font-mono text-[10px] uppercase tracking-widest text-[#E6E6E6] bg-surface/50 hover:bg-surface px-3 py-2 border border-borderSubtle/50 transition-colors rounded-sm flex items-center gap-2">
                                                        <span className="w-1 h-1 bg-primary rounded-full opacity-50"></span>
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Deep Dive */}
                                    <div className="lg:col-span-2">
                                        <div className="bg-background/60 backdrop-blur-sm border border-borderSubtle/50 p-6 md:p-8 h-full rounded-sm">
                                            <h3 className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase font-bold text-primary mb-8 border-b border-borderSubtle/50 pb-3">
                                                <span className="w-1.5 h-1.5 bg-primary opacity-50"></span>
                                                SYSTEM_SPECIFICATION
                                            </h3>
                                            <div className="space-y-8 font-mono text-[13px] md:text-sm leading-[1.8] text-[#D1D1D1]">
                                                {caseStudy.details?.split('\n').map((line, i) => {
                                                    if (line.startsWith('###')) {
                                                        return <h4 key={i} className="text-primary font-black uppercase mt-10 mb-4 tracking-tighter text-base md:text-lg border-b border-primary/20 pb-2 flex items-center gap-2"><span className="text-primary opacity-30 text-xs">{'#'}</span> {line.replace('###', '')}</h4>;
                                                    }
                                                    if (line.startsWith('1.') || line.startsWith('-')) {
                                                        return <div key={i} className="pl-4 border-l-2 border-primary/30 my-3 flex gap-4 text-[#E6E6E6] bg-surface/20 py-2 pr-2"><span className="text-primary font-bold opacity-70 select-none">{'>'}</span><span className="pt-[1px]">{line.substring(line.indexOf(' ') + 1)}</span></div>;
                                                    }
                                                    if (line.trim() === '') return <div key={i} className="h-2" />;
                                                    return <p key={i} className="opacity-90">{line}</p>;
                                                })}
                                            </div>
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
