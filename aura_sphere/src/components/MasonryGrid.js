import React, { useCallback } from "react";

// PUBLIC_INTERFACE
/** Responsive masonry/grid, posts as tiles, pastel/gradient hover, mobile/touch optimized. */
function MasonryGrid({ posts, onPostClick, pastel, gradient }) {
  // Use CSS grid-break columns for responsive masonry (browser compatible/fallback)
  return (
    <div
      className="masonry-grid grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      style={{ alignItems: "stretch" }}
      role="list"
    >
      {posts.map((post, i) => (
        <button
          key={post.id}
          type="button"
          className={
            "group aspect-[4/5] relative rounded-3xl overflow-hidden transition-transform outline-none focus:ring-2 focus:ring-violet-300 " +
            "masonry-tile " +
            (i % 9 === 2 || i % 11 === 8 ? "row-span-2 aspect-[3/4] sm:aspect-[2/3]" : "")
          }
          style={{
            background:
              gradient
                ? "linear-gradient(120deg,#f7ddff 80%,#dff5ff 100%)"
                : pastel
                  ? "#ffe6fc"
                  : "#f8f4ff",
            boxShadow: "0 4px 20px #e3d8ff22",
            cursor: "pointer",
            touchAction: "manipulation",
          }}
          tabIndex={0}
          onClick={() => onPostClick?.(post)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onPostClick?.(post);
          }}
        >
          <img
            src={post.media.src}
            alt={post.caption?.slice(0, 60) || "Explore Post"}
            className="w-full h-full object-cover transform group-hover:scale-[1.05] group-active:scale-100 transition-transform duration-200"
            draggable={false}
          />
          <div className="absolute left-0 right-0 bottom-0 flex flex-col items-start gap-0 px-3 pb-2 pt-8 bg-gradient-to-t from-white/70 via-white/20 to-transparent pointer-events-none">
            <span className="text-xs font-bold text-pink-400 drop-shadow-sm">{`❤ ${post.likes}`}</span>
            <span className="text-xs font-semibold text-gray-800/90">{post.user.name}</span>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-75 group-focus:opacity-75 transition-all duration-200 bg-gradient-to-br from-violet-100/70 via-pink-100/18 to-sky-100/8"></div>
        </button>
      ))}
    </div>
  );
}

export default MasonryGrid;
