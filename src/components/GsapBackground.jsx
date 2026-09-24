import { useEffect, useRef } from "react";
import gsap from "gsap";

const GsapBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const orbs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 400, color: "rgba(168, 85, 247, 0.15)", vx: 0.5, vy: 0.5 },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, radius: 500, color: "rgba(6, 182, 212, 0.12)", vx: -0.4, vy: 0.6 },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, radius: 450, color: "rgba(236, 72, 153, 0.1)", vx: 0.3, vy: -0.4 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(100px)";

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(3, 3, 3, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
      <canvas ref={canvasRef} className="opacity-60" />
      <div className="noise-overlay" />
    </div>
  );
};

export default GsapBackground;
