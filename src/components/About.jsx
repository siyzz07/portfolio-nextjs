"use client";

import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaLayerGroup, FaCheckCircle } from "react-icons/fa";
import { FiCpu, FiLayout, FiGitBranch } from "react-icons/fi";

function About() {
  const highlights = [
    {
      title: "Full-Stack Architecture",
      desc: "Designing end-to-end applications using MERN & Next.js with robust RESTful APIs and clean MVC patterns.",
      icon: <FaLayerGroup className="text-indigo-400" size={20} />,
    },
    {
      title: "Backend & Databases",
      desc: "Building scalable backend services in Node.js & Express, schema modeling in MongoDB & MySQL, and OAuth integrations.",
      icon: <FaServer className="text-cyan-400" size={20} />,
    },
    {
      title: "Responsive Frontend",
      desc: "Crafting modern, accessible, and fast user interfaces with React, Tailwind CSS, Material UI, and Framer Motion.",
      icon: <FiLayout className="text-purple-400" size={20} />,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              From Problems  to <span className="text-gradient"> Solutions</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
           Turning ideas into thoughtful, scalable, and reliable digital solutions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Bio Card */}
          <div className="col-span-1 md:col-span-12 p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Full Stack Developer & Problem Solver
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                I’m a full-stack developer and problem solver focused on turning complex ideas into scalable, reliable, and high-quality digital products. My expertise spans the <strong className="text-white font-semibold"> MERN stack — MongoDB, Express.js, React, and Node.js — along with Next.js and TypeScript </strong> for building modern, production-ready applications. I take a strong engineering approach to development, emphasizing clean, maintainable code and robust architecture through <strong className="text-white font-semibold"> SOLID principles, Clean Architecture, MVC, and the Repository Pattern.</strong>
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
                I have hands-on experience building secure authentication and authorization systems, RESTful APIs, real-time applications with WebSockets, payment integrations, and AI-powered solutions. Alongside application development, I continuously sharpen my problem-solving and algorithmic skills through Data Structures & Algorithms (DSA) and platforms such as LeetCode. For me, great software goes beyond simply working — it should be well-engineered, efficient, scalable, maintainable, and built with the user in mind.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2 relative z-10">
              {["Clean Architecture", "REST APIs", "OAuth & JWT", "Agile Workflow", "State Management", "SOLID Principles"].map((badge) => (
                <span key={badge} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <FaCheckCircle className="text-indigo-400" size={11} />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Highlight Cards */}
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default About;
