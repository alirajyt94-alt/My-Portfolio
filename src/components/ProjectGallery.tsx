import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, Layers, Eye } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const ProjectGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Cloud & Systems', 'Web Platforms', 'AI & Spatial', 'Open Source'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Selected Works & Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight text-balance">
              High-impact engineering projects built for production reliability.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Each system reflects architectural rigor: sub-millisecond data feeds, resilient fault-tolerance, and polished user interaction models.
            </p>
          </div>

          {/* Interactive Filter Controls - Functional Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <span className="sr-only">Filter projects by category</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeFilterIndicator"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento & Masonry Gallery Grid with Framer Motion */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Prominent bento span for first card when on All filter
              const isWideCard = selectedCategory === 'All' && index === 0;
              const gridClass = isWideCard
                ? 'lg:col-span-8'
                : index === 1 && selectedCategory === 'All'
                ? 'lg:col-span-4'
                : 'lg:col-span-6';

              const hasImageFailed = failedImages[project.id];

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  }}
                  whileTap={{ scale: 0.995 }}
                  className={`${gridClass} group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#090b11] overflow-hidden transition-colors duration-200 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-950/20`}
                >
                  {/* Visual Media Container */}
                  <div 
                    className={`relative overflow-hidden bg-slate-950 cursor-pointer ${isWideCard ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
                    onClick={() => setActiveModalProject(project)}
                  >
                    {hasImageFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
                        <Layers className="w-10 h-10 text-indigo-400 mb-2" />
                        <div className="text-base font-semibold">{project.title}</div>
                        <div className="text-xs text-slate-400 mt-1">{project.subtitle}</div>
                      </div>
                    ) : (
                      <motion.img
                        src={project.image}
                        alt={`${project.title} interface preview`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}

                    {/* Gradient Scrim for media overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                    {/* Top-right quick inspect overlay with motion */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-md">
                        <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>View Specs</span>
                      </span>
                    </div>

                    {/* Bottom metrics teaser inside media */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-indigo-300 font-medium">
                          {project.metrics[0]?.label}: {project.metrics[0]?.value}
                        </span>
                        <span className="text-slate-300">
                          {project.metrics[1]?.label}: {project.metrics[1]?.value}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    
                    <div className="space-y-2">
                      {/* Unboxed Metadata (Zero-pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.clientOrDomain}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="text-left cursor-pointer focus:outline-hidden"
                        >
                          {project.title}
                        </button>
                      </h3>

                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {project.subtitle}
                      </p>

                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech stack inline text (Zero-pill: unboxed text with dot separators) */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate max-w-[65%]">
                        {project.techStack.slice(0, 4).join(' · ')}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source code for ${project.title}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="View Source on GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Fullscreen/Modal Specs Viewer */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
