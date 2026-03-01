import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Achievements: React.FC = () => {
    return (
        <section id="achievements" className="py-24 border-b border-borderSubtle bg-background flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient Vertical Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
                <div className="flex flex-col items-center mb-20 w-full group">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 bg-primary rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse"></span>
                        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-primary">
                            SYSTEM_MILESTONES
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary tracking-tighter uppercase leading-[1.1] text-center"
                    >
                        Achievements
                    </motion.h2>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto group perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-5 gap-[1px] bg-borderSubtle/50 border border-borderSubtle rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(var(--accent),0.05)] transition-shadow duration-500"
                    >
                        {/* Text Content Section */}
                        <div className="md:col-span-3 bg-surface/80 md:p-14 p-8 flex flex-col justify-center relative overflow-hidden backdrop-blur-md">
                            {/* Animated Sweep Line */}
                            <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent group-hover:w-full transition-all duration-700 ease-in-out"></div>

                            {/* Inner Ambient Highlight */}
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"></div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] font-bold text-accent mb-10 uppercase tracking-widest border border-accent/20 bg-accent/5 self-start rounded-sm shadow-[inset_0_0_10px_rgba(var(--accent),0.05)]">
                                <span className="w-1.5 h-1.5 bg-accent rounded-sm shadow-[0_0_5px_rgba(var(--accent),1)] animate-ping"></span>
                                VERIFIED_MILESTONE
                            </div>

                            <div className="flex flex-col mb-8 relative z-10">
                                <span className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter leading-none group-hover:from-white group-hover:to-accent transition-colors duration-500 font-mono tabular-nums">
                                    50
                                </span>
                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary mt-3 border-l-2 border-accent/50 pl-2">
                                    // DAY_PROBLEM_SOLVING_STREAK
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-primary mb-4 tracking-tighter uppercase leading-[1.1] relative z-10">
                                LeetCode Consistent Learner
                            </h3>

                            <p className="font-mono text-sm text-[#D1D1D1] leading-[1.8] mb-10 max-w-md relative z-10">
                                Maintained a 50-day streak of active algorithmic problem solving. Demonstrates a strong conviction to continuous learning and mastering data structures.
                            </p>

                            <a
                                href="https://leetcode.com/medal/?showImg=0&id=9517581&isLevel=false"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between px-5 py-3.5 border border-borderSubtle text-secondary font-mono text-[10px] uppercase tracking-widest font-bold hover:text-accent hover:border-accent/50 transition-all duration-300 bg-background/50 self-start min-w-[220px] group/btn relative overflow-hidden rounded-sm z-10"
                            >
                                {/* Button Glint */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover/btn:animate-[scanline-hz_1s_linear_infinite]"></div>

                                <span className="relative z-10 group-hover/btn:text-white">VIEW_RECORD</span>
                                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:text-accent transition-all relative z-10" />
                            </a>
                        </div>

                        {/* Badge Image Section */}
                        <div className="md:col-span-2 bg-background/50 backdrop-blur-md p-8 relative flex items-center justify-center min-h-[300px] border-t md:border-t-0 md:border-l border-borderSubtle/50 group/badge overflow-hidden">
                            {/* Environmental reflection for image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[60px] opacity-0 group-hover/badge:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            {/* Hexagon Container */}
                            <div
                                className="relative w-[160px] h-[184px] md:w-[200px] md:h-[230px] overflow-hidden flex items-center justify-center border-[1px] border-borderSubtle/50 transition-all duration-500 group-hover/badge:border-accent/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover/badge:shadow-[0_0_40px_rgba(var(--accent),0.2)] z-10"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                }}
                            >
                                <img
                                    src="/badges/Screenshot 2026-02-20 120340.png"
                                    alt="LeetCode 50 Days Badge"
                                    className="w-full h-full max-w-none origin-center absolute object-cover filter contrast-[1.1] grayscale-[0.8] opacity-80 group-hover/badge:grayscale-0 group-hover/badge:contrast-[1.15] group-hover/badge:opacity-100 group-hover/badge:scale-[2.85] transition-all duration-[800ms] ease-out"
                                    style={{
                                        transform: 'scale(2.8) translateY(1.5%)',
                                    }}
                                />
                                {/* Cyberpunk Vignette Overlay */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] group-hover/badge:bg-[radial-gradient(circle_at_center,transparent_50%,rgba(var(--accent),0.1)_100%)] transition-colors duration-500 pointer-events-none mix-blend-multiply"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
