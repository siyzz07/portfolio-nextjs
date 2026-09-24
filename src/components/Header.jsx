"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FiArrowUpRight, FiDownload, FiTerminal } from "react-icons/fi";
import profileImg from "../assets/newprofile.jpeg";

function Header() {
  return (
    <header id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          
          {/* Top Visual Card on Mobile / Right on Desktop */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center">
            <div className="relative w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-cyan-500/25 blur-xl sm:blur-2xl pointer-events-none" />

              {/* Modern Glass Card Container */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-900/60 backdrop-blur-sm p-2.5 sm:p-3 shadow-2xl overflow-hidden group">
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={profileImg?.src || profileImg}
                    alt="Shibin Siyad"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content (Under image on mobile, left on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white mb-4 sm:mb-6 leading-[1.15]">
              Shibin Siyad <br />
              <span className="text-gradient">Software Engineer</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 font-normal leading-relaxed">
              I am <span className="text-white font-semibold">Shibin Siyad</span>, a passionate Full Stack & MERN Developer specializing in high-performance web applications, clean architecture, and responsive user interfaces.
            </p>

            {/* Quick Tech Highlights */}
            {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-8 sm:mb-10 max-w-xl">
              {["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-medium rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-indigo-500/30 hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div> */}

            {/* Call to Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <a href="#projects" className="btn-primary w-full sm:w-auto text-center justify-center">
                View My Projects
                <FiArrowUpRight size={18} />
              </a>

              <a
                href="/Shibin_Siyad___Resume.pdf"
                download="Shibin_Siyad_Resume.pdf"
                className="btn-secondary w-full sm:w-auto text-center justify-center"
              >
                <FiDownload size={16} />
                Download CV
              </a>

              {/* Social Link Badges */}
              <div className="flex items-center justify-center gap-2.5 mt-2 sm:mt-0">
                {[
                  { icon: <FaLinkedin size={17} />, href: "https://www.linkedin.com/in/shibin-siyad-k/", label: "LinkedIn" },
                  { icon: <FaGithub size={17} />, href: "https://github.com/siyzz07", label: "GitHub" },
                  { icon: <FaEnvelope size={17} />, href: "mailto:shibinsiyad.k.kdpm@gmail.com", label: "Email" },
                  { icon: <FaInstagram size={17} />, href: "https://www.instagram.com/shibin_siyad__", label: "Instagram" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-500/50 hover:scale-105 active:scale-95 transition-all"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
