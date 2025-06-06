import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import CategoryFilterBar from "../../components/CategoryFilterBar";
import MasonryGrid from "../../components/MasonryGrid";
import PostModal from "../../components/PostModal";
import RecommendedUsersCarousel from "../../components/RecommendedUsersCarousel";

// --- DEMO/MOCK DATA for Demo Purposes ---
const CATEGORIES = [
  "All", "Art", "Nature", "Fashion", "Photography", "Tech", "Music", "Travel", "Mood", "Pets"
];
const demoUsers = [
  { id: "1", name: "Willow", avatar: "/assets/avatar1.png" },
  { id: "2", name: "Seren", avatar: "/assets/avatar2.png" },
  { id: "3", name: "Aiden", avatar: "/assets/avatar3.png" },
  { id: "4", name: "Sky", avatar: "/assets/avatar4.png" },
  { id: "5", name: "Noor", avatar: "/assets/avatar5.png" },
  { id: "6", name: "Kai", avatar: "/assets/avatar6.png" },
  { id: "7", name: "Rhea", avatar: "/assets/avatar7.png" },
];
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const DEMO_POSTS = Array.from({ length: 25 }, (_, i) => {
  // Assign avatar image for each user post
  const avatarIdx = (i % demoUsers.length) + 1;
  const u = {
    ...demoUsers[i % demoUsers.length],
    avatar: `/assets/avatar${avatarIdx}.png`,
  };
  const ratio = [3 / 4, 1, 5 / 4][i % 3] + (Math.random() * 0.15 - 0.08);
  return {
    id: `explore-${i}`,
    user: u,
    category: CATEGORIES[(i + i % 3) % CATEGORIES.length],
    media: {
      src: `https://picsum.photos/seed/explore${i}${i * 37}/400/${Math.round(
        400 * ratio
      )}`,
      type: "image",
      aspect: ratio,
    },
    likes: randomBetween(5, 900),
    caption: [
      "Pastel moments. Dream big.",
      "Energy in color 🎨",
      "Lost in vibes 🌈",
      "Sun, aura, sky. This mood.",
      "Framed by feeling.",
      "Let your colors fly!",
      "Magic found here.",
    ][i % 7],
    createdAt: Date.now() - randomBetween(300_000, 90000000),
  };
});

// --- PUBLIC_INTERFACE
/** ExplorePage: Responsive, animated, pastel/gradient UI Explore page. */
function ExplorePage() {
  // Search/filter state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  // Modal state for viewing a post
  const [modalPost, setModalPost] = useState(null);

  // Filter & search logic
  const visiblePosts = DEMO_POSTS.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (!search || p.caption.toLowerCase().includes(search.toLowerCase()))
  );

  // Responsive: lock page scroll under modal
  useEffect(() => {
    if (modalPost) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; }
    }
  }, [modalPost]);

  return (
    <div className="explore-page min-h-[calc(100vh-64px)] px-0 sm:px-2 py-0 sm:py-2">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section: Search and Category */}
        <div className="pt-2 pb-3 flex flex-col gap-2 w-full sticky top-0 z-30 bg-gradient-to-b from-pink-50/50 via-white/70 to-transparent backdrop-blur-sm animate-fadein">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilterBar
            categories={CATEGORIES}
            selected={category}
            onSelect={setCategory}
          />
        </div>
        {/* Main Content Grid */}
        <section className="flex flex-col md:flex-row mt-1 gap-10 md:gap-8">
          {/* Grid */}
          <div className="flex-1 min-w-0 transition-all duration-200">
            <MasonryGrid
              posts={visiblePosts}
              onPostClick={setModalPost}
              pastel
              gradient
            />
          </div>
          {/* Sidebar Recommendations on large */}
          <aside className="hidden md:block ml-2 flex-shrink-0 w-[300px] animate-slidefadein">
            <RecommendedUsersCarousel users={demoUsers} />
          </aside>
        </section>
        {/* Carousel on mobile */}
        <div className="block md:hidden mt-6 mb-10 animate-slidefadein">
          <RecommendedUsersCarousel users={demoUsers} />
        </div>
      </div>
      {/* Modal: Post Detail (Implement smooth fade + scale in Tailwind) */}
      {modalPost && (
        <PostModal
          post={modalPost}
          onClose={() => setModalPost(null)}
        />
      )}
      {/* Custom pastel/gradient background blurred shape */}
      <GradientAuraBackground />
    </div>
  );
}

// --- PUBLIC_INTERFACE
function GradientAuraBackground() {
  // Soft animated colorful blobs behind as visual accent
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-0 top-0 left-0 w-full h-full overflow-hidden"
      style={{ filter: "blur(48px)", opacity: 0.36 }}
    >
      <div className="absolute top-[-10%] left-[30%] w-[40vw] h-[38vw] bg-gradient-to-r from-pink-300 via-gray-200 to-gray-400 rounded-full mix-blend-multiply animate-pulseBlob" />
      <div className="absolute bottom-[-15%] right-[17%] w-[33vw] h-[28vw] bg-gradient-to-l from-fuchsia-300 via-violet-200 to-purple-200 rounded-[55%] opacity-60 animate-pulseBlob2" />
      <div className="absolute top-[70%] left-[-6%] w-[28vw] h-[20vw] bg-gradient-to-b from-amber-200 via-pink-100 to-pink-300 rounded-full opacity-50 animate-pulseBlob3" />
      <style>
        {`
        @keyframes pulseBlob {
          0% {transform: scale(1);}
          48% {transform: scale(1.1);}
          100% {transform: scale(1);}
        }
        @keyframes pulseBlob2 {
          0% {transform: scale(1) translateY(0);}
          50% {transform: scale(1.07) translateY(13px);}
          100% {transform: scale(1) translateY(0);}
        }
        @keyframes pulseBlob3 {
          0% {transform: scale(1);}
          55% {transform: scale(0.94);}
          100% {transform: scale(1);}
        }
        .animate-pulseBlob { animation: pulseBlob 10s cubic-bezier(.43,0,0.57,1) infinite; }
        .animate-pulseBlob2 { animation: pulseBlob2 13s cubic-bezier(.43,0,0.57,1) infinite; }
        .animate-pulseBlob3 { animation: pulseBlob3 7s cubic-bezier(.43,0,0.57,1) infinite; }
        .animate-fadein { animation: fadeInAura 0.55s;}
        .animate-slidefadein { animation: slidefadeInAura 0.55s;}
        @keyframes fadeInAura {
          from { opacity:0; }
          to { opacity:1; }
        }
        @keyframes slidefadeInAura {
          from { opacity:0; transform: translateY(18px);}
          to { opacity:1; transform: none; }
        }
        `}
      </style>
    </div>
  );
}

export default ExplorePage;
