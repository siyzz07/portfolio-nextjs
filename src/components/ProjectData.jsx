"use client";

import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { projectDataContext } from "../ContextApi/ProjectSample";
import { projectsDetails } from "./DatasOfProject";
import { FiX, FiExternalLink, FiGithub, FiLayers, FiPlay, FiInfo } from "react-icons/fi";

function ProjectData() {
  const { data, setData } = useContext(projectDataContext);
  const project = projectsDetails[data?.index ?? 0];

  useEffect(() => {
    if (data?.popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [data?.popup]);

  if (!data?.popup || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setData({ ...data, popup: false })}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[88vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
              Case Study & Details
            </h4>
          </div>

          <button
            onClick={() => setData({ ...data, popup: false })}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-8">
          
          {/* Media Section: Video preview or Hero Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 aspect-[16/9] w-full">
            {project.vedio ? (
              <video
                src={project.vedio}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Title & Tech Badges */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug">
              {project.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project Overview */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>{project.description1}</p>
              {project.description2 && <p className="text-slate-400">{project.description2}</p>}
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  <FiExternalLink size={15} />
                  Live Preview
                </a>
              )}

              <a
                href="https://github.com/siyzz07"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-2.5 px-5"
              >
                <FiGithub size={15} />
                Repository
              </a>
            </div>

            <button
              onClick={() => setData({ ...data, popup: false })}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Close Window [Esc]
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default ProjectData;
