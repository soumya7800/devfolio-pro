import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Mail, Terminal, Cpu, Database, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { motion } from 'framer-motion';

const ROLES = [
  "Java Backend Engineer",
  "Full Stack Developer",
  "UI/UX Designer",
  "DSA Problem Solver",
  "System Design Enthusiast",
  "Critical Thinker"
];

export const Hero: React.FC = () => {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 30 : 80;
    const pauseTime = 1500;

    const timeout = setTimeout(() => {
      if (!isDeleting && roleText.length < currentRole.length) {
        setRoleText(currentRole.slice(0, roleText.length + 1));
      } else if (isDeleting && roleText.length > 0) {
        setRoleText(currentRole.slice(0, roleText.length - 1));
      } else if (!isDeleting && roleText.length === currentRole.length) {
        // Pause handled below
      } else if (isDeleting && roleText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typeSpeed);

    if (!isDeleting && roleText.length === currentRole.length) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => { clearTimeout(timeout); clearTimeout(pauseTimeout); };
    }

    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex]);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 text-primary border-b border-borderSubtle">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-[0.15]"></div>
        {/* Glow Effects */}
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute bottom-1/4 -right-64 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 order-2 lg:order-1 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-3 mb-6 -ml-[2px]">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold">
                [ SYSTEM_READY ]
              </span>
            </div>
            <div className="flex flex-col relative z-20 group cursor-default leading-[0.8] mb-2 -ml-[4px] md:-ml-[8px]">
              <motion.div
                initial={{ opacity: 0, y: 50, scaleY: 0.8 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="origin-bottom"
              >
                <h1 className="text-[5.5rem] md:text-[8rem] lg:text-[11.5rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-accent/50 group-hover:skew-x-[4deg] group-hover:drop-shadow-[0_0_20px_rgba(var(--accent),0.5)] transition-all duration-700">
                  SOUMYA
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50, scaleY: 0.8 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="origin-bottom mt-[-2%]"
              >
                <h1 className="text-[5.5rem] md:text-[8rem] lg:text-[11.5rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-accent to-white/90 group-hover:-skew-x-[4deg] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-700">
                  PADHI
                </h1>
              </motion.div>
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl font-mono text-white/90 mb-8 tracking-[0.12em] uppercase font-bold">
              {PERSONAL_INFO.role}
            </p>

            <p className="text-base sm:text-lg text-[#E6E6E6] max-w-[52ch] leading-[1.6] mb-12 font-mono">
              {PERSONAL_INFO.bio}
            </p>

            {/* Metadata Strip */}
            <div className="flex flex-col sm:flex-row border border-borderSubtle bg-surface max-w-[640px]">
              <div className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-b sm:border-b-0 sm:border-r border-borderSubtle">
                <MapPin size={14} strokeWidth={1.5} className="text-secondary" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-secondary font-bold text-center mt-[1px]">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-b sm:border-b-0 sm:border-r border-borderSubtle">
                <Globe size={14} strokeWidth={1.5} className="text-secondary" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-secondary font-bold text-center mt-[1px]">REMOTE_OK</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 px-6 py-4">
                <Terminal size={14} strokeWidth={1.5} className="text-secondary" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-secondary font-bold text-center mt-[1px]">AVAILABLE</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <a
                href="#projects"
                className="group relative flex items-center justify-center min-w-[260px] h-[54px] bg-accent/10 text-accent font-mono text-[10px] font-bold tracking-widest uppercase border border-accent/50 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--accent),0.3)] hover:border-accent"
              >
                <span className="absolute inset-0 w-full h-full bg-accent translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-background transition-colors duration-300">
                  EXECUTE_VIEW_PROJECTS
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center min-w-[260px] h-[54px] bg-transparent text-primary font-mono text-[10px] font-bold tracking-widest uppercase border border-borderSubtle overflow-hidden transition-colors hover:border-primary"
              >
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                  DOWNLOAD_SYS_RESUME
                  <Terminal size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Specs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 order-1 lg:order-2 flex flex-col pt-16 lg:pt-14"
          >
            <div className="border border-borderSubtle bg-background/50 backdrop-blur-sm p-6 flex flex-col gap-6 relative group overflow-hidden hover:border-accent/50 transition-colors duration-500">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Rectangular Image Frame */}
              <div className="w-full aspect-square md:aspect-[4/5] lg:aspect-square relative border border-borderSubtle overflow-hidden bg-background">
                {/* Image Hologram Effect */}
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 z-20 mix-blend-overlay transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute -inset-full w-[200%] h-[200%] bg-[linear-gradient(transparent_0%,rgba(var(--accent),0.1)_50%,transparent_100%)] animate-[scanline_3s_linear_infinite] z-20 pointer-events-none opacity-0 group-hover:opacity-100"></div>

                {/* Thin overlay crosshairs */}
                <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-accent/50 z-10"></div>
                <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-accent/50 z-10"></div>
                <div className="absolute left-0 top-1/2 h-[1px] w-4 bg-accent/50 z-10"></div>
                <div className="absolute right-0 top-1/2 h-[1px] w-4 bg-accent/50 z-10"></div>

                <img
                  src="/profile_v2.jpg"
                  alt="Soumya Ranjan Padhi"
                  className="w-full h-full object-cover filter contrast-[1.1] grayscale opacity-80 mix-blend-luminosity transition-all duration-700 group-hover:grayscale-[0.2] group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-105"
                />
              </div>

              <hr className="border-borderSubtle" />

              {/* System Tags */}
              <div className="flex flex-col gap-4 font-mono text-[10px] tracking-widest uppercase">
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-bold">SYSTEM_STATUS</span>
                  <span className="text-accent font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-bold">DATA_NODE</span>
                  <span className="text-accent font-bold">CONNECTED</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};