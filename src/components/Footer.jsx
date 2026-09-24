"use client";

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-slate-950 border-t border-white/5 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Bio */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-xs">
                S
              </div>
              <span className="font-bold tracking-wider text-sm text-white">
                SHIBIN SIYAD
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Full Stack MERN Developer • Built with Next.js & Tailwind CSS
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                { icon: <FaGithub size={16} />, href: "https://github.com/siyzz07", label: "GitHub" },
                { icon: <FaLinkedin size={16} />, href: "https://www.linkedin.com/in/shibin-siyad-k/", label: "LinkedIn" },
                { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/shibin_siyad__", label: "Instagram" },
                { icon: <FaEnvelope size={16} />, href: "mailto:shibinsiyad.k.kdpm@gmail.com", label: "Email" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <FiArrowUp size={16} />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-400 font-mono">
          © {new Date().getFullYear()} Shibin Siyad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
