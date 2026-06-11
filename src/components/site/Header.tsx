/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const LINKS = [
  { href: "#work", label: "עבודות" },
  { href: "#process", label: "תהליך" },
  { href: "#faq", label: "שאלות" },
];

export default function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Scrolling down collapses the bar to the logo; scrolling up (or near the
      // top, or with the menu open) expands it back out.
      if (open || y < 90) setCollapsed(false);
      else if (y > last + 4) setCollapsed(true);
      else if (y < last - 4) setCollapsed(false);
      last = y;
      // Dynamic contrast: flip the logo/nav light or dark depending on whether
      // the bar currently sits over a dark region or a light one. The dark region
      // is the hero and the whole .stack-group (pinned dark Showcase + the dark
      // Services panel that stacks over it) — checked as one block so the bar stays
      // light the entire way through the stack, not just over .section--services.
      let dark = false;
      document.querySelectorAll<HTMLElement>(".hero, .stack-group, .interlude, .tier-stack").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 48 && r.bottom > 48) dark = true;
      });
      setOnDark(dark);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -10 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`hdr${onDark ? "" : " on-light"}${collapsed ? " collapsed" : ""}${open ? " open" : ""}`}
    >
      <a href="#top" className="hdr__logo" onClick={(e) => goTo(e, "#top")} aria-label="ותחזנה">
        <img src="/logo.png" alt="ותחזנה" />
      </a>
      <nav className={`hdr__nav${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => goTo(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="hdr__nav-cta btn btn--dark"
          onClick={(e) => goTo(e, "#contact")}
        >
          בואו נדבר
        </a>
      </nav>
      <a href="#contact" className="hdr__cta" onClick={(e) => goTo(e, "#contact")}>
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
