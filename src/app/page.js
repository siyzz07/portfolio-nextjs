"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBar from "@/components/Navbar";
import Projects from "@/components/Project";
import Skills from "@/components/Skills";
import ProjectData from "@/components/ProjectData";
import LoadingScreen from "@/components/LoadingScreen";
import { useContext, useState, useEffect, useCallback } from "react";
import { projectDataContext } from "@/ContextApi/ProjectSample";
import InteractiveBackground from "@/components/InteractiveBackground";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const context = useContext(projectDataContext);
  const data = context?.data || { popup: false, index: null };
  const [isLoading, setIsLoading] = useState(true);
  const secretKey = "c514907f97f8f317af502eb759d8b885";

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Failsafe timer to guarantee content shows on all mobile devices
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(safetyTimer);
  }, []);

  // AI Chatbot Integration
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/chatbot-plugin.js";
    script.async = true;
    script.setAttribute("data-theme", "light");
    script.setAttribute(
      "data-greeting",
      "👋 Hi! I’m the AI assistant for Shibin's portfolio. Ask me about projects, skills, experience, or tech stack!"
    );
    script.setAttribute("data-secret-key", secretKey);
    script.setAttribute(
      "data-suggestions",
      JSON.stringify([
        "What technical skills does Shibin have?",
        "Tell me about Shibin’s projects.",
        "What backend technologies does Shibin specialize in?",
      ])
    );
    script.setAttribute("apiUrl", "https://query-backend-v8pn.onrender.com");
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (typeof window !== "undefined" && window.chatbotInstance?.destroy) {
        window.chatbotInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen text-foreground selection:bg-indigo-500/30 selection:text-white">
      {/* Initial Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Website Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Lightweight GPU-accelerated Background */}
        <InteractiveBackground />

        {/* Main Content Layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />

          <main className="flex-grow">
            <Header />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </div>

        {/* Case Study Modal Popup */}
        <AnimatePresence>
          {data?.popup && <ProjectData />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
