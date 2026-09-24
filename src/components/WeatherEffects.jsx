"use client";

import { useRef, useEffect, useCallback } from 'react';

/**
 * Canvas-based weather effects overlay.
 * Renders rain, snow, thunderstorm, clouds, clear (golden dust), or mist.
 */
function WeatherEffects({ condition = 'clear' }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lightningRef = useRef({ active: false, opacity: 0, timer: 0 });
  const cloudsRef = useRef([]);

  const initParticles = useCallback((canvas, type) => {
    const particles = [];
    const count = getParticleCount(type);

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(canvas, type));
    }
    return particles;
  }, []);

  const initClouds = useCallback((canvas) => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        width: 200 + Math.random() * 300,
        height: 60 + Math.random() * 80,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.03 + Math.random() * 0.06,
      });
    }
    return clouds;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    particlesRef.current = initParticles(canvas, condition);
    if (condition === 'clouds' || condition === 'mist') {
      cloudsRef.current = initClouds(canvas);
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = initParticles(canvas, condition);
      if (condition === 'clouds' || condition === 'mist') {
        cloudsRef.current = initClouds(canvas);
      }
    };

    window.addEventListener('resize', handleResize);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      switch (condition) {
        case 'rain':
          drawRain(ctx, particlesRef.current, width, height);
          break;
        case 'snow':
          drawSnow(ctx, particlesRef.current, width, height);
          break;
        case 'thunderstorm':
          drawRain(ctx, particlesRef.current, width, height);
          drawLightning(ctx, lightningRef, width, height);
          break;
        case 'clouds':
          drawClouds(ctx, cloudsRef.current, width, height);
          break;
        case 'clear':
          drawSunParticles(ctx, particlesRef.current, width, height);
          break;
        case 'mist':
          drawMist(ctx, cloudsRef.current, width, height);
          break;
        default:
          drawSunParticles(ctx, particlesRef.current, width, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [condition, initParticles, initClouds]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── Particle Factory ──────────────────────────────────────────

function getParticleCount(type) {
  switch (type) {
    case 'rain': return 150;
    case 'snow': return 80;
    case 'thunderstorm': return 200;
    case 'clear': return 50;
    default: return 60;
  }
}

function createParticle(canvas, type) {
  const base = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };

  switch (type) {
    case 'rain':
    case 'thunderstorm':
      return {
        ...base,
        length: 15 + Math.random() * 20,
        speed: 8 + Math.random() * 12,
        opacity: 0.1 + Math.random() * 0.25,
        thickness: 1 + Math.random() * 1.5,
      };
    case 'snow':
      return {
        ...base,
        radius: 1.5 + Math.random() * 3.5,
        speed: 0.5 + Math.random() * 1.5,
        drift: -0.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.5,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.03,
      };
    case 'clear':
      return {
        ...base,
        radius: 1 + Math.random() * 2,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.1 + Math.random() * 0.3,
        drift: -0.3 + Math.random() * 0.6,
        glow: 3 + Math.random() * 6,
      };
    default:
      return base;
  }
}

// ─── Rain ───────────────────────────────────────────────────────

function drawRain(ctx, particles, width, height) {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 1, p.y + p.length);
    ctx.strokeStyle = `rgba(140, 180, 255, ${p.opacity})`;
    ctx.lineWidth = p.thickness;
    ctx.stroke();

    // Move
    p.y += p.speed;
    p.x += 1;

    // Reset when off screen
    if (p.y > height) {
      p.y = -p.length;
      p.x = Math.random() * width;
    }
    if (p.x > width) {
      p.x = 0;
    }
  });
}

// ─── Snow ───────────────────────────────────────────────────────

function drawSnow(ctx, particles, width, height) {
  particles.forEach((p) => {
    p.wobble += p.wobbleSpeed;
    const wobbleX = Math.sin(p.wobble) * 0.8;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;

    // Glow
    ctx.shadowColor = 'rgba(200, 220, 255, 0.5)';
    ctx.shadowBlur = p.radius * 2;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Move
    p.y += p.speed;
    p.x += p.drift + wobbleX;

    if (p.y > height + p.radius) {
      p.y = -p.radius;
      p.x = Math.random() * width;
    }
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
  });
}

// ─── Lightning ──────────────────────────────────────────────────

function drawLightning(ctx, lightningRef, width, height) {
  const l = lightningRef.current;

  l.timer++;

  // Trigger lightning randomly
  if (!l.active && Math.random() < 0.003) {
    l.active = true;
    l.opacity = 0.7 + Math.random() * 0.3;
    l.timer = 0;
    l.boltX = width * 0.2 + Math.random() * width * 0.6;
  }

  if (l.active) {
    // Screen flash
    ctx.fillStyle = `rgba(200, 210, 255, ${l.opacity * 0.15})`;
    ctx.fillRect(0, 0, width, height);

    // Draw bolt
    if (l.timer < 4) {
      drawBolt(ctx, l.boltX, 0, l.boltX + (Math.random() - 0.5) * 100, height * 0.7, l.opacity);
    }

    l.opacity *= 0.85;
    if (l.opacity < 0.01) {
      l.active = false;
    }
  }
}

function drawBolt(ctx, x1, y1, x2, y2, opacity) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);

  const segments = 8 + Math.floor(Math.random() * 6);
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 60;
    const y = y1 + (y2 - y1) * t;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = `rgba(180, 200, 255, ${opacity})`;
  ctx.lineWidth = 2;
  ctx.shadowColor = `rgba(120, 160, 255, ${opacity})`;
  ctx.shadowBlur = 20;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// ─── Clouds ─────────────────────────────────────────────────────

function drawClouds(ctx, clouds, width) {
  clouds.forEach((c) => {
    // Draw cloud as a collection of circles
    ctx.fillStyle = `rgba(160, 170, 190, ${c.opacity})`;
    const cx = c.x;
    const cy = c.y;
    const w = c.width;
    const h = c.height;

    // Base ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bumps
    ctx.beginPath();
    ctx.ellipse(cx - w * 0.25, cy - h * 0.2, w * 0.25, h * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx + w * 0.2, cy - h * 0.15, w * 0.3, h * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Move
    c.x += c.speed;
    if (c.x - w / 2 > width) {
      c.x = -w / 2;
      c.y = Math.random() * (ctx.canvas.height * 0.4);
    }
  });
}

// ─── Clear / Sun Particles ──────────────────────────────────────

function drawSunParticles(ctx, particles, width, height) {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
    gradient.addColorStop(0, `rgba(255, 200, 80, ${p.opacity})`);
    gradient.addColorStop(1, `rgba(255, 180, 60, 0)`);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Move upward
    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < -p.radius) {
      p.y = height + p.radius;
      p.x = Math.random() * width;
    }
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
  });
}

// ─── Mist ───────────────────────────────────────────────────────

function drawMist(ctx, clouds, width, height) {
  // Full screen mist overlay
  const gradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
  gradient.addColorStop(0, 'rgba(180, 190, 210, 0)');
  gradient.addColorStop(0.5, 'rgba(180, 190, 210, 0.04)');
  gradient.addColorStop(1, 'rgba(180, 190, 210, 0.07)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Drifting fog patches
  clouds.forEach((c) => {
    ctx.fillStyle = `rgba(180, 190, 210, ${c.opacity * 0.7})`;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y + height * 0.3, c.width * 0.8, c.height * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    c.x += c.speed * 0.5;
    if (c.x - c.width > width) {
      c.x = -c.width;
    }
  });
}

export default WeatherEffects;
