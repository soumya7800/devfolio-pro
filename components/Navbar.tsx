import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Terminal, Cpu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['skills', 'experience', 'projects', 'system-design', 'certifications', 'achievements'];
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'System Design', href: '#system-design', id: 'system-design' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4'
          : 'bg-transparent border-b border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">

            {/* Logo Area */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center cursor-pointer relative"
            >
              <div className="absolute -inset-2 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="font-mono font-black text-xl tracking-widest uppercase relative z-10 flex items-center gap-2">
                <span className="text-secondary/50 group-hover:text-accent transition-colors">[</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-500">SOUMYA</span>
                <span className="text-accent">.</span>
                <span className="text-primary group-hover:text-white transition-colors">SYS</span>
                <span className="text-secondary/50 group-hover:text-accent transition-colors">]</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className={`relative px-2 py-2 font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 group overflow-hidden ${activeSection === link.id
                      ? 'text-accent'
                      : 'text-secondary hover:text-white'
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-accent transition-transform duration-300 origin-left ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    <span className={`absolute top-0 left-0 w-full h-full bg-accent/5 -z-10 transition-transform duration-300 origin-bottom ${activeSection === link.id ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></span>
                  </a>
                ))}
              </div>

              <a
                href="mailto:soumyarnpadhi1@gmail.com"
                className="relative px-6 py-2.5 bg-transparent text-primary font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 border border-accent/50 hover:border-accent overflow-hidden group transition-colors"
              >
                <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <Terminal size={14} className="relative z-10 text-accent group-hover:text-primary transition-colors" />
                <span className="relative z-10">CONNECT</span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent group-hover:border-primary transition-colors"></span>
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent group-hover:border-primary transition-colors"></span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-secondary hover:text-accent hover:bg-accent/10 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6 animate-fade-in border-b border-borderSubtle">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className={`block px-6 py-4 border-l-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${activeSection === link.id
                  ? 'border-accent text-accent bg-accent/5'
                  : 'border-transparent text-secondary hover:text-white hover:border-white/20 hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {activeSection === link.id && <span className="text-accent text-[10px] animate-pulse">■</span>}
                </div>
              </a>
            ))}
            <a
              href="mailto:soumyarnpadhi1@gmail.com"
              className="mt-8 flex items-center justify-center gap-3 mx-2 py-4 bg-accent/10 text-accent font-mono text-sm tracking-widest uppercase hover:bg-accent hover:text-background border border-accent/20 transition-all duration-300 group"
            >
              <Mail size={18} className="group-hover:text-background transition-colors" />
              INITIATE_CONTACT
            </a>
          </div>
        </div>
      )}
    </>
  );
};