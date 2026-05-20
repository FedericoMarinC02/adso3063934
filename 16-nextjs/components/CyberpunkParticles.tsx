"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
  tier: "core" | "edge";
};

const PARTICLE_COLORS = [
  "56, 189, 248",
  "244, 63, 94",
  "34, 211, 238",
  "163, 230, 53",
];

export default function CyberpunkParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompactViewport = window.innerWidth < 1024;
    const particleCount = reducedMotion ? 18 : isCompactViewport ? 34 : 60;
    const maxConnectionDistance = isCompactViewport ? 140 : 180;
    const maxConnectionDistanceSquared = maxConnectionDistance * maxConnectionDistance;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let frame = 0;
    let isDocumentHidden = false;
    let glowGradient: CanvasGradient | null = null;
    const particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      size: Math.random() > 0.72 ? Math.random() * 2.4 + 2 : Math.random() * 1.8 + 0.8,
      alpha: Math.random() > 0.72 ? Math.random() * 0.28 + 0.4 : Math.random() * 0.32 + 0.18,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.022 + 0.008,
      tier: Math.random() > 0.72 ? "core" : "edge",
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      glowGradient = context.createRadialGradient(
        width * 0.8,
        height * 0.1,
        0,
        width * 0.8,
        height * 0.1,
        Math.max(width, height) * 0.4,
      );
      glowGradient.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      glowGradient.addColorStop(0.25, "rgba(34, 211, 238, 0.06)");
      glowGradient.addColorStop(0.4, "rgba(244, 63, 94, 0.04)");
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) {
        particles.push(createParticle());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < maxConnectionDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const intensity = 1 - distance / maxConnectionDistance;
            const isCorePair = first.tier === "core" || second.tier === "core";
            context.beginPath();
            context.strokeStyle =
              i % 4 === 0
                ? `rgba(244, 63, 94, ${(isCorePair ? 0.24 : 0.18) * intensity})`
                : `rgba(56, 189, 248, ${(isCorePair ? 0.22 : 0.16) * intensity})`;
            context.lineWidth = isCorePair ? (distance < 90 ? 1.4 : 1) : distance < 72 ? 1.05 : 0.75;
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();

            if (!isCompactViewport && distance < 96) {
              const mx = (first.x + second.x) / 2;
              const my = (first.y + second.y) / 2;
              context.beginPath();
              context.fillStyle = isCorePair
                ? `rgba(34, 211, 238, ${0.22 * intensity})`
                : `rgba(34, 211, 238, ${0.14 * intensity})`;
              context.arc(mx, my, isCorePair ? 1.5 : 1.1, 0, Math.PI * 2);
              context.fill();
            }

            if (!isCompactViewport && isCorePair && distance < 140) {
              const travel = ((frame * 0.012) + ((i + j) % 10) / 10) % 1;
              const pulseX = first.x + (second.x - first.x) * travel;
              const pulseY = first.y + (second.y - first.y) * travel;

              context.beginPath();
              context.fillStyle = `rgba(255, 255, 255, ${0.2 * intensity})`;
              context.shadowColor = "rgba(56, 189, 248, 0.8)";
              context.shadowBlur = 10;
              context.arc(pulseX, pulseY, 1.6, 0, Math.PI * 2);
              context.fill();
              context.shadowBlur = 0;
            }
          }
        }
      }
    };

    const drawDataStreams = () => {
      const streamCount = isCompactViewport ? 3 : 5;
      for (let i = 0; i < streamCount; i += 1) {
        const y = ((frame * (0.22 + i * 0.04)) + i * 120) % (height + 120) - 60;
        context.beginPath();
        context.strokeStyle = i % 2 === 0 ? "rgba(56, 189, 248, 0.06)" : "rgba(244, 63, 94, 0.04)";
        context.lineWidth = i % 2 === 0 ? 1 : 0.8;
        context.moveTo(-40, y);
        context.lineTo(width + 40, y + 14);
        context.stroke();
      }
    };

    const animate = () => {
      if (isDocumentHidden) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      frame += 1;
      context.clearRect(0, 0, width, height);

      if (glowGradient) {
        context.fillStyle = glowGradient;
        context.fillRect(0, 0, width, height);
      }

      drawDataStreams();

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += particle.pulseSpeed;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        const pulsingSize = particle.size + Math.sin(particle.pulse) * 0.65;
        const pulsingAlpha = particle.alpha + Math.sin(particle.pulse) * 0.08;

        context.beginPath();
        context.fillStyle = `rgba(${particle.color}, ${pulsingAlpha})`;
        context.shadowColor = `rgba(${particle.color}, ${particle.tier === "core" ? 0.9 : 0.75})`;
        context.shadowBlur = particle.tier === "core" ? 26 : 18;
        context.arc(particle.x, particle.y, pulsingSize, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, pulsingAlpha * 0.32)})`;
        context.arc(
          particle.x,
          particle.y,
          Math.max(particle.tier === "core" ? 0.95 : 0.6, pulsingSize * 0.36),
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.shadowBlur = 0;
      if (frame % 2 === 0) {
        drawConnections();
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      isDocumentHidden = document.hidden;
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="cyberpunk-particles" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
