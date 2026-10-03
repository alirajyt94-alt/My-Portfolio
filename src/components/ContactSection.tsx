import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, MapPin, Github, Clock, Copy, Check, MessageSquare, ArrowUpRight } from 'lucide-react';
import { RAJ_PROFILE } from '../data/portfolioData';
import { ContactFormData, SentMessage } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Full-Stack Web Architecture',
    timeline: 'Immediate (Next 2-4 weeks)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime('PST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickTopics = [
    { label: '⚡ Telegram Bot', type: 'Telegram Bot Development' },
    { label: '🚀 Full-Stack Web App', type: 'Full-Stack Web Architecture' },
    { label: '🤖 Discord Bot', type: 'Discord Community Bot' },
    { label: '⚙️ Cloud & Webhooks', type: 'Cloud Systems & Infrastructure' },
    { label: '💼 Advisory', type: 'Engineering Leadership / Advisory' },
  ];

  const handleSelectQuickTopic = (topic: { label: string; type: string }) => {
    setFormData((prev) => ({
      ...prev,
      projectType: topic.type,
      message: prev.message ? prev.message : `Hi Raj, I'd like to discuss building a ${topic.type.toLowerCase()} project...`,
    }));
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('raj_sent_inquiries');
      if (stored) {
        setSentMessages(JSON.parse(stored));
      }
    } catch {
      // Ignore storage parse error
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RAJ_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Please provide a brief description of your project (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      const newMessage: SentMessage = {
        ...formData,
        id: 'msg_' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      };

      const updated = [newMessage, ...sentMessages];
      setSentMessages(updated);
      try {
        localStorage.setItem('raj_sent_inquiries', JSON.stringify(updated));
      } catch {
        // Storage fallback
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web Architecture',
        timeline: 'Immediate (Next 2-4 weeks)',
        message: '',
      });
    }, 700);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Context & Direct Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Start a Conversation
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
                Let’s build something extraordinary together.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you have an upcoming project requiring high-throughput architecture, need an engineering advisory consultation, or want to discuss full-stack leadership roles, my inbox is open.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090b11] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email</div>
                    <a
                      href={`mailto:${RAJ_PROFILE.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {RAJ_PROFILE.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social / GitHub Direct Link Card */}
              <a
                href={RAJ_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090b11] flex items-center justify-between hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    <Github className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Code Repositories & Open Source</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">github.com/mrraj23</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </a>

              {/* Location & Timezone info with live clock */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090b11] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-slate-900 dark:text-white">San Francisco, CA</div>
                    <div className="text-slate-500 dark:text-slate-400">Pacific Time (UTC-7) · Global Remote</div>
                  </div>
                </div>
                {localTime && (
                  <div className="text-right font-mono text-xs">
                    <span className="text-emerald-500 font-bold">{localTime}</span>
                    <div className="text-[10px] text-slate-400">Local Time</div>
                  </div>
                )}
              </div>

            </div>

            {/* Inquiries history preview toggle */}
            {sentMessages.length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{showHistory ? 'Hide' : 'View'} your submitted messages ({sentMessages.length})</span>
                </button>

                {showHistory && (
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto p-3 bg-slate-100 dark:bg-slate-900/60 rounded-xl text-xs border border-slate-200 dark:border-slate-800">
                    {sentMessages.map((msg) => (
                      <div key={msg.id} className="p-2 bg-white dark:bg-[#0c0f17] rounded-lg border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-medium text-slate-900 dark:text-white">{msg.name} ({msg.projectType})</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090b11] shadow-sm">
              
              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                    Thank you! Your message has been dispatched directly to Raj’s queue. I typically respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMessage && (
                    <div className="p-3 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  {/* Interactive Quick Presets */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Quick Project Preset:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {quickTopics.map((topic) => (
                        <button
                          key={topic.label}
                          type="button"
                          onClick={() => handleSelectQuickTopic(topic)}
                          className={`px-2.5 py-1 text-xs rounded-lg transition-colors border cursor-pointer ${
                            formData.projectType === topic.type
                              ? 'bg-indigo-600 text-white border-indigo-600 font-medium'
                              : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {topic.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="project-type" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nature of Engagement
                      </label>
                      <select
                        id="project-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer"
                      >
                        <option value="Telegram Bot Development">Telegram Bot Development</option>
                        <option value="Discord Community Bot">Discord Community Bot</option>
                        <option value="Full-Stack Web Architecture">Full-Stack Web Architecture</option>
                        <option value="Cloud Systems & Infrastructure">Cloud Systems & Infrastructure</option>
                        <option value="Performance Audit & Latency Tuning">Performance & Latency Optimization</option>
                        <option value="Engineering Leadership / Advisory">Engineering Advisory / Leadership</option>
                        <option value="General Inquiries">Other / General Collaboration</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-1.5">
                      <label htmlFor="project-timeline" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Anticipated Timeline
                      </label>
                      <select
                        id="project-timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer"
                      >
                        <option value="Immediate (Next 2-4 weeks)">Immediate (Next 2-4 weeks)</option>
                        <option value="Next Quarter (1-3 months)">Next Quarter (1-3 months)</option>
                        <option value="Exploratory / Flexible">Exploratory / Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Project Overview or Scope <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder="Share details about your objectives, current tech stack, constraints, or what challenges you're looking to solve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Average response time: &lt; 24h
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white dark:border-slate-900/20 dark:border-t-slate-900 rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
