import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LoadingPage = ({ onFinished }) => {
  const container = useRef();
  const words = ["CREATE", "CONNECT", "TUSHAR K."];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        // This is the magic part: it calls your hook's function 
        // only after the entire timeline is finished.
        onComplete: () => {
          if (onFinished) onFinished();
        },
      });

      const wordElements = gsap.utils.toArray(".loading-text");

      wordElements.forEach((word, index) => {
        const chars = word.querySelectorAll("span");

        // Entrance
        tl.from(chars, {
          y: 50,
          opacity: 0,
          stagger: 0.05,
          duration: 0.32,
          ease: "power4.out",
        });

        // Exit
        tl.to(chars, {
          y: -50,
          opacity: 0,
          stagger: 0.05,
          duration: 0.32,
          ease: "power4.in",
          delay: 0, 
        });
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[999] flex justify-center items-center bg-transparent text-sky-400 overflow-hidden"
    >
      {words.map((word, i) => (
        <h1 key={i} className="loading-text absolute text-5xl md:text-7xl font-bold">
          {word.split("").map((char, index) => (
            <span key={index} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      ))}
    </div>
  );
};

export default LoadingPage;