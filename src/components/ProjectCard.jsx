"use client";

import { useContext } from "react";
import { projectDataContext } from "../ContextApi/ProjectSample";
import { motion } from "framer-motion";
import { FiExternalLink, FiArrowRight, FiCode } from "react-icons/fi";

function ProjectCard({ title, image, index, cover, stack = [], link }) {
  const { setData } = useContext(projectDataContext);

  return (
    <div className="group rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-white/10 overflow-hidden backdrop-blur-sm hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Preview Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
        
        {/* Project Number Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-slate-300">
          0{index + 1}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-6 md:p-8 flex flex-col justify-between flex-grow">
        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-4">
            {stack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-1.5 sm:px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] sm:text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3 font-normal">
            {cover}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            onClick={() => setData({ index, popup: true })}
            className="inline-flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-semibold text-white hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <span>Details</span>
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              aria-label="Live Demo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-all"
            >
              <FiExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}

export default ProjectCard;
