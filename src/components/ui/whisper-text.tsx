"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WhisperTextProps {
  text: string;
  className?: string;
  delay?: number; // stagger between words, in ms
  duration?: number; // per-word duration, in seconds
  x?: number;
  y?: number;
  blur?: number; // starting blur, in px
  triggerStart?: string;
}

const WhisperText: React.FC<WhisperTextProps> = ({
  text,
  className = "",
  delay = 120,
  duration = 0.9,
  x = 0,
  y = 0,
  blur = 12,
  triggerStart = "top 90%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-word]");

      gsap.set(targets, { opacity: 0, x, y, filter: `blur(${blur}px)` });

      gsap.to(targets, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: "play none none none",
          once: true,
        },
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration,
        ease: "power2.out",
        stagger: delay / 1000,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, duration, x, y, blur, triggerStart]);

  const renderWords = () =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        data-word
        className="inline-block whitespace-nowrap"
        style={{ position: "relative" }}
      >
        {word}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap gap-x-2 ${className}`}
      style={{ overflow: "visible" }}
    >
      {renderWords()}
    </div>
  );
};

export default WhisperText;
