import React, { useEffect, useState } from "react";

/**
 * SplashScreen: centered "My AuraGram" blooming, then slides/shrinks to top-left, holds fixed,
 * then reveals login/signup UI.
 * Sequence:
 *  1. Centered brand symbol ("bloom" in - scale/fade/blur in).
 *  2. After ~1.5s, animates scale down and slides to header's top left.
 *  3. Auth UI fades/slides in only after animation.
 *
 * phases:
 *  'bloom' -> 'slide' -> 'fixed'
 *
 * Props:
 *   onComplete: called after animation and ready to show Auth UI.
 */
//
// PUBLIC_INTERFACE
function SplashScreen({ onComplete }) {
  // animation phase: "bloom" (center+grow), "slide" (move to top-left), "fixed" (done anim), "hide" (unmount)
  const [phase, setPhase] = useState("bloom");
  // Auth UI visibility (to fade in after brand at top), internal phase management
  const [showAuth, setShowAuth] = useState(false);

  // Timing (can tweak for best feel)
  useEffect(() => {
    let t1, t2;
    if (phase === "bloom") {
      // Hold bloom ~1.35s, then start slide
      t1 = setTimeout(() => setPhase("slide"), 1350);
    } else if (phase === "slide") {
      // Slide-to-top-left and shrink (~0.85s), then fix and show auth after slight delay
      t2 = setTimeout(() => {
        setPhase("fixed");
        setTimeout(() => setShowAuth(true), 300); // slight delay for settle
      }, 850);
    } else if (phase === "fixed") {
      // Do nothing; wait for parent/onComplete to fade out.
    }
    return () => {
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [phase]);

  // Handle completion: when auth appeared and user signals proceed, call onComplete
  useEffect(() => {
    // Future: Optionally automatically fade-out after some time.
    // Not used (parent controls mount).
  }, [showAuth, onComplete]);

  // Helpers for styles per phase
  const getBrandClass = () => {
    // Tailwind classes + inline style for advanced transitions (see extra style below)
    switch (phase) {
      case "bloom":
        return "splash-brand-bloom";
      case "slide":
        return "splash-brand-slide";
      case "fixed":
        return "splash-brand-fixed";
      default:
        return "";
    }
  };

  // For accessibility: don't allow tab focus under overlay
  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#1E1833] to-[#2a1534] transition-all duration-500"
      aria-hidden={!showAuth}
      tabIndex={-1}
      style={{
        minHeight: "100vh",
        pointerEvents: showAuth ? "none" : "auto",
        opacity: 1,
      }}
    >
      {/* Animated Brand */}
      <div
        className={
          "absolute" +
          (phase === "fixed"
            ? " top-[16px] left-[32px] md:top-[16px] md:left-[32px] z-[112]" // header pos
            : " top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[130]")
        }
        style={{
          width: phase === "fixed" ? 170 : 270,
          height: phase === "fixed" ? 60 : 130,
          pointerEvents: "none",
          transition:
            "all 0.79s cubic-bezier(0.86,0,.21,1) 0s, color 0.25s, background 0.18s",
        }}
      >
        <span
          className={
            "block font-extrabold select-none text-white tracking-widest border-0 rounded-xl shadow-xl px-0 md:px-2 whitespace-nowrap overflow-visible " +
            getBrandClass()
          }
          style={{
            fontSize: phase === "fixed" ? "2.15rem" : "3.25rem",
            letterSpacing: phase === "fixed" ? "2.6px" : "4.0px",
            color: "#e087fb",
            filter:
              phase === "bloom"
                ? "blur(0.5px) drop-shadow(0 12px 48px #d87ffb66)"
                : "none",
            transition:
              "all 0.8s cubic-bezier(0.82,0,.35,1), color 0.24s, filter 0.28s",
            textShadow:
              phase === "bloom"
                ? "0 2.5px 24px #d87ffb55"
                : "0 1.5px 6px #23184f41",
            backgroundImage:
              phase === "fixed"
                ? "none"
                : "linear-gradient(80deg,#fff6,#ce62e2 80%, transparent 100%)",
            backgroundClip: phase === "fixed" ? "unset" : "text",
          }}
        >
          MY AURAGRAM
        </span>
      </div>

      {/* Overlay, show nothing else until done; optionally fade color bg */}
      {/* When ready to show Auth, fade in children (login/signup UI) */}
      <div
        className={
          "transition-opacity transition-transform duration-700 w-full flex justify-center items-center absolute inset-0 z-[90] pointer-events-none " +
          (showAuth && phase === "fixed"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95")
        }
        style={{
          pointerEvents: showAuth && phase === "fixed" ? "auto" : "none",
          background: "transparent",
        }}
      >
        {showAuth && phase === "fixed" && (
          // Render children as AuthView (parent controls what's rendered)
          <div className="splash-auth-children w-full h-full flex items-center justify-center animate-splashFadeIn">
            {/* Children (login/signup UI) go here (App.js) */}
            {typeof onComplete === "function" ? (
              // Optionally: on child completion, can call onComplete() (Not used here)
              // Just render nothing - parent controls when SplashScreen disappears
              null
            ) : null}
          </div>
        )}
      </div>
      {/* Extra animation keyframes/styles */}
      <style>{`
        .splash-brand-bloom {
          animation: splashBloomIn 1.15s cubic-bezier(0.67,0,.36,1) 0s both;
        }
        .splash-brand-slide {
          animation: splashSlideToCorner 0.82s cubic-bezier(0.82,0,.35,1) 0s both;
        }
        .splash-brand-fixed {
          /* No animation, top-left via position above */
        }
        @keyframes splashBloomIn {
          0% { opacity: 0; transform: scale(0.71) rotate(-6deg); filter: blur(17px);}
          70% { opacity: 1; transform: scale(1.12) rotate(-3deg); filter: blur(0);}
          100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0);}
        }
        @keyframes splashSlideToCorner {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            filter: blur(0);
          }
          75% {
            transform: translate(-56%, -71%) scale(0.56);
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) scale(0.58);
            top: 16px; left: 32px;
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-splashFadeIn {
          animation: splashFadeIn 0.8s cubic-bezier(.45,0,.49,1) 0.18s both;
        }
        @keyframes splashFadeIn {
          from { opacity: 0; transform: scale(1.14) translateY(32px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;
