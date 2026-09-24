"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projectsDetails } from "./DatasOfProject";
import { FiFolder, FiGithub, FiArrowRight } from "react-icons/fi";

function Projects() {
  const featuredProjects = projectsDetails.slice(0, 4);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-28 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <FiFolder size={14} />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected <span className="text-gradient">Projects</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              <span>View All Projects</span>
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <a
              href="https://github.com/siyzz07"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
            >
              <FiGithub size={18} />
              <span className="hidden sm:inline">Explore on GitHub</span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Project Grid (4 featured projects: 2x2 on mobile/tablet, 4 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/projects"
            className="btn-primary inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 text-sm sm:text-base font-semibold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>View All ({projectsDetails.length}) Projects</span>
            <FiArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Projects;
