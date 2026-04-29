"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip"; // Note: /dist/ is safer for Next.js SSR
import { useGSAP } from "@gsap/react";

// Register the plugin safely on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export default function FlipExample() {
  const [isGrid, setIsGrid] = useState(true);
  const containerRef = useRef(null);

  // We use a ref to hold the captured state between renders
  const flipState = useRef(null);

  // A simple array to generate some boxes
  const items = [1, 2, 3, 4, 5, 6];

  const toggleLayout = () => {
    // 1. FIRST & LAST: Capture the current layout state of the boxes
    // BEFORE we change the React state.
    flipState.current = Flip.getState(".box");

    // 2. Trigger the React re-render with the new layout
    setIsGrid((prev) => !prev);
  };

  useGSAP(
    () => {
      // 3. INVERT & PLAY: This effect runs AFTER React updates the DOM.
      // If we don't have a saved state yet (initial load), do nothing.
      if (!flipState.current) return;

      // Animate from the captured previous state to the new current state
      Flip.from(flipState.current, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true, // Crucial for smooth reflows when shifting from grid to flex
        stagger: 0.05, // Adds a nice cascading effect
      });
    },
    {
      // Re-run this effect every time isGrid changes
      dependencies: [isGrid],
      scope: containerRef,
    },
  );

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">GSAP Flip in Next.js</h1>

      <button
        onClick={toggleLayout}
        className="mb-8 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors"
      >
        Toggle Layout
      </button>

      {/* The Wrapper determines the layout via Tailwind classes */}
      <div
        ref={containerRef}
        className={`w-full max-w-3xl transition-none ${
          isGrid ? "grid grid-cols-3 gap-4" : "flex flex-col gap-2"
        }`}
      >
        {items.map((item) => (
          <div
            key={item}
            // The "box" class is what Flip.getState(".box") is looking for
            className="box w-full h-32 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg"
          >
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}
