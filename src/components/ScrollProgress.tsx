import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-200/30 dark:bg-slate-800/30 pointer-events-none"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-cyan-400 origin-left shadow-xs"
        style={{ scaleX }}
      />
    </div>
  );
};
