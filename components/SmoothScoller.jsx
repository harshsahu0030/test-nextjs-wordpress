"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins only on the client side
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
        effects: true,
      });
    },

    {
      dependencies: [pathname],
      revertOnUpdate: true,
    },
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="">
        {children}
      </div>
    </div>
  );
}
