import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { TiltCard } from './TiltCard';

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "Dec 2023",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
    color: '#3DDBFF',
    neon: '0 0 20px rgba(61,219,255,0.35)',
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Aug 2023",
    skills: ["Cloud Computing", "AWS Services", "Security"],
    link: "#",
    color: '#8B6FFF',
    neon: '0 0 20px rgba(139,111,255,0.35)',
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "Coursera",
    date: "May 2023",
    skills: ["Java", "Algorithmic Thinking", "Optimization"],
    link: "#",
    color: '#3DDBFF',
    neon: '0 0 20px rgba(61,219,255,0.35)',
  },
];

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/6 rounded-full blur-[120px] pointer-events-none animate-breathe" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-accentSec/5 rounded-full blur-[100px] pointer-events-none animate-breathe" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 mb-14"
        >
          <span className="section-label">Credentials</span>
          <h2 className="font-sans font-black text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Certif<span className="text-gradient-accent">ications</span>
          </h2>
        </motion.div>

        {/* Cert cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard intensity={10} className="h-full">
                <a
                  href={cert.link}
                  className="group relative glass-focus glass-highlight rounded-2xl p-6 flex flex-col gap-5 shimmer-card glass-noise overflow-hidden cursor-pointer h-full"
                  style={{
                    border: `1px solid rgba(255,255,255,0.07)`,
                    display: 'flex',
                  }}
                >
                  {/* Noise layer */}
                  <div className="noise-overlay" />
                  {/* Hover glow ring */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
                    style={{ border: `1px solid ${cert.color}40`, boxShadow: cert.neon }} />
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />

                  {/* Icon + verified row */}
                  <div className="flex items-start justify-between relative z-10">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${cert.color}22, ${cert.color}0A)`,
                        border: `1px solid ${cert.color}33`,
                      }}
                    >
                      <Award size={22} style={{ color: cert.color }} />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25">
                      <CheckCircle size={10} className="text-success" />
                      <span className="font-mono text-[9px] font-bold text-success uppercase tracking-widest">Verified</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1 relative z-10">
                    <h3 className="font-sans font-black text-base text-white leading-tight group-hover:text-gradient-accent transition-all">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold" style={{ color: cert.color }}>{cert.issuer}</span>
                      <span className="text-muted">·</span>
                      <span className="font-mono text-xs text-muted">{cert.date}</span>
                    </div>
                  </div>

                  {/* Skills — using chip-tech for certified skills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
                    {cert.skills.map((s) => (
                      <span key={s} className="chip-tech text-[9px] py-0.5 px-2">{s}</span>
                    ))}
                  </div>

                  <ExternalLink size={13} className="absolute bottom-4 right-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
