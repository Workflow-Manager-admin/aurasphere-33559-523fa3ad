import React, { useEffect } from "react";

// PUBLIC_INTERFACE
/** Modal overlay for post detail, smooth fade/scale, touch-close, gradient background. */
function PostModal({ post, onClose }) {
  // Close on Escape
  useEffect(() => {
    const cb = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", cb);
    return () => document.removeEventListener("keydown", cb);
  }, [onClose]);
  // Trap scroll
  useEffect(() => {
    document.body.style.overscrollBehaviorY = 'contain';
    return () => { document.body.style.overscrollBehaviorY = ''; }
  }, []);
  if (!post) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-[3.5px] transition-all animate-exploremfade"
      onClick={onClose}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      style={{ animation: "modal-explorescale-in 0.26s cubic-bezier(.41,0,.62,1)" }}
    >
      <div
        className="bg-white/95 rounded-3xl relative max-w-lg w-[92vw] sm:w-[440px] shadow-xl border border-pink-200/60 p-0 md:p-2 transition-transform duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-5 text-pink-400 hover:text-pink-700 text-2xl font-bold bg-white/60 rounded-full w-9 h-9 flex items-center justify-center shadow-lg transition"
          aria-label="Close"
          onClick={onClose}
          style={{ zIndex:2 }}
        >×</button>
        <div className="flex flex-col gap-3 pb-2">
          <div className="rounded-t-2xl overflow-hidden">
            <img
              src={post.media.src}
              alt={post.caption?.slice(0, 70) || "Post detail"}
              className="w-full h-[340px] object-cover"
            />
          </div>
          <div className="flex items-center gap-3 px-4 -mt-4">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full border-2 border-pink-100 shadow"
            />
            <span className="font-semibold text-gray-800 text-base">
              {post.user.name}
            </span>
            <span className="ml-auto text-pink-400 font-medium text-sm">❤ {post.likes}</span>
          </div>
          <div className="px-4 pb-2">
            <p className="text-base text-gray-700 font-normal break-words leading-relaxed">
              {post.caption}
            </p>
            <div className="text-xs text-black font-bold mt-2">
              #{post.category?.toLowerCase()}
            </div>
          </div>
        </div>
        <style>
          {`
            @keyframes modal-explorescale-in {from{transform:scale(.92); opacity:0;}to{transform:scale(1); opacity:1;}}
            .animate-exploremfade { animation: modal-explorescale-in 0.28s cubic-bezier(.44,0,.56,1);}
          `}
        </style>
      </div>
    </div>
  );
}

export default PostModal;
