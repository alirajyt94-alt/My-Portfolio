import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Layers, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0c0f17]/90 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.clientOrDomain}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>
            <h2 id="modal-title" className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-6 sm:space-y-8">
          
          {/* Project Media Banner */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-video w-full">
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8">
                <Layers className="w-12 h-12 mb-3 text-indigo-400" />
                <p className="text-sm font-medium">{project.title}</p>
                <p className="text-xs text-slate-500">Architecture & System Specification</p>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                loading="eager"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Live action links badge in media */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950/90 hover:bg-slate-900 rounded-md backdrop-blur-md transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950/90 hover:bg-slate-900 rounded-md backdrop-blur-md transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>

          {/* Subtitle & Role */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {project.subtitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.summary}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Role:</span> {project.role}
            </div>
          </div>

          {/* Measured Quantitative Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl font-bold font-display text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Architectural Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Zap className="w-4 h-4" />
                <span>The Architectural Challenge</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>The Engineering Solution</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Architectural Highlights */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Engineering Highlights
            </h4>
            <div className="space-y-2.5">
              {project.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack List (Zero-pill: clean text with bullet separators or subtle tokens) */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="flex items-center gap-3">
                  <span>{tech}</span>
                  {idx < project.techStack.length - 1 && <span className="text-slate-300 dark:text-slate-700">·</span>}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0c0f17]/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400">
            Press ESC or click outside to dismiss
          </span>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Launch Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
