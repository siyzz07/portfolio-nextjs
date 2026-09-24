import { motion } from "framer-motion";

const RefinedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
      {/* Soft Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-accent/10 blur-[100px]"
      />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
};

export default RefinedBackground;
