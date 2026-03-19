import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Zap } from 'lucide-react';

const navLinks = [
  { name: 'Skills',        href: '#skills',         id: 'skills' },
  { name: 'Experience',    href: '#experience',      id: 'experience' },
  { name: 'Projects',      href: '#projects',        id: 'projects' },
  { name: 'System Design', href: '#system-design',   id: 'system-design' },
  { name: 'Certs',         href: '#certifications',  id: 'certifications' },
  { name: 'Achievements',  href: '#achievements',    id: 'achievements' },
];

export const Navbar: React.FC = () => {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      let cur = '';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) { cur = id; break; }
        }
      }
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Desktop: OxygenOS Floating Pill ── */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-0.5 px-2.5 py-2 rounded-full transition-all duration-500 relative overflow-hidden ${
            isScrolled ? 'glass-high' : 'glass'
          }`}
          style={{
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: isScrolled
              ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,219,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Inner glow shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mr-1.5 hover:bg-white/5 transition-colors"
          >
            {/* OxygenOS brand dot ring */}
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accentSec/20">
                <div className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: '0 0 6px rgba(61,219,255,0.8)' }} />
              </div>
            </div>
            <span className="font-sans font-black text-sm tracking-tight text-white">SOUMYA</span>
            <span className="font-mono text-[10px] text-accent font-bold">.DEV</span>
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Nav Links */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={e => go(e, link.href)}
                className="relative px-3 py-1.5 rounded-full font-sans text-[11px] font-semibold tracking-wide transition-all duration-200"
                style={{ color: isActive ? '#3DDBFF' : '#9BA8C0' }}
              >
                {/* Active glowing pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(61,219,255,0.08)',
                      border: '1px solid rgba(61,219,255,0.25)',
                      boxShadow: '0 0 12px rgba(61,219,255,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-accent"
                      style={{ boxShadow: '0 0 4px rgba(61,219,255,1)' }} />
                  )}
                  {link.name}
                </span>
              </a>
            );
          })}

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Hire Me */}
          <a
            href="mailto:soumyarnpadhi1@gmail.com"
            className="flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-full font-sans text-[11px] font-bold transition-transform hover:scale-105 duration-250 spin-border group"
            style={{ color: '#3DDBFF', boxShadow: '0 0 15px rgba(61,219,255,0.15)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 pointer-events-none z-0" />
            <Mail size={11} className="relative z-10" />
            <span className="relative z-10">Hire Me</span>
          </a>
        </div>
      </motion.nav>

      {/* ── Mobile header ── */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 py-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass px-4 py-2 rounded-full flex items-center gap-2"
          style={{ border: '1px solid rgba(61,219,255,0.12)' }}
        >
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full border border-accent/40 animate-spin-slow" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/25 to-accentSec/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
          </div>
          <span className="font-sans font-black text-sm text-white">SOUMYA<span className="text-accent">.DEV</span></span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass w-10 h-10 rounded-2xl flex items-center justify-center text-secondary hover:text-accent border border-white/8 transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-24 px-5 pb-10"
            style={{ background: 'rgba(5,8,16,0.97)', backdropFilter: 'blur(30px)' }}
          >
            {/* Background decorations */}
            <div className="absolute inset-0 hex-grid opacity-30 pointer-events-none" />
            <div className="orb orb-1 absolute -top-40 -right-40 opacity-30" />

            <div className="flex flex-col gap-2 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onClick={e => go(e, link.href)}
                    className="flex items-center justify-between px-5 py-4 rounded-2xl font-sans font-semibold text-base transition-all"
                    style={{
                      background: isActive ? 'rgba(61,219,255,0.06)' : 'rgba(255,255,255,0.03)',
                      border: isActive ? '1px solid rgba(61,219,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                      color: isActive ? '#3DDBFF' : '#9BA8C0',
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
                          style={{ boxShadow: '0 0 6px rgba(61,219,255,0.8)' }} />
                      )}
                      {link.name}
                    </span>
                    {isActive && <span className="font-mono text-[9px] tracking-widest text-accent upper">ACTIVE</span>}
                  </motion.a>
                );
              })}

              <motion.a
                href="mailto:soumyarnpadhi1@gmail.com"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                className="mt-3 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-base spin-border transition-transform hover:scale-[1.02]"
                style={{ color: '#3DDBFF', boxShadow: '0 0 20px rgba(61,219,255,0.15)' }}
              >
                <Mail size={16} className="relative z-10" />
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};