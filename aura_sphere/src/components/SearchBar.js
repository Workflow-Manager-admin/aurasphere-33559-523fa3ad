import React, { useRef, useEffect } from "react";

// PUBLIC_INTERFACE
/** Softly styled search bar with icon, mobile/touch optimized. */
function SearchBar({ value, onChange }) {
  const ref = useRef();
  useEffect(() => {
    if (window.innerWidth < 600 && ref.current) ref.current.blur();
  }, []);

  return (
    <div className="relative flex items-center w-full max-w-xl mx-auto">
      <span className="absolute left-3 text-black text-lg" aria-hidden>
        <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="10" r="7" stroke="currentColor" strokeWidth="2"/><path d="M18 18L15.2 15.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
      <input
        ref={ref}
        type="search"
        className="w-full rounded-full bg-gradient-to-r from-white/85 via-gray-100/70 to-fuchsia-50/85 border border-pink-200/45 px-11 py-2 focus:outline-none focus:ring-2 focus:ring-black text-base text-gray-800 placeholder:text-gray-400 transition-shadow shadow-md"
        placeholder="Search posts, creators, #hashtags..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        autoCapitalize="none"
        aria-label="Explore Search"
      />
      {/* Touch clear */}
      {value && (
        <button
          type="button"
          className="absolute right-3 text-pink-400 text-lg bg-white/70 hover:bg-pink-50 px-1 rounded-full transition"
          style={{lineHeight:1}}
          onClick={() => onChange?.("")}
          aria-label="Clear search"
        >×</button>
      )}
    </div>
  );
}

export default SearchBar;
