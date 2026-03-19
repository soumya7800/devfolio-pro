import React from 'react';
import { motion } from 'framer-motion';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';

const LEETCODE_URL = 'https://leetcode.com/u/soumyaranjanpadhi/';

const STATIC_STATS = [
  { value: '10+', label: 'Projects Built', sublabel: 'Full-stack & Backend', neon: '0 0 30px rgba(139,111,255,0.5)', color: '#8B6FFF', href: null },
  { value: '2+',  label: 'Years Coding',   sublabel: 'Since 2022',           neon: '0 0 30px rgba(61,219,255,0.5)',  color: '#3DDBFF', href: null },
  { value: '3',   label: 'Certifications', sublabel: 'Cloud · Java · AI',    neon: '0 0 30px rgba(139,111,255,0.5)', color: '#8B6FFF', href: null },
];

// Shared card styles
const cardBase = "group relative glass rounded-2xl px-6 py-8 flex flex-col gap-2 overflow-hidden shimmer-card";
const cardStyle = { border: '1px solid rgba(255,255,255,0.07)' };

const TopAccentLine: React.FC<{ color: string; glow: string }> = ({ color, glow }) => (
  <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
    style={{ background: color, boxShadow: glow }} />
);

const InnerGlow: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
    style={{ background: `radial-gradient(ellipse at top left, ${color} 0%, transparent 60%)` }} />
);

export const Stats: React.FC = () => {
  const { stats, state } = useLeetCodeStats('soumyaranjanpadhi');

  // Determine displayed value for DSA card
  const dsaValue = (state === 'done' || state === 'fresh') && stats
    ? `${stats.solved}`
    : state === 'fetching' || state === 'waking'
      ? '···'
      : '226'; // last known value as fallback

  const dsaSublabel = (state === 'done' || state === 'fresh') && stats
    ? `${stats.easy}E · ${stats.medium}M · ${stats.hard}H`
    : 'LeetCode · Live';

  return (
    <section className="py-16 relative overflow-hidden border-b border-borderSubtle">
      <div className="absolute inset-0 hex-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0" style={{ background: 'rgba(7,11,20,0.7)' }} />

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* ── DSA card — live from LeetCode ── */}
          <motion.a
            href={LEETCODE_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`${cardBase} cursor-pointer`}
            style={cardStyle}
          >
            <TopAccentLine color="#3DDBFF" glow="0 0 8px rgba(61,219,255,0.8)" />
            <InnerGlow color="rgba(61,219,255,0.05)" />

            {/* Live badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                style={{ boxShadow: '0 0 4px #2DFFA0' }} />
              <span className="font-mono text-[8px] text-success tracking-widest uppercase">Live</span>
            </div>

            <motion.span
              key={dsaValue}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-sans font-black leading-none"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                color: '#3DDBFF',
                textShadow: '0 0 30px rgba(61,219,255,0.5)',
              }}
            >
              {dsaValue}
            </motion.span>
            <span className="font-sans font-bold text-sm text-white">DSA Problems</span>
            <span className="font-mono text-[10px] text-muted">{dsaSublabel}</span>
          </motion.a>

          {/* ── Static stats ── */}
          {STATIC_STATS.map((stat, i) => {
            const idx = i + 1; // for alternating color logic
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`${cardBase} cursor-default`}
                style={cardStyle}
              >
                <TopAccentLine color={stat.color} glow={`0 0 8px ${stat.color}`} />
                <InnerGlow color={idx % 2 === 0 ? 'rgba(61,219,255,0.05)' : 'rgba(139,111,255,0.05)'} />

                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.09 + 0.3 }}
                  className="font-sans font-black leading-none"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                    color: stat.color,
                    textShadow: stat.neon,
                  }}
                >
                  {stat.value}
                </motion.span>
                <span className="font-sans font-bold text-sm text-white">{stat.label}</span>
                {stat.sublabel && <span className="font-mono text-[10px] text-muted">{stat.sublabel}</span>}
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};