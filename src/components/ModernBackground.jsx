import { motion } from "framer-motion";

const ModernBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Animated Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [-100, 100, -100],
          y: [-50, 150, -50],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-primary/15 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          x: [100, -200, 100],
          y: [200, -100, 200],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] rounded-full bg-primary/10 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]"
      />
      
      {/* Subtle Grainy Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

export default ModernBackground;
