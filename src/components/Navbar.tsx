import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Github, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { RAJ_PROFILE } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Profile avatar source (retains pasted avatar from localStorage or defaults to /profile.png)
  const [avatarSrc, setAvatarSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('raj_custom_avatar') || '/profile.png';
    }
    return '/profile.png';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Selected Works', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Technical Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-50/90 dark:bg-[#07090e]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        
        {/* Zone 1: Brand Zone - Medium-Sized Profile Logo Avatar & Wordmark */}
        <a
          href="#hero"
          className="flex items-center gap-3.5 sm:gap-4 group focus:outline-hidden"
        >
          <div className="relative shrink-0">
            <img
              src={avatarSrc}
              onError={() => {
                if (avatarSrc !== RAJ_PROFILE.avatarUrl) {
                  setAvatarSrc(RAJ_PROFILE.avatarUrl);
                }
              }}
              alt="Raj Profile Logo"
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700/80 shadow-md group-hover:border-indigo-500 dark:group-hover:border-indigo-400 group-hover:scale-105 transition-all duration-200"
            />
            {/* Live active availability dot */}
            <span 
              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#07090e] shadow-xs"
              title="Active & Available for Projects" 
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none">
              {RAJ_PROFILE.name}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 leading-tight mt-1 hidden xs:inline-block">
              Senior Full-Stack & Bot Developer
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 dark:hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 dark:after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (GitHub, Fair Theme Toggle, Contact CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* GitHub link */}
          <a
            href={RAJ_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4.5 h-4.5" />
          </a>

          {/* Fair & Balanced Dark / Night / Light Mode Dual-State Toggle */}
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label={`Current mode: ${theme}. Click to switch to ${theme === 'dark' ? 'Light' : 'Night/Dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Night'} mode`}
            className="relative flex items-center w-14 h-7.5 rounded-full p-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/80 transition-colors duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 select-none"
          >
            {/* Background dual-indicator track icons (fair representation of both states) */}
            <div className="flex items-center justify-between w-full px-0.5 text-slate-400 pointer-events-none">
              <Sun className={`w-3.5 h-3.5 transition-opacity ${theme === 'light' ? 'opacity-0' : 'opacity-60 text-slate-400'}`} />
              <Moon className={`w-3.5 h-3.5 transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-60 text-slate-500'}`} />
            </div>

            {/* Sliding Fair Mode Thumb */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className={`absolute top-0.5 bottom-0.5 w-6 rounded-full shadow-xs flex items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'right-0.5 bg-indigo-600 text-white'
                  : 'left-0.5 bg-white text-amber-500'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5" />
              )}
            </motion.div>
          </button>

          {/* Direct CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Mobile Drawer Profile Header */}
          <div className="flex items-center gap-3.5 px-2 pb-3.5 border-b border-slate-200 dark:border-slate-800">
            <img
              src={avatarSrc}
              onError={() => {
                if (avatarSrc !== RAJ_PROFILE.avatarUrl) {
                  setAvatarSrc(RAJ_PROFILE.avatarUrl);
                }
              }}
              alt="Raj Profile Logo"
              referrerPolicy="no-referrer"
              className="w-13 h-13 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
            />
            <div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-display">
                {RAJ_PROFILE.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Senior Full-Stack & Bot Developer
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Fair Theme Switcher in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Theme Mode
            </span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { if (theme !== 'light') toggleTheme(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                onClick={() => { if (theme !== 'dark') toggleTheme(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
                <span>Night</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <a
                href={RAJ_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-md"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
