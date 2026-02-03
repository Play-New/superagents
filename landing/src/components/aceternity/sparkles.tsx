"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

export function SparklesCore({
  id,
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 1,
  particleColor = "#FFFFFF",
  particleDensity = 100,
}: SparklesCoreProps) {
  const generatedId = useId();
  const particleId = id || generatedId;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: particleColor,
      },
      move: {
        enable: true,
        direction: "none",
        outModes: {
          default: "out",
        },
        random: true,
        speed: speed,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 400,
          height: 400,
        },
        value: particleDensity,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 1,
        },
        animation: {
          enable: true,
          speed: speed,
          startValue: "random",
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: minSize,
          max: maxSize,
        },
      },
    },
    detectRetina: true,
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id={particleId}
      className={cn("h-full w-full", className)}
      options={options}
    />
  );
}

interface SparklesBackgroundProps {
  children: React.ReactNode;
  className?: string;
  sparklesClassName?: string;
  particleColor?: string;
  particleDensity?: number;
}

export function SparklesBackground({
  children,
  className,
  sparklesClassName,
  particleColor = "#8B5CF6",
  particleDensity = 80,
}: SparklesBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          sparklesClassName
        )}
      >
        <SparklesCore
          particleColor={particleColor}
          particleDensity={particleDensity}
          speed={0.5}
          minSize={0.4}
          maxSize={1.2}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
