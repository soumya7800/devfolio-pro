import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { fetchLeetCodeStats } from '../services/leetcode';
import { Loader2 } from 'lucide-react';

export const Stats: React.FC = () => {
  const [solvedCount, setSolvedCount] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      const leetCodeUsername = SOCIAL_LINKS.find(link => link.label === 'LeetCode')?.username || 'soumyaranjanpadhi';
      const stats = await fetchLeetCodeStats(leetCodeUsername);

      if (stats) {
        setSolvedCount(stats.totalSolved.toString() + '+');
      } else {
        setSolvedCount('500+'); // Fallback
      }
      setIsLoading(false);
    };

    getStats();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden border-b border-borderSubtle">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column: Short Bio */}
          <div className="flex flex-col gap-6 group">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-borderSubtle bg-surface/50 w-fit">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-secondary">
                OS_INFO_PANEL
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase tracking-tight leading-[0.9] mb-4">
              SYSTEM<br />OVERVIEW
            </h2>

            <div className="p-6 md:p-8 bg-surface/40 backdrop-blur-sm border border-borderSubtle relative overflow-hidden group-hover:border-accent/40 transition-colors duration-500">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-primary to-transparent opacity-50"></div>

              <p className="text-[#E6E6E6] leading-[1.8] text-sm md:text-base font-mono relative z-10">
                <span className="text-accent font-bold mr-2">{'>'}</span>
                {PERSONAL_INFO.summary}
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="YEARS_EXPERIENCE"
              value="04+"
            />
            <StatCard
              label="PROJECTS_BUILT"
              value="03+"
            />
            <StatCard
              label="DSA_SOLVED"
              value={solvedCount}
              isLoading={isLoading}
              link={SOCIAL_LINKS.find(link => link.label === 'LeetCode')?.url}
            />
            <StatCard
              label="ARCH_FOCUS"
              value="A+"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  isLoading?: boolean;
  link?: string;
}

const StatCard = ({ label, value, isLoading = false, link }: StatCardProps) => {
  const CardContent = (
    <div className={`relative p-6 md:p-8 bg-surface/30 backdrop-blur-md border border-borderSubtle transition-all duration-500 hover:bg-surface/60 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent),0.1)] hover:-translate-y-1 flex flex-col justify-center items-start h-full min-h-[160px] overflow-hidden ${link ? 'cursor-pointer group' : 'group'}`}>
      {/* Background Hover Gradient */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Top Left Accent */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      {/* Bottom Right Accent */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-3 tracking-tighter font-mono tabular-nums relative z-10 group-hover:text-white transition-colors duration-300">
        {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-accent" /> : value}
      </div>
      <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-secondary flex items-start gap-2 relative z-10 group-hover:text-accent/80 transition-colors duration-300 mt-auto">
        <span className="text-accent mt-[1px]">{'>'}</span>
        <span className="max-w-[120px]">{label}</span>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full relative group/link">
        {CardContent}
        {/* Animated outline for linked cards */}
        <div className="absolute inset-0 border border-accent opacity-0 group-hover/link:opacity-100 scale-105 group-hover/link:scale-100 transition-all duration-500 rounded-sm pointer-events-none"></div>
      </a>
    );
  }

  return CardContent;
};