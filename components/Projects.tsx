import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-accentSec/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="flex flex-col gap-3">
            <span className="section-label">Portfolio</span>
            <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Featured <span className="text-gradient-accent">Projects</span>
            </h2>
          </div>
          <motion.a
            href="https://github.com/soumya7800"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 glass px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-secondary hover:text-white border border-borderSubtle hover:border-accent/30 transition-all duration-250 self-start md:self-auto"
          >
            View All on GitHub
            <ArrowRight size={15} />
          </motion.a>
        </motion.div>

        {/* Projects list */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};