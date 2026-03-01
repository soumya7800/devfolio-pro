import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const certifications = [
    {
        title: "Full Stack Web Development",
        issuer: "Udemy",
        date: "Dec 2023",
        skills: ["React", "Node.js", "MongoDB", "Express"],
        link: "#"
    },
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Aug 2023",
        skills: ["Cloud Computing", "AWS Services", "Security"],
        link: "#"
    },
    {
        title: "Data Structures & Algorithms",
        issuer: "Coursera",
        date: "May 2023",
        skills: ["Java", "Algorithmic Thinking", "Optimization"],
        link: "#"
    }
];

export const Certifications: React.FC = () => {
    return (
        <section id="certifications" className="py-24 relative bg-background border-b border-borderSubtle overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col items-start mb-20 group">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 bg-accent rounded-sm shadow-[0_0_8px_rgba(var(--accent),0.6)] animate-pulse"></span>
                        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent">
                            VERIFIED_CREDENTIALS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent/50 tracking-tighter uppercase mb-6">
                        Certifications
                    </h2>
                </div>

                {/* Desktop Verification Table */}
                <div className="hidden md:block w-full border border-borderSubtle/50 bg-surface/20 backdrop-blur-sm rounded-sm overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-5 border-b border-borderSubtle/50 bg-surface/80">
                        <div className="col-span-5 font-mono text-[10px] font-bold tracking-widest uppercase text-secondary flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/30"></span>CERTIFICATION</div>
                        <div className="col-span-3 font-mono text-[10px] font-bold tracking-widest uppercase text-secondary flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/30"></span>ISSUER</div>
                        <div className="col-span-2 font-mono text-[10px] font-bold tracking-widest uppercase text-secondary flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/30"></span>DATE</div>
                        <div className="col-span-2 font-mono text-[10px] font-bold tracking-widest uppercase text-secondary text-right">STATUS</div>
                    </div>
                    {certifications.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.link}
                            className="grid grid-cols-12 gap-4 p-5 border-b border-borderSubtle/50 bg-background/30 hover:bg-surface/60 transition-all duration-300 items-center group cursor-pointer last:border-0 relative overflow-hidden"
                        >
                            {/* Hover Scanline */}
                            <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="col-span-5 font-bold text-primary text-sm lg:text-base uppercase tracking-tight group-hover:text-white transition-colors flex items-center gap-4 relative z-10">
                                <div className="p-1.5 bg-background border border-borderSubtle rounded-sm group-hover:border-accent/30 group-hover:bg-accent/10 transition-colors">
                                    <Award size={16} className="text-secondary group-hover:text-accent transition-colors" />
                                </div>
                                {cert.title}
                            </div>
                            <div className="col-span-3 font-mono text-xs text-[#D1D1D1] group-hover:text-white transition-colors relative z-10">{cert.issuer}</div>
                            <div className="col-span-2 font-mono tabular-nums text-xs text-secondary group-hover:text-primary transition-colors relative z-10">{cert.date}</div>
                            <div className="col-span-2 flex justify-end relative z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase bg-accent/5 border border-accent/20 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-background rounded-sm">
                                    <span className="w-1 h-1 bg-accent group-hover:bg-background rounded-full animate-pulse"></span>
                                    VERIFIED
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Mobile Verification List */}
                <div className="md:hidden flex flex-col gap-4 border border-borderSubtle/50 bg-surface/20 backdrop-blur-sm p-4 rounded-sm">
                    {certifications.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.link}
                            className="block border border-borderSubtle p-5 bg-background/50 hover:bg-surface/80 transition-colors group relative overflow-hidden rounded-sm"
                        >
                            {/* Hover Scanline */}
                            <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="font-mono tabular-nums text-[10px] tracking-widest uppercase text-[#D1D1D1] group-hover:text-white transition-colors">
                                    <span className="text-accent opacity-70">{'//'}</span> {cert.issuer} <span className="text-secondary mx-1">|</span> {cert.date}
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[9px] font-bold tracking-widest uppercase bg-accent/5 border border-accent/20 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-background rounded-sm">
                                    VERIFIED
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-primary uppercase tracking-tight group-hover:text-white flex items-start gap-3 transition-colors relative z-10">
                                <div className="p-1.5 bg-background border border-borderSubtle rounded-sm group-hover:border-accent/30 group-hover:bg-accent/10 transition-colors shrink-0 mt-[2px]">
                                    <Award size={14} className="text-secondary group-hover:text-accent transition-colors" />
                                </div>
                                <span className="leading-snug">{cert.title}</span>
                            </h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
