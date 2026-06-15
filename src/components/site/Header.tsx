/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const LINKS = [
  { href: "/#work", label: "עבודות" },
  { href: "/#process", label: "תהליך" },
  { href: "/#faq", label: "שאלות" },
];

// Is a CSS color string dark? Returns null for transparent/unknown (keep looking).
function isDarkColor(color: string): boolean | null {
  const m = color.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  const a = m.length >= 4 ? parseFloat(m[3]) : 1;
  if (a < 0.2) return null; // effectively transparent — not a real backdrop
  const [r, g, b] = m.map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140; // perceived luminance threshold
}

// Sample the real backdrop behind a point: dark on the first image / [data-dark]
// zone / opaque dark background found beneath the navbar; light if nothing dark.
function probeDark(x: number, y: number): boolean {
  if (typeof document === "undefined" || !document.elementsFromPoint) return true;
  for (const el of document.elementsFromPoint(x, y)) {
    if (!(el instanceof HTMLElement) || el.closest(".hdr")) continue; // skip the bar
    if (el.tagName === "IMG" || el.closest("[data-dark]")) return true;
    const dark = isDarkColor(getComputedStyle(el).backgroundColor);
    if (dark !== null) return dark; // first opaque background decides
  }
  return false;
}

export default function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // This handler (a) collapses the bar to the logo on scroll-down / expands on
  // scroll-up, and (b) detects whether the bar sits over a dark backdrop, which
  // flips the whole bar (logo + links + CTA) between white and dark.
  //
  // Detection samples the ACTUAL rendered background behind the bar via
  // elementsFromPoint instead of relying on hand-tagged sections — it reads real
  // colors, so an untagged dark image no longer breaks it. For each element under
  // the sample point (skipping the navbar itself) it returns dark on the first
  // image / [data-dark] zone / opaque dark background it finds.
  const update = useCallback(() => {
    const y = window.scrollY;
    if (open || y < 90) setCollapsed(false);
    else if (y > lastY.current + 4) setCollapsed(true);
    else if (y < lastY.current - 4) setCollapsed(false);
    lastY.current = y;
    setOnDark(probeDark(window.innerWidth / 2, 50));
  }, [open]);

  // Lenis drives the page scroll; subscribe to its tick (plus native fallbacks).
  const lenis = useLenis(update);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    // On a sub-page (e.g. /workshop), let the link navigate to home (+ hash).
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    const hashIdx = href.indexOf("#");
    const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
    if (!hash) {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(hash);
    if (el) {
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -10 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`hdr${onDark ? "" : " on-light"}${collapsed ? " collapsed" : ""}${open ? " open" : ""}`}
    >
      <a href="/" className="hdr__logo" onClick={(e) => goTo(e, "/")} aria-label="ותחזנה">
        <img src="/logo.png" alt="ותחזנה" />
      </a>
      <nav className={`hdr__nav${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => goTo(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a
          href="/#contact"
          className="hdr__nav-cta btn btn--dark"
          onClick={(e) => goTo(e, "/#contact")}
        >
          בואו נדבר
        </a>
      </nav>
      <a href="/#contact" className="hdr__cta" onClick={(e) => goTo(e, "/#contact")}>
        בואו נדבר
      </a>
      <button
        className="hdr__burger"
        aria-label="תפריט"
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
