import React from 'react';
import { Briefcase, Cpu, ShieldCheck, Terminal, Award } from 'lucide-react';
import { WORK_EXPERIENCES, SKILL_GROUPS, RAJ_PROFILE } from '../data/portfolioData';

export const AboutExperience: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* About & Philosophy Section */}
      <section id="about" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Header Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Background & Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
                Bridging systems engineering & frontend mastery.
              </h2>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-2 space-y-1">
                <div>// Based in San Francisco, CA</div>
                <div>// 4+ Years Production Experience</div>
                <div>// Full-Stack Web & Bot Development</div>
              </div>
            </div>

            {/* Right Narrative & Principles */}
            <div className="lg:col-span-8 space-y-8 text-slate-600 dark:text-slate-300">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                I believe software engineering should be treated with the same precision as industrial design: every byte over the network should carry intent, every micro-interaction should feel weightless, and distributed backends must maintain deterministic consensus even during edge partitions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                    01. Low Latency First
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Optimizing critical render paths, zero-copy buffers, and WebAssembly computation to keep UIs locking strictly at 60 FPS.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                    02. Type-Safe Invariants
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    End-to-end schema validation from PostgreSQL tables through gRPC/REST contracts directly to client-side UI components.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                    03. Resilient Simplicity
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Rejecting unnecessary abstraction layers in favor of observable, clean, and easily debugged modular architectures.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Career Trajectory
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Work Experience & Milestones
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A track record of leading high-scale engineering initiatives, authoring architecture standards, and scaling production systems.
            </p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
            {WORK_EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group space-y-3">
                {/* Timeline node marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-400 group-hover:scale-125 transition-transform" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {exp.company} <span className="text-slate-400 dark:text-slate-600">·</span> <span className="text-xs text-slate-500 dark:text-slate-400">{exp.location}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {exp.period}
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">›</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills unboxed text */}
                <div className="text-xs font-mono text-slate-500 dark:text-slate-500 pt-1">
                  {exp.skills.join(' · ')}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Technical Stack Section */}
      <section id="skills" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Core Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Technologies & Infrastructure
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Languages, libraries, and cloud platforms utilized across production web applications and mission-critical services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090b11] space-y-5"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <h3 className="text-sm font-bold font-display uppercase tracking-wider text-slate-900 dark:text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {skill.level}
                        </span>
                      </div>
                      {/* Subtle skill strength bar */}
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            skill.level === 'Expert'
                              ? 'w-[95%] bg-indigo-600 dark:bg-indigo-500'
                              : skill.level === 'Advanced'
                              ? 'w-[82%] bg-indigo-500/80 dark:bg-indigo-400/80'
                              : 'w-[70%] bg-indigo-400/70 dark:bg-indigo-300/70'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
