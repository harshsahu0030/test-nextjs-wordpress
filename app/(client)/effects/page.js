"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageExpandPage = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Pin when the section hits the top of the viewport
          end: "+=1500", // The user must scroll 1500px to complete the animation
          scrub: 1, // Smooth scrubbing
          pin: true, // Keeps the section stuck in place
        },
      });

      // Animate the image wrapper to take up the full screen
      tl.to(
        imageRef.current,
        {
          width: "100vw",
          height: "100vh",
          right: 0, // Snap to the right edge
          top: 0, // Snap to the top edge
          bottom: 0, // Ensure it fills the height
          borderRadius: 0, // Remove rounded corners for a true fullscreen look
          ease: "power1.inOut",
        },
        0,
      ); // The '0' tells it to start immediately

      // Optional: Fade out the text slightly as the image expands over it
      tl.to(
        textRef.current,
        {
          opacity: 0,
          x: -50,
          ease: "power1.inOut",
        },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <main className="overflow-x-hidden bg-slate-900">
      {/* Spacer so you can scroll down to the effect */}
      <section className="h-screen w-full flex items-center justify-center text-white">
        <h1 className="text-4xl">Scroll Down ↓</h1>
      </section>

      {/* THE PINNED EXPAND SECTION */}
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden flex items-center bg-slate-950 bg-red-300"
      >
        {/* Left Side: Text Content */}
        <div ref={textRef} className="w-1/2 p-12 md:p-24 z-10 text-white">
          <h2 className="text-5xl font-bold mb-6">Discover the Beauty</h2>
          <p className="text-xl text-gray-400">
            Keep scrolling to see this image expand and take over the entire
            screen. Because it is absolutely positioned, it won't break the
            layout as it grows.
          </p>
        </div>

        {/* Right Side: The Image */}
        {/* Initial state: Pinned to the right, rounded, smaller size */}
        <div
          ref={imageRef}
          className="absolute right-10  bottom-0   w-[40vw] h-[60vh] rounded-3xl overflow-hidden z-20 shadow-2xl"
        >
          {/* object-cover ensures the image doesn't stretch or distort as the div changes shape */}
          <img
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop"
            alt="Beautiful landscape"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Spacer to continue scrolling after the pin */}
      <section className="h-screen w-full flex items-center justify-center text-white z-30 relative bg-slate-900">
        <h1 className="text-4xl">Keep Scrolling ↓</h1>
      </section>
    </main>
  );
};

export default ImageExpandPage;
