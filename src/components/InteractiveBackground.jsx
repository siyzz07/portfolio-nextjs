"use client";

import React from "react";
// import WeatherEffects from "./WeatherEffects"; // [HEAVY FEATURE COMMENTED FOR SPEED]
// import { useWeather } from "../hooks/useWeather"; // [HEAVY API POLLING COMMENTED FOR SPEED]

/**
 * Lightweight, GPU-accelerated background.
 * Replaces heavy full-viewport Canvas loops and SVG feTurbulence filters
 * with crisp, ultra-efficient CSS mesh gradients and dot grid.
 */
function InteractiveBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none bg-[#030712]">
      {/* Subtle Geometric Dot Grid */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 85%)'
        }}
      />

      {/* Top Ambient Glow (Indigo/Purple) */}
      <div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] h-[500px] rounded-full opacity-35 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 45%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* Mid-Right Accent Glow (Cyan) */}
      <div 
        className="absolute top-[40%] -right-[100px] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* Bottom-Left Accent Glow (Violet) */}
      <div 
        className="absolute top-[75%] -left-[100px] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* [HEAVY WEATHER EFFECTS COMMENTED OUT TO PREVENT LAG]
        <WeatherEffects condition="clear" />
      */}
    </div>
  );
}

export default InteractiveBackground;
