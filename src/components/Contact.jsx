"use client";

import { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaCopy, FaCheck } from "react-icons/fa";
import { FiSend, FiMapPin, FiMessageSquare } from "react-icons/fi";

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "shibinsiyad.k.kdpm@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-28 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Main Card */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 p-8 sm:p-14 lg:p-16 text-center backdrop-blur-md shadow-2xl overflow-hidden">
          
          {/* Subtle Top Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-6">
              <FiMessageSquare size={14} />
              Let's Connect
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Have a Project in Mind? <br />
              <span className="text-gradient">Let's Build It Together.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mb-10 leading-relaxed font-normal">
              Whether you are looking for a full-stack developer for full-time opportunities, high-impact freelance work, or technical consulting, I am always ready to collaborate.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <a
                href={`mailto:${email}`}
                className="btn-primary"
              >
                <FiSend size={16} />
                Send Email
              </a>

              <a
                href="https://wa.me/+918606399420"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <FaWhatsapp className="text-emerald-400" size={18} />
                Chat on WhatsApp
              </a>

              <button
                onClick={handleCopy}
                className="btn-secondary"
                title="Copy Email Address"
              >
                {copied ? <FaCheck className="text-emerald-400" size={14} /> : <FaCopy size={14} />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
            </div>

            {/* Social Channels */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[
                { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/shibin-siyad-k/", label: "LinkedIn" },
                { icon: <FaGithub size={18} />, href: "https://github.com/siyzz07", label: "GitHub" },
                { icon: <FaEnvelope size={18} />, href: `mailto:${email}`, label: "Email" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/50 hover:scale-105 active:scale-95 transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <FiMapPin className="text-indigo-400" />
              <span>Kerala, India • Open to Worldwide Remote Roles</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;
