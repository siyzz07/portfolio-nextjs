import { motion } from "framer-motion";

const AnimatedNebula = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030712] overflow-hidden">
      {/* Aurora Layers */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-primary/20 blur-[140px] rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] -right-[10%] w-[70%] h-[70%] bg-secondary/15 blur-[160px] rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] bg-accent/10 blur-[120px] rounded-full mix-blend-screen"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Distant Stars */}
      <div className="absolute inset-0 opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default AnimatedNebula;
