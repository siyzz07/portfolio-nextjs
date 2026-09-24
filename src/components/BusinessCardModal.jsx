"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaGlobe, 
  FaCheck, 
  FaCopy,
  FaAddressCard,
  FaQrcode
} from "react-icons/fa";
import { FiX, FiPhoneCall, FiUserPlus, FiExternalLink, FiShare2 } from "react-icons/fi";
import { useBusinessCard } from "@/ContextApi/BusinessCardContext";
import profileImg from "../assets/newprofile.jpeg";

export default function BusinessCardModal() {
  const { isOpen, closeCard } = useBusinessCard();
  const [copiedItem, setCopiedItem] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCard();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCard]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Shibin Siyad
N:Siyad;Shibin;;;
TITLE:Software Developer
TEL;TYPE=CELL,VOICE:+918606399420
EMAIL;TYPE=WORK,INTERNET:shibinsiyad.k.kdpm@gmail.com
URL:https://shibin-portfolio.vercel.app
URL;TYPE=LinkedIn:https://www.linkedin.com/in/shibin-siyad-k/
URL;TYPE=Instagram:https://www.instagram.com/shibin_siyad__
URL;TYPE=GitHub:https://github.com/siyzz07
NOTE:Full Stack & Software Engineer specializing in MERN & Next.js
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Shibin_Siyad.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCard}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-950 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl z-10 overflow-hidden"
        >
          {/* Ambient Corner Glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeCard}
            aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
          >
            <FiX size={18} />
          </button>

          {/* Card Top Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FaAddressCard size={16} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Digital Business Card
                </span>
                <p className="text-[10px] text-slate-400 font-mono">Tap & Connect</p>
              </div>
            </div>

            {/* Smart NFC Chip Visual Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </div>
          </div>

          {/* Profile Identity Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-xl flex-shrink-0 group">
              <img
                src={profileImg?.src || profileImg}
                alt="Shibin Siyad"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Name and Designation */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Shibin Siyad
              </h3>
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mt-1">
                Software Developer
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Full Stack & MERN Specialist
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-3">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  React • Next.js
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  Node.js • Express
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-2.5 mb-6">
            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <FaPhoneAlt size={13} />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Phone</p>
                  <a
                    href="tel:+918606399420"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-indigo-400 transition-colors truncate block"
                  >
                    8606399420
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href="tel:+918606399420"
                  className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs flex items-center gap-1 transition-all"
                  title="Call now"
                >
                  <FiPhoneCall size={13} />
                  <span className="hidden sm:inline text-[11px]">Call</span>
                </a>
                <button
                  onClick={() => copyToClipboard("8606399420", "phone")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Copy number"
                >
                  {copiedItem === "phone" ? <FaCheck size={12} className="text-emerald-400" /> : <FaCopy size={12} />}
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <FaEnvelope size={13} />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Email</p>
                  <a
                    href="mailto:shibinsiyad.k.kdpm@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors truncate block"
                  >
                    shibinsiyad.k.kdpm@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("shibinsiyad.k.kdpm@gmail.com", "email")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
                title="Copy email"
              >
                {copiedItem === "email" ? <FaCheck size={12} className="text-emerald-400" /> : <FaCopy size={12} />}
              </button>
            </div>

            {/* Portfolio Link */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <FaGlobe size={13} />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Portfolio</p>
                  <a
                    href="https://shibin-portfolio.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-purple-400 transition-colors truncate block"
                  >
                    shibin-portfolio.vercel.app
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://shibin-portfolio.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex-shrink-0"
                  title="Open site"
                >
                  <FiExternalLink size={13} />
                </a>
                <button
                  onClick={() => copyToClipboard("https://shibin-portfolio.vercel.app", "portfolio")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
                  title="Copy link"
                >
                  {copiedItem === "portfolio" ? <FaCheck size={12} className="text-emerald-400" /> : <FaCopy size={12} />}
                </button>
              </div>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {[
              {
                icon: <FaLinkedin size={18} />,
                href: "https://www.linkedin.com/in/shibin-siyad-k/",
                label: "LinkedIn",
                color: "hover:bg-blue-600 hover:text-white",
              },
              {
                icon: <FaInstagram size={18} />,
                href: "https://www.instagram.com/shibin_siyad__",
                label: "Instagram",
                color: "hover:bg-pink-600 hover:text-white",
              },
              {
                icon: <FaGithub size={18} />,
                href: "https://github.com/siyzz07",
                label: "GitHub",
                color: "hover:bg-slate-700 hover:text-white",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={`flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center gap-2 text-xs font-semibold transition-all ${social.color}`}
              >
                {social.icon}
                <span className="text-[11px]">{social.label}</span>
              </a>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={downloadVCard}
              className="flex-1 btn-primary py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              <FiUserPlus size={16} />
              <span>Save to Contacts (.vcf)</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Shibin Siyad - Software Developer",
                    text: "Connect with Shibin Siyad • Software Developer",
                    url: "https://shibin-portfolio.vercel.app",
                  }).catch(() => {});
                } else {
                  copyToClipboard("https://shibin-portfolio.vercel.app", "share");
                }
              }}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Share Card"
            >
              {copiedItem === "share" ? <FaCheck size={16} className="text-emerald-400" /> : <FiShare2 size={16} />}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
