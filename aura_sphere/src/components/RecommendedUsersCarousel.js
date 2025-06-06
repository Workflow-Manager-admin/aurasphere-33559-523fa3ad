import React, { useRef, useState, useEffect } from "react";

// PUBLIC_INTERFACE
/** Carousel of recommended users, pastel/gradient badge avatars, horizontal scroll. */
function RecommendedUsersCarousel({ users }) {
  const carousel = useRef();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Touch/mouse mobile drag scroll
  useEffect(() => {
    const el = carousel.current;
    if (!el) return;
    const handle = () => {
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollWidth - el.clientWidth - el.scrollLeft < 8);
    };
    el.addEventListener("scroll", handle);
    handle();
    return () => el.removeEventListener("scroll", handle);
  }, [users]);

  return (
    <div className="rec-users-carousel">
      <h3 className="text-lg font-bold text-black bg-gradient-to-r from-pink-200 via-gray-200 to-purple-100 bg-clip-text text-transparent mb-2 ml-1">
        Recommended Creators
      </h3>
      <div className="relative">
        <button
          className={"absolute z-10 left-0 top-[30%] h-12 px-2 text-2xl font-bold text-pink-300 bg-white/70 rounded-full shadow-md transition hover:scale-110" + (atStart ? " opacity-0 pointer-events-none" : "")}
          aria-label="Scroll left"
          tabIndex={-1}
          onClick={() => carousel.current && (carousel.current.scrollLeft -= 85)}
        >‹</button>
        <div
          ref={carousel}
          className="flex gap-4 overflow-x-auto py-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-purple-50 snap-x snap-mandatory select-none no-scrollbar transition-shadow"
          tabIndex={0}
        >
          {users.map((user, idx) => (
            <div
              key={user.id}
              className="flex flex-col items-center min-w-[80px] max-w-[94px] snap-start"
              style={{ touchAction: "pan-x" }}
            >
              <div className={`rounded-full overflow-hidden mb-2 p-1 bg-gradient-to-r from-fuchsia-300 via-gray-200 to-pink-100 shadow-lg animate-pulseUsr${idx % 3}`}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-white/80"
                  draggable={false}
                />
              </div>
              <span className="text-sm font-medium text-gray-800">{user.name}</span>
              <button className="mt-1 px-3 py-1 bg-gradient-to-r from-pink-200 via-gray-200 to-violet-200 text-indigo-900 text-xs font-semibold rounded-xl shadow transition-colors active:scale-98">
                Follow
              </button>
              <style>{`
                @keyframes pulseUsr0 { 0%{filter:brightness(1);} 42%{filter:brightness(1.08);} 100%{filter:brightness(1);} }
                @keyframes pulseUsr1 { 0%{filter:brightness(1.07);} 52%{filter:brightness(1.15);} 100%{filter:brightness(1.07);} }
                @keyframes pulseUsr2 { 0%{filter:brightness(0.96);} 70%{filter:brightness(1.03);} 100%{filter:brightness(0.96);} }
                .animate-pulseUsr0 { animation: pulseUsr0 5.6s infinite; }
                .animate-pulseUsr1 { animation: pulseUsr1 7.6s infinite;}
                .animate-pulseUsr2 { animation: pulseUsr2 6.2s infinite;}
                .no-scrollbar::-webkit-scrollbar {display:none;}
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none;}
              `}</style>
            </div>
          ))}
        </div>
        <button
          className={"absolute z-10 right-0 top-[30%] h-12 px-2 text-2xl font-bold text-pink-300 bg-white/70 rounded-full shadow-md transition hover:scale-110" + (atEnd ? " opacity-0 pointer-events-none" : "")}
          aria-label="Scroll right"
          tabIndex={-1}
          onClick={() => carousel.current && (carousel.current.scrollLeft += 85)}
        >›</button>
      </div>
    </div>
  );
}

export default RecommendedUsersCarousel;
