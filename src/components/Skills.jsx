"use client";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaLock, FaAws, FaBrain, FaInfinity } from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress, 
  SiNextdotjs, 
  SiTypescript, 
  SiSocketdotio, 
  SiMui, 
  SiMysql, 
  SiPostman, 
  SiRedux, 
  SiVite, 
  SiRadixui, 
  SiAgora,
  SiFirebase,
  SiDocker,
  SiStrapi,
  SiRender,
  SiVercel,
  SiLangchain,
  SiGithubactions
} from "react-icons/si";
import { FiCode, FiLayers, FiDatabase, FiTool, FiCpu, FiCloud, FiGitBranch } from "react-icons/fi";

const skillCategories = [
  {
    name: "Frontend Development",
    icon: <FiLayers className="text-indigo-400" size={20} />,
    border: "border-indigo-500/20",
    items: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Redux / Toolkit", icon: <SiRedux className="text-purple-400" /> },
    ],
  },
  {
    name: "Backend & CMS",
    icon: <FiCode className="text-emerald-400" size={20} />,
    border: "border-emerald-500/20",
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-emerald-400" /> },
      { name: "Express.js", icon: <SiExpress className="text-slate-300" /> },
      { name: "Strapi CMS", icon: <SiStrapi className="text-purple-400" /> },
      { name: "RESTful APIs", icon: <FiCode className="text-emerald-300" /> },
      { name: "Socket.IO", icon: <SiSocketdotio className="text-slate-200" /> },
      { name: "OAuth 2.0 & JWT", icon: <FaLock className="text-amber-400" /> },
    ],
  },
  {
    name: "AI & Modern Tech",
    icon: <FaBrain className="text-pink-400" size={19} />,
    border: "border-pink-500/20",
    items: [
      { name: "LangChain", icon: <SiLangchain className="text-emerald-400" /> },
      { name: "RAG Architecture", icon: <FaBrain className="text-pink-400" /> },
      { name: "AI Chatbots & Agents", icon: <FiCpu className="text-cyan-400" /> },
      { name: "Agora RTC", icon: <SiAgora className="text-blue-400" /> },
    ],
  },
  {
    name: "Databases & Storage",
    icon: <FiDatabase className="text-cyan-400" size={20} />,
    border: "border-cyan-500/20",
    items: [
      { name: "MongoDB", icon: <SiMongodb className="text-emerald-400" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
      { name: "Firebase", icon: <SiFirebase className="text-amber-500" /> },
      { name: "Mongoose ODM", icon: <SiMongodb className="text-red-400" /> },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: <FiCloud className="text-amber-400" size={20} />,
    border: "border-amber-500/20",
    items: [
      { name: "AWS", icon: <FaAws className="text-amber-500" /> },
      { name: "CI / CD", icon: <SiGithubactions className="text-blue-400" /> },
      { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "Render", icon: <SiRender className="text-cyan-400" /> },
    ],
  },
  {
    name: "Dev Tools & Workflow",
    icon: <FiTool className="text-purple-400" size={20} />,
    border: "border-purple-500/20",
    items: [
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-400" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
      { name: "Vite", icon: <SiVite className="text-purple-400" /> },
      { name: "VS Code", icon: <FiCode className="text-blue-400" /> },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-28 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
              <FiTool size={14} />
              Skills & Stack
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            The modern languages, libraries, cloud platforms, AI architectures, and tooling I leverage to build robust digital solutions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-3xl bg-slate-900/60 border ${cat.border} backdrop-blur-sm transition-all duration-300 hover:border-white/20 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{cat.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-200 group"
                    >
                      <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
