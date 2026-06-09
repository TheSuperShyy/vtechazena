"use client";
import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// useLayoutEffect on the client (so words are hidden before first paint — no
// flash), useEffect on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// All the copy that should blur-whisper in. Generic h1–h4 / p cover most titles,
// leads and paragraphs; the rest are spans that hold their own text.
const SELECTOR =
  "h1,h2,h3,h4,p,.eyebrow,.services-eyebrow,.stat__num,.stat__label,.tier-card__tag,.tier-card__meta,.faq summary,.footer__logo,.footer__copy";

// Skip the blended hero wordmark (filter would break its mix-blend), the hero
// sub-text (kept fixed, no animation) and decor.
const SKIP = ".hero__display,.hero__hello,.hero__kicker,.hero__line";

const START_BLUR = 12; // px
const DURATION = 0.65; // s per word
const STAGGER = 0.05; // s between words

// Recursively wrap each word in a <span class="whisper-word">, keeping element
// children (<em>, <a>, …) and <br> intact so markup/layout survive.
function whisperize(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const txt = child.textContent ?? "";
        if (!txt.trim()) return;
        const frag = document.createDocumentFragment();
        txt.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "whisper-word";
            span.textContent = part;
            frag.appendChild(span);
            words.push(span);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = (child as HTMLElement).tagName;
        if (tag === "BR" || tag === "SVG") return;
        walk(child);
      }
    });
  };
  walk(el);
  return words;
}

export default function WhisperReveal() {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const els = (Array.from(document.querySelectorAll(SELECTOR)) as HTMLElement[])
        .filter((el) => !el.closest(".hdr")) // leave the fixed header alone
        .filter((el) => !el.matches(SKIP))
        .filter((el) => !el.dataset.whispered)
        .filter((el) => (el.textContent ?? "").trim().length > 0);

      els.forEach((el) => {
        el.dataset.whispered = "1";
        const words = whisperize(el);
        if (!words.length) return;

        if (reduce) {
          gsap.set(words, { opacity: 1, filter: "blur(0px)" });
          return;
        }

        gsap.set(words, { opacity: 0, y: 8, filter: `blur(${START_BLUR}px)` });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION,
          ease: "power2.out",
          stagger: STAGGER,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // The one standalone image gets a matching slow blur-fade.
      (Array.from(document.querySelectorAll(".intro__media")) as HTMLElement[]).forEach(
        (el) => {
          if (reduce) return;
          gsap.set(el, { opacity: 0, y: 28, filter: "blur(18px)" });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }
      );

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
