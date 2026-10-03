import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUpRight, Copy, Check, Bot, Terminal, Activity, Zap, Play, Sparkles } from 'lucide-react';
import { RAJ_PROFILE } from '../data/portfolioData';

type WorkbenchTab = 'config' | 'bot' | 'metrics';

export const Hero: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('config');
  
  // Interactive bot simulator state
  const [botOutput, setBotOutput] = useState<string[]>([
    '🤖 [Bot Engine v3.4] Ready & listening on webhook port 8443...',
    '⚡ Connected to Telegram Gateway (gateway.telegram.org)',
    'Type or click a command below to test live execution:',
  ]);
  const [isBotExecuting, setIsBotExecuting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RAJ_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleRunBotCommand = (cmd: string) => {
    if (isBotExecuting) return;
    setIsBotExecuting(true);
    
    let response = '';
    if (cmd === '/ping') {
      response = `🟢 Pong! Round-trip latency: ${(12 + Math.floor(Math.random() * 8))}ms | Status: 200 OK`;
    } else if (cmd === '/stack') {
      response = '🛠️ Stack: React 19, Next.js, Node.js, Telegram Bot API, Discord.js, TypeScript, PostgreSQL, Docker';
    } else if (cmd === '/status') {
      response = '✅ Status: Available for full-stack contracts, bot automation, and systems architecture';
    } else if (cmd === '/contact') {
      response = `📬 Email: ${RAJ_PROFILE.email} | GitHub: ${RAJ_PROFILE.github}`;
    } else {
      response = `⚙️ Executed ${cmd} successfully. 0 errors logged.`;
    }

    setBotOutput((prev) => [...prev.slice(-6), `> ${cmd}`, response]);
    setTimeout(() => {
      setIsBotExecuting(false);
    }, 200);
  };

  const configSnippet = `const developer = {
  handle: "mrraj23",
  role: "Full-Stack Web & Bot Developer",
  experience: "4+ years in production",
  stack: ["React 19", "TypeScript", "Node.js", "Bots"],
  status: "Available for select projects",
};`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(configSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle dynamic background ambient orbs */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-cyan-500/10 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-2/3 right-10 w-[400px] h-[300px] bg-gradient-to-br from-indigo-600/10 via-emerald-500/5 to-transparent blur-3xl -z-10 pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Split Hero */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability status line */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Select Projects</span>
              <span aria-hidden="true">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">4+ Years Production Experience</span>
              <span aria-hidden="true">·</span>
              <span>San Francisco & Global Remote</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] font-display text-balance">
              Building scalable web applications & high-volume automated bots.
            </h1>

            {/* Sub-headline prose */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Hello, I’m <span className="font-semibold text-slate-900 dark:text-white">{RAJ_PROFILE.name}</span> — a senior full-stack web developer and bot developer with <span className="font-semibold text-slate-900 dark:text-white">4+ years</span> of production engineering. I create high-performance web products, event-driven Telegram & Discord bots, and resilient cloud architectures.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-102 shadow-sm"
              >
                <span>Explore Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-102 shadow-xs"
              >
                <span>Initiate Contact</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{RAJ_PROFILE.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Proof Metrics Grid */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {RAJ_PROFILE.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Multi-Tab Workbench & Bot Playground */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Glow border ring behind console */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xs opacity-30 dark:opacity-40 group-hover:opacity-60 transition duration-1000 -z-10" />

              {/* Code Terminal Workbench Window */}
              <div className="rounded-2xl overflow-hidden bg-[#0c0f17] border border-slate-800 shadow-2xl font-mono text-xs">
                
                {/* Window Header with Clickable Tabs */}
                <div className="px-4 py-2.5 bg-[#131722] border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    
                    {/* Tabs */}
                    <div className="flex items-center ml-3 gap-1">
                      <button
                        onClick={() => setActiveTab('config')}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          activeTab === 'config'
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        profile.ts
                      </button>
                      <button
                        onClick={() => setActiveTab('bot')}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                          activeTab === 'bot'
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Bot className="w-3 h-3 text-indigo-400" />
                        <span>botConsole</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('metrics')}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          activeTab === 'metrics'
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        metrics.sh
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleCopySnippet}
                    aria-label="Copy snippet"
                    className="text-slate-400 hover:text-white p-1 rounded-sm transition-colors cursor-pointer"
                    title="Copy snippet"
                  >
                    {copiedSnippet ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Tab 1: Profile Config Code */}
                {activeTab === 'config' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 space-y-3 text-slate-300 leading-relaxed overflow-x-auto"
                  >
                    <div className="text-slate-500">// 4+ Years Production Experience</div>
                    <div>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-indigo-300">developer</span> = &#123;
                    </div>
                    <div className="pl-4 space-y-1">
                      <div>
                        <span className="text-slate-400">name:</span>{' '}
                        <span className="text-emerald-400">"Raj"</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">role:</span>{' '}
                        <span className="text-emerald-400">"Senior Full-Stack & Bot Dev"</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">experience:</span>{' '}
                        <span className="text-amber-300">"4+ years in production"</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">github:</span>{' '}
                        <span className="text-cyan-300">"github.com/mrraj23"</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">coreStack:</span> [
                      </div>
                      <div className="pl-4 text-emerald-300">
                        "React 19", "Next.js", "Node.js",<br />
                        "Telegram Bots", "Discord.js"
                      </div>
                      <div>],</div>
                      <div>
                        <span className="text-slate-400">uptime:</span>{' '}
                        <span className="text-emerald-400">"99.99%"</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">status:</span>{' '}
                        <span className="text-amber-400">"Available for Projects"</span>
                      </div>
                    </div>
                    <div>&#125;;</div>

                    {/* Status footer */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Webhook Active</span>
                      </span>
                      <span className="font-mono text-slate-500">latency: 14ms</span>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Interactive Bot Console Simulator */}
                {activeTab === 'bot' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 space-y-3"
                  >
                    <div className="h-44 overflow-y-auto bg-black/40 rounded-lg p-3 text-[11px] space-y-1.5 font-mono text-slate-300 border border-slate-800/60">
                      {botOutput.map((line, idx) => (
                        <div 
                          key={idx} 
                          className={
                            line.startsWith('>') 
                              ? 'text-cyan-400 font-bold' 
                              : line.startsWith('🟢') || line.startsWith('✅')
                              ? 'text-emerald-300'
                              : 'text-slate-300'
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </div>

                    {/* Quick interactive command buttons */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Click to execute command:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['/ping', '/stack', '/status', '/contact'].map((cmd) => (
                          <button
                            key={cmd}
                            onClick={() => handleRunBotCommand(cmd)}
                            disabled={isBotExecuting}
                            className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded transition-colors font-mono cursor-pointer flex items-center gap-1"
                          >
                            <Play className="w-2.5 h-2.5 text-indigo-400 group-hover:text-white" />
                            <span>{cmd}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 3: System Metrics Telemetry */}
                {activeTab === 'metrics' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 space-y-4"
                  >
                    <div className="text-slate-400 text-xs">// Live Node & Bot Telemetry</div>
                    
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>WebSocket Event Loop Latency</span>
                          <span className="text-emerald-400 font-bold">14.2ms</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[18%] h-full bg-emerald-500 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Message Queue Throughput</span>
                          <span className="text-indigo-400 font-bold">120k req/s</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[84%] h-full bg-indigo-500 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Service SLA Uptime</span>
                          <span className="text-cyan-400 font-bold">99.99%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[99.9%] h-full bg-cyan-500 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                      Multi-region clusters: US-West, EU-Central, AP-Southeast
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Accolade badge */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-3.5 shadow-lg flex items-center gap-3 w-full sm:w-auto">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">4+ Years Production Experience</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Full-Stack Web & Bot Automation</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
