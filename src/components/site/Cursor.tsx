"use client";
import { useEffect, useRef } from "react";

// Decorative ring that trails the mouse (desktop only). Purely visual — it sits
// on top with pointer-events:none, so it never interferes with clicks.
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ring = ringRef.current;
    if (!ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        ring.classList.add("cursor--on");
        shown = true;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      ring.classList.toggle("cursor--hover", !!t.closest("a, button, summary, [role='button']"));
    };
    const onLeave = () => ring.classList.remove("cursor--on");

    const loop = () => {
      rx += (mx - rx) * 0.24;
      ry += (my - ry) * 0.24;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ringRef} className="cursor" aria-hidden="true" />;
}
