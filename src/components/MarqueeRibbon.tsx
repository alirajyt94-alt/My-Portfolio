import React from 'react';
import { motion } from 'motion/react';
import { Bot, Code2, Cpu, Zap, Globe, Sparkles } from 'lucide-react';

const ITEMS = [
  { icon: Bot, text: 'Custom Telegram & Discord Bots' },
  { icon: Code2, text: 'Full-Stack Web Architecture' },
  { icon: Zap, text: 'Sub-Millisecond WebSockets' },
  { icon: Globe, text: 'React 19 & Next.js Platforms' },
  { icon: Cpu, text: 'Event-Driven Microservices' },
  { icon: Sparkles, text: '4+ Years Production Scale' },
  { icon: Bot, text: 'High-Volume Webhook Automation' },
  { icon: Code2, text: 'TypeScript & Node.js Core' },
];

export const MarqueeRibbon: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#07090e]/60 backdrop-blur-xs select-none">
      {/* Side gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#07090e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#07090e] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
      >
        {/* Double the list to allow continuous seamless loop */}
        {[...ITEMS, ...ITEMS].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium tracking-wide uppercase font-mono text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <IconComponent className="w-3.5 h-3.5 text-indigo-500" />
              <span>{item.text}</span>
              <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
