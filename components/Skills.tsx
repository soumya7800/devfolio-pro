import React from 'react';
import { Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '../constants';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-background scroll-mt-24 border-b border-borderSubtle">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-start mb-16 group">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/30 bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors duration-300">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent),0.8)]"></span>
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent">
              CORE_COMPETENCIES
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-accent/50 tracking-tighter uppercase relative">
            Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className={`group relative p-8 bg-surface/40 backdrop-blur-md border border-borderSubtle hover:border-accent/40 transition-all duration-500 overflow-hidden ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}`}
            >
              {/* Card Hover Glow */}
              <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

              {/* Tech Line Top */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

              <div className="flex items-center gap-4 mb-8 pt-2 border-t border-accent/50 relative z-10 w-fit">
                <div className="p-2 bg-background/80 border border-borderSubtle rounded-sm group-hover:border-accent/30 group-hover:bg-accent/10 transition-colors duration-300">
                  <category.icon size={16} className="text-secondary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-sm font-black tracking-tight uppercase text-secondary group-hover:text-primary transition-colors">{category.title}</h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-background/50 border border-borderSubtle text-secondary font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-300 cursor-default flex items-center leading-none rounded-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};