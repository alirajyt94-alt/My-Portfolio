import React from 'react';
import { ArrowUp, Github, Mail } from 'lucide-react';
import { RAJ_PROFILE } from '../data/portfolioData';
import { SystemPerformanceWidget } from './SystemPerformanceWidget';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#07090e] pt-4 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unobtrusive System Performance Dashboard */}
        <SystemPerformanceWidget />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand mark & copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-base font-bold font-display text-slate-900 dark:text-white">
              {RAJ_PROFILE.name}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              © {currentYear} Raj. All rights reserved. Crafted with clean architecture & zero-slop discipline.
            </span>
          </div>

          {/* Quiet links & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={RAJ_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Raj GitHub Profile"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${RAJ_PROFILE.email}`}
              aria-label="Send Email to Raj"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
