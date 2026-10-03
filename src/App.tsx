/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { ProjectGallery } from './components/ProjectGallery';
import { AboutExperience } from './components/AboutExperience';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07090e] dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
        {/* Scroll Progress Bar at very top of viewport */}
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          <Hero />
          <MarqueeRibbon />
          <ProjectGallery />
          <AboutExperience />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
