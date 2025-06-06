import React, { useEffect, useState } from "react";

/**
 * SplashScreen Component
 * - Shows "My AuraGram" centered with a blooming animation.
 * - After 2.5 seconds, logo slides and shrinks to the top-left corner and stays fixed.
 * - Once animation is complete, shows the auth form (children) in the center.
 * - Modular, clean, and uses only React state for all transitions.
 * - Animations/visibility via Tailwind utility classes + custom keyframes.
 *
 * Props:
 *   children: (optional) - Auth form or UI to show after transition completes.
 *   duration?: (optional) - Duration before transition (ms), default 2500.
 *
 * Usage:
 *   <SplashScreen>
 *     <YourAuthForm />
 *   </SplashScreen>
 */
// PUBLIC_INTERFACE
function SplashScreen({ children, duration = 2500 }) {
  // 'bloom' (center-in), 'shrink-slide' (shrink+move), 'docked' (fixed top-left), 'complete'
  const [phase, setPhase] = useState("bloom");

  useEffect(() => {
    let t1, t2;
    if (phase === "bloom") {
      t1 = setTimeout(() => setPhase("shrink-slide"), duration);
    } else if (phase === "shrink-slide") {
      t2 = setTimeout(() => setPhase("docked"), 950); // allow slide/shrink anim
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, duration]);

  // We only show children (auth form) after animation to top-left completes
  const readyForChildren = phase === "docked" || phase === "complete";

  // Animation class for the logo per phase
  let logoAnimClass = "";
  if (phase === "bloom") {
    logoAnimClass = "splash-bloom-in";
  } else if (phase === "shrink-slide") {
    logoAnimClass = "splash-shrink-slide";
  } else if (phase === "docked" || phase === "complete") {
    logoAnimClass = "splash-docked";
  }

  // Logo positioning (center vs top left); top left in 'docked' or after shrink-slide complete
  const logoPos = phase === "docked" || phase === "complete"
    ? "fixed top-4 left-6 sm:top-4 sm:left-10 z-30"
    : "absolute inset-0 flex items-center justify-center z-30";

  // Logo size (text)
  const logoTextSize = phase === "docked" || phase === "complete"
    ? "text-3xl sm:text-4xl"
    : "text-5xl sm:text-6xl";

  // Logo extra color/decoration styles
  const logoTextStyle = {
    color: "#e087fb",
    letterSpacing: (phase === "docked" || phase === "complete") ? "0.17em" : "0.23em",
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: 900,
    textShadow: phase === "bloom"
      ? "0 2px 18px #e087fb55"
      : "0 1.5px 7px #20114040",
    filter: phase === "bloom"
      ? "blur(0.5px) drop-shadow(0 7px 32px #d87ffb77)"
      : undefined,
    transition: "all 0.62s cubic-bezier(.7,0,.23,1)",
    cursor: "default"
  };

  // Splash background stays until all transitions complete
  return (
    <div
      className={
        "fixed inset-0 z-[150] flex flex-col items-center justify-center bg-gradient-to-tr from-[#1D1532] via-black to-[#2a1534] " +
        "transition-opacity duration-500"
      }
      style={{
        minHeight: "100vh",
        width: "100vw",
        pointerEvents: readyForChildren ? "none" : "auto"
      }}
      aria-hidden={readyForChildren}
    >
      {/* Animated Logo */}
      <div
        className={logoPos}
        style={{
          minHeight: "88px",
          minWidth: "240px",
          maxWidth: "98vw",
          pointerEvents: "none"
        }}
      >
        <span
          className={
            "block px-2 rounded-xl whitespace-nowrap select-none " +
            logoTextSize +
            " " +
            logoAnimClass
          }
          style={logoTextStyle}
          aria-label="My AuraGram"
        >
          My AuraGram
        </span>
      </div>
      {/* When ready, fade in children (auth form) centered */}
      <div
        className={
          "absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-700 " +
          (readyForChildren ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        style={{
          transitionDelay: readyForChildren ? "120ms" : "0ms"
        }}
      >
        {readyForChildren ? children : null}
      </div>
      {/* Custom keyframes for blooming and slide effects */}
      <style>{`
        .splash-bloom-in {
          animation: myaurabloom-in 0.95s cubic-bezier(.49,0,.27,1) 0s both;
        }
        .splash-shrink-slide {
          animation: myaurabloom-shrinkslide 0.92s cubic-bezier(.75,0,.27,1) 0s both;
        }
        .splash-docked {
          /* At top left: no further animation, but scale and position are now 'final' */
        }
        @keyframes myaurabloom-in {
          0% {
            opacity: 0.2;
            transform: scale(0.45) rotate(-7deg);
            filter: blur(18px);
          }
          77% {
            opacity: 1; 
            transform: scale(1.15) rotate(-2deg);
            filter: blur(0px);
          }
          98% {
            opacity: 1; 
            transform: scale(0.99) rotate(0deg);
            filter: blur(0.0px);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
        @keyframes myaurabloom-shrinkslide {
          0% {
            /* Start from center, scale 1 */
            transform: scale(1) translate(0px,0px);
            opacity: 1;
          }
          64% {
            transform: scale(0.65) translate(-23vw, -14vw);
            opacity: 1;
          }
          100% {
            /* Final: scale matches docked in top left */
            transform: scale(0.61) translate(-38vw, -32vh);
            opacity: 1;
          }
        }
        @media (min-width: 600px) {
          @keyframes myaurabloom-shrinkslide {
            0% { transform: scale(1) translate(0px,0px);}
            70% { transform: scale(0.64) translate(-11vw, -7vw);}
            100% { transform: scale(0.58) translate(-20vw, -14vh);}
          }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;
