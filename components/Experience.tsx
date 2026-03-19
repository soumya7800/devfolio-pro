import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';

const experiences = [
  {
    role: "Software Development Intern",
    company: "Tech Startups Inc.",
    location: "Bangalore, India",
    type: "Internship",
    duration: "Jan 2024 – Present",
    description: [
      "Developed scalable REST APIs using Node.js and Express, improving system throughput by 20%.",
      "Collaborated with the frontend team to integrate React components with backend services.",
      "Optimized database queries in MongoDB, reducing response time by 30%.",
      "Implemented automated testing pipelines using Jest and CI/CD workflows.",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Jest", "CI/CD"],
    active: true,
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    location: "Remote",
    type: "Contract",
    duration: "Jun 2023 – Dec 2023",
    description: [
      "Built responsive and interactive UIs using React and Tailwind CSS.",
      "Translated Figma designs into pixel-perfect code ensuring cross-browser compatibility.",
      "Improved website performance scores by 25% through asset optimization and lazy loading.",
      "Integrated third-party APIs for payment gateways and social authentication.",
    ],
    tech: ["React", "Tailwind CSS", "Figma", "REST APIs"],
    active: false,
  },
];

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const scaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24" ref={containerRef}>
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accentSec/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 mb-16"
        >
          <span className="section-label">Career</span>
          <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Work <span className="text-gradient-accent">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-borderSubtle" />
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, #3DDBFF, #8B6FFF, #3DDBFF)', boxShadow: '0 0 12px rgba(61,219,255,0.4)', transformOrigin: 'top', scaleY }}
            />
          </div>

          <div className="flex flex-col gap-10 pb-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-8 md:gap-12 pl-16 md:pl-20 group"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-5 w-12 md:w-16 flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    exp.active
                      ? 'border-accent bg-accent/20 shadow-glow-sm'
                      : 'border-accentSec/50 bg-accentSec/10 group-hover:border-accentSec group-hover:shadow-glow-sec'
                  }`}>
                    {exp.active && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div className="w-full">
                  <div
                    className="group/card glass-focus glass-highlight glass-noise rounded-2xl p-6 md:p-8 shimmer-card overflow-hidden transition-all duration-400 relative"
                    style={{ border: exp.active ? '1px solid rgba(61,219,255,0.2)' : '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {/* Noise overlay on card */}
                    <div className="noise-overlay" />
                    {/* Top gradient line */}
                    <div className={`absolute top-0 left-0 right-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-400 ${
                      exp.active ? 'bg-gradient-to-r from-accent via-accentSec to-transparent' : 'bg-gradient-to-r from-accentSec via-accent/50 to-transparent'
                    }`} />

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/15 to-accentSec/10 border border-accent/20 flex items-center justify-center">
                            <Briefcase size={15} className="text-accent" />
                          </div>
                          <h3 className="font-sans font-black text-xl text-white">{exp.role}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 ml-12">
                          <span className="font-mono text-xs font-bold text-accent">@{exp.company}</span>
                          <span className="text-muted">·</span>
                          <span className="flex items-center gap-1 font-mono text-[11px] text-secondary">
                            <MapPin size={10} /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:shrink-0">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase ${
                          exp.active
                            ? 'bg-accent/10 border border-accent/25 text-accent'
                            : 'bg-accentSec/10 border border-accentSec/25 text-accentSec'
                        }`}>
                          {exp.active && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                          {exp.type}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/8 font-mono text-[10px] text-secondary">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="flex flex-col gap-3 mb-5">
                      {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-accent mt-2.5 shrink-0 opacity-60" />
                          <p className="font-body text-sm text-secondary leading-relaxed">{point}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-borderSubtle">
                      {exp.tech.map((t) => (
                        <span key={t} className="chip-tech text-[10px]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
