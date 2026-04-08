import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Mail, ArrowUp, Zap, MapPin, Heart } from 'lucide-react';

const SOCIAL = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/soumya7800',                color: '#fff' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/soumya-ranjan-padhi-a8740b296/',    color: '#4A9FFF' },
  { icon: Code2,    label: 'LeetCode', href: 'https://leetcode.com/soumyaranjanpadhi',       color: '#FFB547' },
  { icon: Mail,     label: 'Email',    href: 'mailto:soumyarnpadhi1@gmail.com',              color: '#FF5A7E' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-borderSubtle overflow-hidden">
      {/* Hex grid */}
      <div className="absolute inset-0 hex-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,11,20,0.95) 60%)' }} />
      {/* Top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #3DDBFF, #8B6FFF, transparent)', boxShadow: '0 0 20px rgba(61,219,255,0.4)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 flex flex-col items-center gap-10">
        {/* Logo + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accentSec flex items-center justify-center"
              style={{ boxShadow: '0 0 16px rgba(61,219,255,0.4)' }}>
              <Zap size={14} className="text-background fill-background" />
            </div>
            <span className="font-sans font-black text-xl text-white tracking-tight">
              SOUMYA<span className="text-gradient-accent">.DEV</span>
            </span>
          </div>
          <p className="font-body text-sm text-secondary text-center max-w-[32ch]">
            Backend Engineer crafting scalable, production-ready systems with precision.
          </p>
        </motion.div>

        {/* Social links row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {SOCIAL.map(({ icon: Icon, label, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-11 h-11 glass rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `${color}15`, boxShadow: `0 0 20px ${color}30`, border: `1px solid ${color}40` }} />
              <Icon size={18} className="text-secondary group-hover:text-white relative z-10 transition-colors duration-200" />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-borderSubtle to-transparent" />

        {/* Bottom row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-secondary flex items-center gap-1.5">
            Let's <span className="text-white font-bold">Team Up</span>
          </p>
          <p className="font-sans text-sm text-secondary flex items-center gap-1.5">
            © {new Date().getFullYear()}
            <span className="text-white font-bold mx-1">Soumya Ranjan Padhi</span>
            · Built with
            <Heart size={12} className="text-accent mx-1 fill-accent" />
            &amp; passion
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
              <MapPin size={10} className="text-accent" />
              India
            </div>
            <div className="w-px h-3 bg-borderSubtle" />
            <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: '#2DFFA0' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Available
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 w-11 h-11 glass-high rounded-2xl flex items-center justify-center text-secondary hover:text-accent transition-colors border-glow-animate"
        style={{ border: '1px solid rgba(61,219,255,0.2)' }}
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  );
};
