import React, { useRef, useEffect } from "react";

// PUBLIC_INTERFACE
/** Horizontal list of category filter chips, pastel/gradient, scrollable. */
function CategoryFilterBar({ categories, selected, onSelect }) {
  const scroller = useRef();
  useEffect(() => {
    // Autoscroll selected into view
    if (!scroller.current) return;
    const idx = categories.indexOf(selected);
    if (idx > 0) {
      const children = scroller.current.children;
      if (children[idx]) {
        children[idx].scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      }
    }
  }, [selected, categories]);
  return (
    <nav
      ref={scroller}
      className="flex gap-2 px-1 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-purple-50 pb-1 select-none no-scrollbar"
      aria-label="Category Filter"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect?.(cat)}
          className={
            "flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm focus:outline-none transition-all" +
            " " +
            (cat === selected
              ? "bg-gradient-to-r from-fuchsia-300 to-pink-200 text-indigo-900 shadow-md scale-105"
              : "bg-gradient-to-r from-pink-50 via-blue-50 to-violet-100 text-blue-700 hover:scale-102")
          }
          aria-pressed={cat === selected}
          style={{ boxShadow: cat === selected ? "0 2px 16px #e0a4ff44" : "0 2px 6px #eed2ff0c" }}
        >
          {cat}
        </button>
      ))}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none;}
      `}</style>
    </nav>
  );
}

export default CategoryFilterBar;
