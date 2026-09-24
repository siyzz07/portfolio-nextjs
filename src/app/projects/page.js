"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiFolder, FiGithub, FiSearch } from "react-icons/fi";
import { projectsDetails } from "@/components/DatasOfProject";
import ProjectCard from "@/components/ProjectCard";
import ProjectData from "@/components/ProjectData";
import { projectDataContext } from "@/ContextApi/ProjectSample";
import InteractiveBackground from "@/components/InteractiveBackground";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AllProjectsPage() {
  const context = useContext(projectDataContext);
  const data = context?.data || { popup: false, index: null };
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsDetails.filter((project) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.cover?.toLowerCase().includes(query) ||
      project.stack?.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="relative min-h-screen text-foreground selection:bg-indigo-500/30 selection:text-white">
      {/* Background Effect */}
      <InteractiveBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow pt-28 sm:pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            
            {/* Top Breadcrumb / Back Link */}
            <div className="mb-8">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 hover:text-white transition-colors group px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/40"
              >
                <FiArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  All Projects & <span className="text-gradient">Case Studies</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-normal">
                  A comprehensive showcase of production applications, full-stack systems, architectural clones, and open-source contributions.
                </p>
              </div>

              <a
                href="https://github.com/siyzz07"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary self-start md:self-end flex items-center gap-2 text-xs sm:text-sm"
              >
                <FiGithub size={16} />
                <span>GitHub Profile</span>
              </a>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mb-10 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 pointer-events-none transition-colors z-10" size={18} />
              <input
                type="text"
                placeholder="Search projects by title or stack (e.g. React, Node, MongoDB)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-16 py-3.5 text-xs sm:text-sm rounded-2xl bg-slate-900/80 border border-white/15 text-white placeholder-slate-400 backdrop-blur-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-xl shadow-black/30 relative z-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 text-xs font-mono text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Projects Grid (2 columns on mobile/tablet, 3 on desktop) */}
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.index ?? index}
                    {...project}
                    index={project.index ?? index}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-white/5">
                <p className="text-slate-400 text-base">No projects found matching "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-xs font-mono text-indigo-400 hover:underline cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}

          </div>
        </main>

        <Footer />
      </div>

      {/* Case Study Modal Popup */}
      <AnimatePresence>
        {data?.popup && <ProjectData />}
      </AnimatePresence>
    </div>
  );
}
