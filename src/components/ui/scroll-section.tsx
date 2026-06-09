"use client";
import React, { forwardRef } from "react";

/**
 * "Page 3" extracted from the 21st.dev smooth-scroll component — a single,
 * standalone section: dark slate background + faint grid pattern with a radial
 * mask + centered heading.
 *
 * Standalone on purpose: no <ReactLenis root> (the app already has one in
 * components/site/SmoothScroll.tsx) and no sticky/stacking siblings — this is
 * one section, not the multi-page stack.
 */
const ScrollSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="text-white h-screen w-full bg-slate-950 grid place-content-center relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
        Thanks To Scroll.
        <br /> Now Scroll Up Again☝️🏿
      </h1>
    </section>
  );
});

ScrollSection.displayName = "ScrollSection";

export default ScrollSection;
