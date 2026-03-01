import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group h-full flex flex-col border border-borderSubtle bg-surface/30 backdrop-blur-md transition-all duration-500 hover:border-accent/40 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(var(--accent),0.1)] rounded-sm"
        >
            {/* Animated Border Glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Top Row: Header */}
            <div className="flex justify-between items-center p-6 border-b border-borderSubtle/50 bg-surface/50 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-background/80 border border-borderSubtle rounded-sm group-hover:border-accent/30 group-hover:bg-accent/10 transition-colors duration-300">
                        <FolderGit2 className="text-secondary group-hover:text-accent transition-colors" size={20} />
                    </div>
                    <h3 className="font-mono text-base lg:text-lg font-black text-primary uppercase tracking-widest group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <span className="hidden sm:inline-block px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase bg-surface border border-borderSubtle text-secondary">
                        SYSTEM_MODULE
                    </span>
                    <span className="px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase bg-primary text-background">
                        ACTIVE
                    </span>
                </div>
            </div>

            {/* Middle Content Grid */}
            <div className="flex flex-col lg:flex-row flex-grow relative z-10">
                {/* Left: Overview & Features */}
                <div className="p-6 lg:p-8 lg:w-2/3 border-b lg:border-b-0 lg:border-r border-borderSubtle/50 flex flex-col gap-8">
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-accent mb-3 tracking-widest font-bold">
                            <span className="w-1.5 h-1.5 bg-accent opacity-50"></span>
                            OVERVIEW
                        </div>
                        <p className="font-mono text-sm text-[#D1D1D1] leading-[1.8] mb-6">
                            {project.overview}
                        </p>
                    </div>
                    {project.features && project.features.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-accent mb-4 tracking-widest font-bold">
                                <span className="w-1.5 h-1.5 bg-accent opacity-50"></span>
                                CAPABILITIES
                            </div>
                            <ul className="flex flex-col gap-3">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="font-mono text-accent text-xs mt-[2px] opacity-70">{'>>'}</span>
                                        <span className="font-mono text-sm text-secondary group-hover:text-[#E6E6E6] transition-colors">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right: Tech Stack & Links */}
                <div className="p-6 lg:p-8 lg:w-1/3 flex flex-col justify-between bg-surface/20">
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-accent mb-4 tracking-widest font-bold">
                            <span className="w-1.5 h-1.5 bg-accent opacity-50"></span>
                            TECH_STACK
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase bg-background/50 border border-borderSubtle text-secondary hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-300 rounded-sm cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-3">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full p-4 border border-borderSubtle text-secondary hover:text-accent hover:border-accent/50 hover:bg-surface/80 transition-all duration-300 group/btn relative overflow-hidden rounded-sm"
                            >
                                {/* Button Hover Glint */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover/btn:animate-[scanline-hz_1s_linear_infinite]"></div>

                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase relative z-10">SOURCE_CODE</span>
                                <Github size={16} className="group-hover/btn:text-accent transition-colors relative z-10" />
                            </a>
                        )}
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full p-4 bg-primary text-background font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-white transition-colors group/btn relative overflow-hidden rounded-sm"
                            >
                                <span className="relative z-10 group-hover/btn:text-black">INITIALIZE</span>
                                <ExternalLink size={16} className="relative z-10 group-hover/btn:text-black" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
