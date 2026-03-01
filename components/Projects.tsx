import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative bg-background border-b border-borderSubtle border-t overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 -right-[20%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-borderSubtle/50 group">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 mb-6 group-hover:bg-accent/10 transition-colors duration-300">
              <span className="w-1.5 h-1.5 bg-accent rounded-sm shadow-[0_0_8px_rgba(var(--accent),0.6)] animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent">
                SYSTEM_MODULES
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent/50 tracking-tighter uppercase">
              Projects
            </h2>
          </div>

          <a
            href="https://github.com/soumya7800"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 mt-6 md:mt-0 font-mono text-sm uppercase tracking-widest text-secondary hover:text-accent transition-colors border border-borderSubtle px-6 py-3 bg-surface/50 backdrop-blur-sm hover:border-accent/50 hover:bg-surface relative overflow-hidden"
          >
            {/* Hover Glint */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover/link:animate-[scanline-hz_1.5s_linear_infinite]"></div>

            <span className="relative z-10">VIEW_FULL_ARCHIVE</span>
            <ArrowRight size={16} className="relative z-10 group-hover/link:translate-x-1 group-hover/link:text-accent transition-all" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="h-full">
              <ProjectCard
                project={project}
                index={idx}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};