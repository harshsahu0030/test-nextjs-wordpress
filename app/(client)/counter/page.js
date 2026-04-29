"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CounterSection = () => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(numberRef.current, {
        innerHTML: 90, // The target number
        duration: 2, // How long it takes (ignored if scrub: true)
        snap: { innerHTML: 1 }, // This forces the numbers to be integers

        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center", // Triggers when the top of the container hits the center of the screen

          // --- CHOOSE ONE OF THE BEHAVIORS BELOW ---

          // Option A: Play once when scrolled into view
          toggleActions: "play none none reverse",

          // Option B: Tie the number directly to the user's scrolling
          // scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white"
    >
      <section className="h-screen w-full bg-slate-800 flex items-center justify-center text-white">
        <h1 className="text-4xl">Keep Scrolling Down ↓</h1>
      </section>

      <div className="text-center">
        <h2 className="text-2xl mb-4 text-gray-400">Target Reached</h2>
        {/* We start the inner text at 0 */}
        <span
          ref={numberRef}
          className="text-8xl font-bold text-emerald-400 tabular-nums"
        >
          0
        </span>
        <span className="text-8xl font-bold text-emerald-400">%</span>
      </div>
    </section>
  );
};

export default CounterSection;
