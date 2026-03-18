"use client";

import { useEffect } from "react";

/** Drop this anywhere on a page to activate .rv → .on reveal animations. */
export function RevealInit() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
