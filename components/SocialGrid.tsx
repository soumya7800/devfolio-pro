import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';

const LEETCODE_USERNAME = 'soumyaranjanpadhi';

const platformMeta: Record<string, { glow: string; border: string; bg: string; label: string }> = {
  GitHub:   { glow: '0 0 30px rgba(255,255,255,0.2)',  border: 'rgba(255,255,255,0.25)',  bg: 'rgba(255,255,255,0.06)',  label: '#fff' },
  LinkedIn: { glow: '0 0 30px rgba(10,102,194,0.4)',   border: 'rgba(10,102,194,0.35)',   bg: 'rgba(10,102,194,0.08)',   label: '#4A9FFF' },
  LeetCode: { glow: '0 0 30px rgba(255,161,22,0.4)',   border: 'rgba(255,161,22,0.35)',   bg: 'rgba(255,161,22,0.08)',   label: '#FFB547' },
  Email:    { glow: '0 0 30px rgba(255,90,126,0.4)',   border: 'rgba(255,90,126,0.35)',   bg: 'rgba(255,90,126,0.08)',   label: '#FF5A7E' },
};

// ── LeetCode Card — live solved count ─────────────────────────────────────
const LeetCodeCard: React.FC<{ link: typeof SOCIAL_LINKS[0]; idx: number }> = ({ link, idx }) => {
  const { stats, state } = useLeetCodeStats(LEETCODE_USERNAME);
  const meta = platformMeta.LeetCode;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.97 }}
      className="group relative glass rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer overflow-hidden shimmer-card"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Corner brackets on hover */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderTop: `1.5px solid ${meta.border}`, borderLeft: `1.5px solid ${meta.border}` }} />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderBottom: `1.5px solid ${meta.border}`, borderRight: `1.5px solid ${meta.border}` }} />

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
        style={{ boxShadow: `${meta.glow}, inset 0 0 30px ${meta.bg}`, border: `1px solid ${meta.border}` }} />

      {/* Icon circle */}
      <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: meta.bg, boxShadow: `inset 0 0 20px ${meta.bg}` }} />
        <link.icon size={26} className="relative z-10 text-secondary" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-2xl">
          <link.icon size={26} style={{ color: meta.label }} />
        </div>
      </div>

      {/* Content */}
      <div className="text-center relative z-10 flex flex-col items-center gap-1">
        <p className="font-sans font-bold text-sm text-white">LeetCode</p>
        <p className="font-mono text-[10px] text-secondary">{link.username}</p>

        {/* Live solved count */}
        <AnimatePresence mode="wait">
          {state === 'fetching' && (
            <motion.span key="fetching"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-mono text-[11px] mt-1 animate-pulse" style={{ color: meta.label }}>
              Fetching...
            </motion.span>
          )}
          {state === 'waking' && (
            <motion.span key="waking"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-mono text-[10px] mt-1 text-center leading-snug" style={{ color: '#aaa' }}>
              Waking API<br />
              <span className="text-[9px] text-muted">please wait ~30s</span>
            </motion.span>
          )}
          {(state === 'done' || state === 'fresh') && stats && (
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-1 mt-0.5">
              {/* Big solved number */}
              <span className="font-mono text-[15px] font-black"
                style={{ color: meta.label, textShadow: `0 0 16px ${meta.label}80` }}>
                {stats.solved} Solved
              </span>
              {/* E / M / H breakdown */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold" style={{ color: '#2DFFA0' }}>{stats.easy}E</span>
                <div className="w-px h-2.5 bg-white/15" />
                <span className="font-mono text-[9px] font-bold" style={{ color: '#FFB547' }}>{stats.medium}M</span>
                <div className="w-px h-2.5 bg-white/15" />
                <span className="font-mono text-[9px] font-bold" style={{ color: '#FF6B9D' }}>{stats.hard}H</span>
              </div>
            </motion.div>
          )}
          {state === 'error' && (
            <motion.span key="error"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-mono text-[10px] mt-1 text-muted">
              {stats ? `${stats.solved} Solved` : 'Visit Profile →'}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <ExternalLink size={11} className="absolute top-3 right-3 text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  );
};

// ── Generic card for GitHub / LinkedIn / Email ────────────────────────────
const GenericCard: React.FC<{ link: typeof SOCIAL_LINKS[0]; idx: number }> = ({ link, idx }) => {
  const meta = platformMeta[link.label] || platformMeta.Email;
  return (
    <motion.a
      href={link.url}
      target={link.label === 'Email' ? undefined : '_blank'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.97 }}
      className="group relative glass rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer overflow-hidden shimmer-card"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="absolute top-2.5 left-2.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderTop: `1.5px solid ${meta.border}`, borderLeft: `1.5px solid ${meta.border}` }} />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderBottom: `1.5px solid ${meta.border}`, borderRight: `1.5px solid ${meta.border}` }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
        style={{ boxShadow: `${meta.glow}, inset 0 0 30px ${meta.bg}`, border: `1px solid ${meta.border}` }} />

      <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: meta.bg, boxShadow: `inset 0 0 20px ${meta.bg}` }} />
        <link.icon size={26} className="relative z-10 text-secondary" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-2xl">
          <link.icon size={26} style={{ color: meta.label }} />
        </div>
      </div>

      <div className="text-center relative z-10">
        <p className="font-sans font-bold text-sm text-white">{link.label}</p>
        <p className="font-mono text-[10px] text-secondary mt-0.5 truncate max-w-[110px]">{link.username}</p>
        {link.stats && (
          <p className="font-mono text-[11px] mt-1 font-bold" style={{ color: meta.label }}>{link.stats}</p>
        )}
      </div>

      <ExternalLink size={11} className="absolute top-3 right-3 text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  );
};

// ── Section ───────────────────────────────────────────────────────────────
export const SocialGrid: React.FC = () => (
  <section className="py-20 relative overflow-hidden border-b border-borderSubtle">
    <div className="absolute top-0 right-0 w-96 h-96 bg-accentSec/10 rounded-full blur-[100px] pointer-events-none" />
    <div className="relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-3 mb-12"
      >
        <span className="section-label">Connect</span>
        <h2 className="font-sans font-black tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          Find Me <span className="text-gradient-accent text-neon">Online</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SOCIAL_LINKS.map((link, idx) =>
          link.label === 'LeetCode'
            ? <LeetCodeCard key="lc" link={link} idx={idx} />
            : <GenericCard  key={link.label} link={link} idx={idx} />
        )}
      </div>
    </div>
  </section>
);