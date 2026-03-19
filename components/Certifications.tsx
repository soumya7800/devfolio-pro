import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "Dec 2023",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
    accent: 'accent',
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Aug 2023",
    skills: ["Cloud Computing", "AWS Services", "Security"],
    link: "#",
    accent: 'accentSec',
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "Coursera",
    date: "May 2023",
    skills: ["Java", "Algorithmic Thinking", "Optimization"],
    link: "#",
    accent: 'accent',
  },
];

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden border-b border-borderSubtle scroll-mt-24">
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <motion.a
              key={idx}
              href={cert.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative glass rounded-2xl p-6 flex flex-col gap-5 shimmer-card overflow-hidden cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
                style={{ border: '1px solid rgba(61,219,255,0.25)', boxShadow: '0 0 30px rgba(61,219,255,0.08)' }} />

              {/* Icon + title row */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accentSec/10 border border-accent/20 flex items-center justify-center group-hover:border-accent/40 group-hover:shadow-glow-sm transition-all duration-300">
                  <Award size={22} className="text-accent" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25">
                  <CheckCircle size={10} className="text-success" />
                  <span className="font-mono text-[9px] font-bold text-success uppercase tracking-widest">Verified</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-black text-base text-white leading-tight group-hover:text-gradient-accent transition-all">{cert.title}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-accent">{cert.issuer}</span>
                  <span className="text-muted">·</span>
                  <span className="font-mono text-xs text-muted">{cert.date}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {cert.skills.map((s) => (
                  <span key={s} className="chip text-[9px] py-0.5 px-2">{s}</span>
                ))}
              </div>

              {/* View link */}
              <ExternalLink size={13} className="absolute bottom-4 right-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
