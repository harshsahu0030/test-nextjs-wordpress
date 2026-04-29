"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScrollPage = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({});

      // Add labels to map out exactly where the snapping should happen
      tl.addLabel("start")
        .from(".trigger-one", {
          xPercent: 100,
          ease: "none",
        })
        .addLabel("panel-1")
        .from(".trigger-two", {
          xPercent: -100,
          ease: "none",
        })
        .addLabel("panel-2")
        .from(".trigger-three", {
          yPercent: -100,
          ease: "none",
        })
        .addLabel("end");

      ScrollTrigger.create({
        trigger: ".main",
        animation: tl,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        snap: {
          snapTo: "labels", // Magic word! GSAP handles the math automatically now.
          //           snapTo: (progress) => {
          //   // progress is the current scroll position (e.g., 0.45)
          //   // Return the nearest whole integer increment
          //   return Math.round(progress * 3) / 3;
          // }
          directional: true, // Snap in both directions
          duration: { min: 0.2, max: 0.6 }, // Dynamic duration depending on how far the snap is
          ease: "power2.inOut",
        },
      });

      ScrollTrigger.create({
        trigger: ".pink",
        start: "top top",
        end: "+=300px",
        pin: true,
        pinSpacing: false,
      });
    },
    {
      scope: containerRef,
    },
  );

  return (
    <main ref={containerRef} className="overflow-x-hidden">
      <section className="h-screen w-full bg-slate-800 flex items-center justify-center text-white">
        <h1 className="text-4xl">Scroll Down ↓</h1>
      </section>

      <section className="main h-screen relative w-full bg-red-500 overflow-hidden">
        <div className="trigger-one absolute top-0 left-0 bg-amber-500 h-full w-full"></div>
        <div className="trigger-two absolute top-0 left-0 bg-green-500 h-full w-full"></div>
        <div className="trigger-three absolute top-0 left-0 bg-blue-500 h-full w-full"></div>
      </section>

      <section className="h-screen w-full bg-slate-800 flex items-center justify-center text-white">
        <h1 className="text-4xl">Keep Scrolling Down ↓</h1>
      </section>

      <section className="pink h-[40vh] w-full bg-pink-500"></section>

      <section className="h-screen w-full bg-slate-800 flex items-center justify-center text-white">
        <h1 className="text-4xl">Keep Scrolling Down ↓</h1>
      </section>

      <section className="h-screen w-full bg-slate-800 flex items-center justify-center text-white">
        <h1 className="text-4xl">Keep Scrolling Down ↓</h1>
      </section>
    </main>
  );
};

export default HorizontalScrollPage;
