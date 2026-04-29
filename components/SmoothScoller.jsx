"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function SmoothScroller({ children }) {
  const pathname = usePathname();

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
      });

      // Force a recalculation once the DOM is fully settled
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    },
    {
      dependencies: [pathname],
      revertOnUpdate: true,
    },
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
