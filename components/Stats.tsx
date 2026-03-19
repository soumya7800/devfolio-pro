import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';
import { ExternalLink } from 'lucide-react';

const LEETCODE_URL = 'https://leetcode.com/u/soumyaranjanpadhi/';

// ── Animated counter hook ─────────────────────────────────────────────────
function useCountUp(target: number | null, duration = 1400): string {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === null) return;
    const start = performance.now();
    const from = 0;
    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      setDisplay(String(current));
      if (progress < 1) rafRef.current = requestAnimationFrame(update);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// ── Single stat card ──────────────────────────────────────────────────────
interface StatProps {
  value: string | null;
  suffix?: string;
  label: string;
  sublabel: string;
  color: string;
  neon: string;
  delay: number;
  href?: string;
  liveIndicator?: boolean;
  animate?: boolean;
}

const StatCard: React.FC<StatProps> = ({
  value, suffix = '', label, sublabel, color, neon, delay, href, liveIndicator, animate,
}) => {
  // Only animate numeric values
  const numericTarget = animate && value !== null && !isNaN(Number(value)) ? Number(value) : null;
  const counted = useCountUp(numericTarget);
  const displayed = numericTarget !== null ? counted + suffix : (value ?? '···') + suffix;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      className="group relative glass-focus rounded-2xl px-6 py-8 flex flex-col gap-2 overflow-hidden shimmer-card glass-noise glass-highlight h-full"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />
      {/* Top neon accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-all duration-400"
        style={{ background: color, boxShadow: neon }}
      />
      {/* Radial inner glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${color}0D 0%, transparent 65%)` }}
      />

      {/* Live badge */}
      {liveIndicator && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
            style={{ boxShadow: '0 0 5px #2DFFA0' }} />
          <span className="font-mono text-[8px] text-success tracking-widest uppercase">Live</span>
        </div>
      )}
      {href && !liveIndicator && (
        <ExternalLink
          size={10}
          className="absolute top-3 right-3 text-muted/50 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}

      {/* Value */}
      <motion.span
        key={displayed}
        initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="font-sans font-black leading-none tabular-nums glow-number"
        style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
          color,
        }}
      >
        {displayed}
      </motion.span>

      <span className="font-sans font-bold text-sm text-white">{label}</span>
      <span className="font-body text-[11px] text-muted">{sublabel}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
};

// ── Stats section ─────────────────────────────────────────────────────────
export const Stats: React.FC = () => {
  const { stats, state } = useLeetCodeStats('soumyaranjanpadhi');

  const isDone = state === 'done';
  const dsaValue = stats ? String(stats.solved) : null;   // show whenever available
  const dsaSublabel = stats
    ? `${stats.easy}E · ${stats.medium}M · ${stats.hard}H`
    : state === 'loading' ? 'Fetching live…' : 'LeetCode · Live';

  return (
    <section className="py-16 relative overflow-hidden border-b border-borderSubtle">
      <div className="absolute inset-0 hex-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* DSA — live + counter */}
          <StatCard
            value={dsaValue}
            label="DSA Problems"
            sublabel={dsaSublabel}
            color="#3DDBFF"
            neon="0 0 30px rgba(61,219,255,0.5)"
            delay={0}
            href={LEETCODE_URL}
            liveIndicator
            animate
          />
          {/* Projects */}
          <StatCard
            value="10"
            suffix="+"
            label="Projects Built"
            sublabel="Full-stack & Backend"
            color="#8B6FFF"
            neon="0 0 30px rgba(139,111,255,0.5)"
            delay={0.09}
            animate
          />
          {/* Years */}
          <StatCard
            value="2"
            suffix="+"
            label="Years Coding"
            sublabel="Since 2022"
            color="#3DDBFF"
            neon="0 0 30px rgba(61,219,255,0.5)"
            delay={0.18}
            animate
          />
          {/* Certs */}
          <StatCard
            value="3"
            label="Certifications"
            sublabel="Cloud · Java · AI"
            color="#8B6FFF"
            neon="0 0 30px rgba(139,111,255,0.5)"
            delay={0.27}
            animate
          />
        </div>
      </div>
    </section>
  );
};