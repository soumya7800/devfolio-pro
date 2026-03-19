import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, BookOpen, FolderGit2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative glass rounded-2xl overflow-hidden shimmer-card glass-noise flex flex-col h-full cursor-default"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Hover gradient border */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{ border: '1px solid rgba(61,219,255,0.3)', boxShadow: '0 0 40px rgba(61,219,255,0.1), inset 0 0 40px rgba(61,219,255,0.03)' }}
      />
      {/* Top glow line */}
      <motion.div
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
        style={{ transformOrigin: 'left', position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, #3DDBFF, #8B6FFF, transparent)', zIndex: 10 }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-5 border-b border-borderSubtle bg-surfaceDeep/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/15 to-accentSec/10 border border-accent/20 flex items-center justify-center">
            <FolderGit2 size={16} className="text-accent" />
          </div>
          <h3 className="font-sans font-black text-base text-white tracking-tight group-hover:text-gradient-accent transition-all">
            {project.title}
          </h3>
        </div>
        <span className="px-2 py-1 rounded-full bg-success/10 border border-success/25 font-mono text-[9px] font-bold text-success uppercase tracking-widest">
          Active
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-grow">
        {/* Left: Overview + Features */}
        <div className="flex-1 p-6 flex flex-col gap-5 lg:border-r border-borderSubtle">
          <div>
            <p className="font-mono text-[10px] text-accent font-bold tracking-widest uppercase mb-2">Overview</p>
            <p className="font-body text-sm text-secondary leading-relaxed">{project.overview}</p>
          </div>
          {project.features && project.features.length > 0 && (
            <div>
              <p className="font-mono text-[10px] text-accentSec font-bold tracking-widest uppercase mb-3">Capabilities</p>
              <ul className="flex flex-col gap-2.5">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0 opacity-70" />
                    <span className="font-body text-sm text-secondary">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Tech + Actions */}
        <div className="lg:w-52 xl:w-60 p-6 flex flex-col justify-between gap-5 bg-surfaceDeep/30">
          <div>
            <p className="font-mono text-[10px] text-accent font-bold tracking-widest uppercase mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="chip text-[9px] py-1 px-2">{tech}</span>
              ))}
            </div>
          </div>

          {/* Hover actions - slide up reveal */}
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {hovered && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="font-mono text-[9px] text-muted tracking-widest uppercase mb-1"
                >
                  Quick Actions
                </motion.p>
              )}
            </AnimatePresence>

            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl glass
                  border border-borderSubtle hover:border-accent/30 hover:bg-accent/5
                  font-sans text-xs font-semibold text-secondary hover:text-white
                  transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="flex items-center gap-2">
                  <Github size={13} />
                  Source Code
                </span>
                <ExternalLink size={11} className="opacity-50" />
              </motion.a>
            )}
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl
                  spin-border transition-transform hover:scale-105 duration-200
                  font-sans text-xs font-bold text-accent"
                style={{ boxShadow: '0 0 15px rgba(61,219,255,0.1)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="flex items-center gap-2 relative z-10">
                  <ExternalLink size={13} />
                  Live Demo
                </span>
              </motion.a>
            )}
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl glass
                border border-accentSec/20 hover:border-accentSec/40 hover:bg-accentSec/5
                font-sans text-xs font-semibold text-accentSec
                transition-all duration-200"
            >
              <BookOpen size={13} />
              Case Study
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
