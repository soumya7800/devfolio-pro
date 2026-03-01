import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { SocialType } from '../types';

export const SocialGrid: React.FC = () => {
  const [githubStats, setGithubStats] = useState<string | null>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<string | null>(null);

  useEffect(() => {
    // Fetch GitHub Stats
    const fetchGithubStats = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/soumya7800');
        if (response.ok) {
          const data = await response.json();
          const currentYear = new Date().getFullYear();
          const currentYearContribs = data.total?.[currentYear];

          if (currentYearContribs !== undefined) {
            setGithubStats(`${currentYearContribs} Contributions in ${currentYear}`);
          } else {
            const lastYear = currentYear - 1;
            const lastYearContribs = data.total?.[lastYear] || 0;
            setGithubStats(`${lastYearContribs} Contributions in ${lastYear}`);
          }
        } else {
          const userRes = await fetch('https://api.github.com/users/soumya7800');
          const userData = await userRes.json();
          if (userData.public_repos) {
            setGithubStats(`${userData.public_repos} Public Repositories`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error);
        setGithubStats('Active Contributor');
      }
    };

    // Fetch LeetCode Stats with Fallback
    const fetchLeetCodeStats = async () => {
      const leetCodeUsername = SOCIAL_LINKS.find(link => link.type === SocialType.LEETCODE)?.username || 'soumyaranjanpadhi';

      try {
        // Try Primary API (Heroku - might be sleeping)
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`);
        const data = await response.json();

        if (response.ok && data.status === 'success' && data.totalSolved) {
          setLeetcodeStats(`${data.totalSolved} Questions Solved`);
          return;
        }

        throw new Error("Primary API failed");
      } catch (error) {
        // Try Secondary API (Alfa on Render)
        try {
          const backupResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${leetCodeUsername}/solved`);
          const backupData = await backupResponse.json();

          if (backupResponse.ok && backupData.solvedProblem) {
            setLeetcodeStats(`${backupData.solvedProblem} Questions Solved`);
            return;
          }
        } catch (backupError) {
          console.error("All LeetCode APIs failed", backupError);
        }

        // Final Fallback if all APIs fail - ensures "Loading data..." is removed
        setLeetcodeStats('500+ Questions Solved');
      }
    };

    fetchGithubStats();
    fetchLeetCodeStats();
  }, []);

  return (
    <section id="social" className="py-16 relative bg-background border-b border-borderSubtle overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIAL_LINKS.map((link) => {
            // Determine the dynamic stats to show
            let displayStats = link.stats;
            if (link.type === SocialType.GITHUB && githubStats) {
              displayStats = githubStats;
            }
            if (link.type === SocialType.LEETCODE) {
              if (leetcodeStats) {
                displayStats = leetcodeStats;
              }
            }

            return (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col p-8 bg-surface/50 backdrop-blur-sm border border-borderSubtle hover:border-accent/50 transition-all duration-500 overflow-hidden h-full rounded-sm hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(var(--accent),0.1)]"
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>

                {/* Status line scanning effect */}
                <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent -translate-x-full group-hover:animate-[scanline-hz_2s_linear_infinite]"></div>

                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-secondary group-hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-accent group-hover:animate-pulse transition-colors"></span>
                    {link.type.toUpperCase()}_NODE
                  </div>
                  <div className="p-2 bg-background/80 border border-borderSubtle rounded-sm group-hover:border-accent/30 group-hover:bg-accent/10 transition-colors duration-300">
                    <link.icon className="text-secondary group-hover:text-accent transition-colors" size={20} />
                  </div>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="text-2xl font-black text-primary tracking-tight uppercase group-hover:text-white transition-colors mb-3">
                    {link.label}
                  </h3>
                  <div className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2 group-hover:text-accent/80 transition-colors bg-background/50 inline-flex px-3 py-1.5 border border-borderSubtle group-hover:border-accent/20 rounded-sm">
                    <span className="text-accent animate-pulse">{'>'}</span>
                    <span className="truncate">{displayStats}</span>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 opacity-0 translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
                  <ArrowUpRight size={24} className="text-accent" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};