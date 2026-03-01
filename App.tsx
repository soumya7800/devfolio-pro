import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialGrid } from './components/SocialGrid';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { SystemDesign } from './components/SystemDesign';
import { Certifications } from './components/Certifications';
import { Stats } from './components/Stats';
import { Achievements } from './components/Achievements';
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Welcome animation load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Scroll Observer for animations
  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [isLoading]);

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-surfaceSecondary relative edge-light">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="welcome-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center p-4 border-[8px] border-surface"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-start gap-8 max-w-md w-full relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-12 -left-12 w-24 h-24 border-l-2 border-t-2 border-accent/30 rounded-tl-xl opacity-50"></div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-xl opacity-50"></div>

              {/* Terminal Block */}
              <div className="font-mono text-sm text-secondary w-full border border-accent/20 bg-surface/50 p-6 shadow-[0_0_30px_rgba(var(--accent),0.1)] backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                <div className="space-y-3 relative z-10">
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <span className="text-accent">{'>'}</span> SYSTEM.WAKE()
                  </motion.p>
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                    <span className="text-accent">{'>'}</span> ESTABLISHING_NEURAL_LINK...
                  </motion.p>
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
                    <span className="text-accent">{'>'}</span> DECRYPTING_ASSETS [OK]
                  </motion.p>
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7 }} className="text-primary font-bold">
                    <span className="text-accent animate-pulse">{'>'}</span> ACCESS GRANTED. WELCOME_
                  </motion.p>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full relative space-y-2">
                <div className="flex justify-between w-full font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    BOOT_SEQ // V.2.0.0
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-accent"
                  >
                    100%
                  </motion.span>
                </div>

                <div className="w-full h-1 bg-surface border border-accent/20 relative overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                    className="h-full bg-accent relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-[pulse_1s_ease-in-out_infinite]"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />

            <main className="relative z-10 w-full overflow-x-hidden">
              <Hero />

              <div className="max-w-7xl mx-auto px-6 space-y-0 pb-24">
                <SocialGrid />
                <Stats />
                <Skills />
                <Experience />
                <Projects />
                <SystemDesign />
                <Certifications />
                <Achievements />
              </div>

              {/* Footer */}
              <footer className="py-8 text-center border-t border-borderSubtle bg-background">
                <p className="font-mono text-xs uppercase tracking-widest text-secondary group flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-accent inline-block"></span>
                  © {new Date().getFullYear()} SOUMYA RANJAN PADHI <span className="opacity-50">| ALL RIGHTS RESERVED</span>
                </p>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;