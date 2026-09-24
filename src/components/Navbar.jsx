"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import { useTheme } from "../ContextApi/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname?.startsWith("/projects") ? "projects" : "home"
  );

  useEffect(() => {
    if (pathname?.startsWith("/projects")) {
      setActiveSection("projects");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection on home page
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <nav
          className={`
            pointer-events-auto flex items-center justify-between px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300
            ${scrolled 
              ? "bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl shadow-black/40 w-full max-w-4xl" 
              : "bg-slate-900/40 backdrop-blur-sm border border-white/5 w-full max-w-5xl"
            }
          `}
        >
          {/* Brand Logo */}
          <Link
            href="/#home"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-bold tracking-wider text-sm text-white group-hover:text-indigo-400 transition-colors">
              SHIBIN<span className="text-indigo-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 border border-white/5">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/Shibin_Siyad___Resume.pdf"
              download="Shibin_Siyad_Resume.pdf"
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <FiDownload size={13} />
              <span>Resume</span>
            </a>

            <a
              href="https://github.com/siyzz07"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiGithub size={15} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 hover:text-white"
          >
            {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-slate-900/95 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-200 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="/Shibin_Siyad___Resume.pdf"
                download="Shibin_Siyad_Resume.pdf"
                className="btn-primary text-xs py-2 px-4"
              >
                <FiDownload size={14} />
                Download CV
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/siyzz07"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-200"
                >
                  <FiGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shibin-siyad-k/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-200"
                >
                  <FiLinkedin size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
