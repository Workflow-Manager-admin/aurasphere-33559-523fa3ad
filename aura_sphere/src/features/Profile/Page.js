import React, { useState, useMemo, useCallback, useEffect } from "react";

// Sample/Mock Data for Profile Demo
const PROFILE_USER = {
  id: "sidendream",
  name: "Siden Dream",
  username: "sidendream",
  avatar: "/assets/avatar1.png",
  bio:
    "Lost in pastel dreams. Color, mood, and moments 📷🌈 | Digital creative & auragrapher | DM for collabs |",
  location: "Aurora City, CA",
  website: "https://aura-gram.space",
  followers: 21800,
  following: 381,
  posts: 90,
  isMe: true // controls edit or follow button display
};

// Demo highlight stories (use sample images/avatars)
const HIGHLIGHTS = [
  { id: 1, label: "Trips", img: "/assets/post-siden.jpg" },
  { id: 2, label: "Vibes", img: "/assets/post-willow.jpg" },
  { id: 3, label: "Sky", img: "/assets/post-sky.jpg" },
  { id: 4, label: "Pets", img: "/assets/avatar5.png" },
  { id: 5, label: "Art", img: "/assets/post-seren.jpg" }
];

const userPostImages = [
  "/assets/post-siden.jpg",
  "/assets/post-willow.jpg",
  "/assets/post-kai.jpg",
  "/assets/post-seren.jpg",
  "/assets/post-noor.jpg",
  "/assets/post-rhea.jpg",
  "/assets/post-sky.jpg"
];

// Dummy data for posts, reels, tagged
function makePost(i) {
  return {
    id: `siden-${i}`,
    image: userPostImages[i % userPostImages.length],
    type: "image",
    liked: i % 3 === 1,
    likes: 2000 + i * 19,
    caption: `Aura ${i} - Energy in color!`,
    location: i % 4 === 1 ? "Venice Beach" : undefined,
    aspect: [1, 1, 0.7, 1.2][i % 4]
  };
}
function makeReel(i) {
  // We'll mock reels as image posters with play symbol
  return {
    id: `reel-${i}`,
    image: userPostImages[(i + 4) % userPostImages.length],
    type: "video",
    likes: 1200 + i * 22,
    caption: `Reel #${i} - Dancing Light 🎶`,
    aspect: [0.6, 1, 0.9][i % 3]
  };
}
function makeTagged(i) {
  return {
    id: `tagged-${i}`,
    image: userPostImages[(i + 2) % userPostImages.length],
    type: "image",
    caption: `Tagged Moment #${i}`,
    aspect: [1, 1, 0.8][i % 3]
  };
}
const DEMO_POSTS = Array.from({ length: 16 }, (_, i) => makePost(i));
const DEMO_REELS = Array.from({ length: 6 }, (_, i) => makeReel(i));
const DEMO_TAGGED = Array.from({ length: 7 }, (_, i) => makeTagged(i));

// Tab config
const PROFILE_TABS = [
  { key: "grid", label: "Posts", icon: GridIcon },
  { key: "reels", label: "Reels", icon: ReelsIcon },
  { key: "tagged", label: "Tagged", icon: TaggedIcon }
];

// --- COMPONENTS ---

// PUBLIC_INTERFACE
function ProfilePage() {
  // Always enforce dark mode, remove toggle state/UI
  useEffect(() => {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("aura_theme", "dark");
    }
  }, []);

  const [activeTab, setActiveTab] = useState("grid");
  const [following, setFollowing] = useState(false); // for follow button logic

  // Posts per tab
  const posts = DEMO_POSTS;
  const reels = DEMO_REELS;
  const tagged = DEMO_TAGGED;

  // "Me" user props for edit action vs follow
  const isMe = PROFILE_USER.isMe;

  return (
    <div className="profile-page min-h-[calc(100vh-64px)] flex flex-col items-center px-0 pt-8 pb-16 transition-all">
      {/* Profile Header */}
      <section className="relative w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-7 sm:gap-10 pt-2 pb-2">
        <ProfileHeader
          user={PROFILE_USER}
          isMe={isMe}
          following={following}
          setFollowing={setFollowing}
        />
        {/* Right side: stats and actions */}
        <div className="flex flex-col items-center sm:items-end flex-1 w-full gap-4 mt-3 sm:mt-0">
          <UserStatsBar user={PROFILE_USER} />
          <ProfileActionButton
            isMe={isMe}
            following={following}
            setFollowing={setFollowing}
          />
        </div>
      </section>

      {/* Highlight Stories */}
      <HighlightStoriesRow highlights={HIGHLIGHTS} />

      {/* Tabs */}
      <ProfileTabs
        tabs={PROFILE_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content (Grid, Reels, Tagged) */}
      <section className="w-full max-w-3xl mx-auto mt-3 flex-1 min-h-[350px]">
        <ProfileTabContents
          tab={activeTab}
          posts={posts}
          reels={reels}
          tagged={tagged}
        />
      </section>

      {/* Gradient Blob/Accent BG */}
      <GradientAuraProfileBG />

      {/* Inline styles for pastel/gradient and mobile responsiveness */}
      <style>{`
        .profile-page {
          /* Always dark background; light mode removed */
          background: linear-gradient(125deg, #10101b 55%, #232235 100%);
          transition: background 0.25s;
        }
        /* Avatars and grid responsive */
        @media (max-width: 700px) {
          .profile-avatar { width: 94px !important; height: 94px !important;}
          .profile-header-section { flex-direction: column !important; gap: 14px !important;}
          .profile-stats-bar { flex-direction: column; gap: 2px !important;}
        }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
function ProfileHeader({
  user,
  isMe,
  following,
  setFollowing
}) {
  return (
    <div className="profile-header-section flex flex-col items-center sm:flex-row sm:items-start gap-3 min-w-[164px]">
      {/* Avatar: gradient border */}
      <div className="ms-auto me-auto sm:me-0">
        <span
          className="inline-block p-[3.2px] rounded-full bg-gradient-to-tr from-fuchsia-300 via-pink-200 to-violet-200 shadow-xl profile-avatar"
          style={{
            boxShadow: "0 1px 28px #d3a6ff55",
            width: 118,
            height: 118
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-[112px] h-[112px] object-cover rounded-full border-2 border-white shadow profile-avatar"
            style={{ background: "#eaeaff" }}
            draggable={false}
          />
        </span>
      </div>
      {/* Bio & Info */}
      <div className="flex flex-col items-center sm:items-start gap-1 max-w-[260px] mt-2 sm:mt-5">
        <div className="flex flex-row flex-wrap items-center gap-1.5">
          <span className="font-bold text-xl text-black dark:text-white leading-tight tracking-tight">
            {user.name}
          </span>
          <span className="ml-1 text-base text-pink-500 font-semibold">@{user.username}</span>
        </div>
        <div className="text-[15px] text-neutral-700 dark:text-neutral-200 font-medium mt-1 break-words text-center sm:text-left" style={{ wordBreak: "break-word", lineHeight: "1.2" }}>
          {user.bio}
        </div>
        {(user.location || user.website) && (
          <div className="flex gap-3 mt-1 text-sm items-center text-indigo-500 font-medium">
            {user.location && (
              <span className="flex items-center gap-1">
                <LocationIcon color="#686eaa" />
                {user.location}
              </span>
            )}
            {user.website && (
              <a
                href={user.website}
                className="underline hover:text-pink-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function UserStatsBar({ user }) {
  return (
    <div className="profile-stats-bar flex flex-row gap-10 sm:gap-7 items-center sm:justify-end justify-center text-black dark:text-white mt-3 select-none">
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{user.posts}</span>
        <span className="text-xs tracking-wide text-neutral-500 dark:text-neutral-300 font-semibold">Posts</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{formatStat(user.followers)}</span>
        <span className="text-xs tracking-wide text-neutral-500 dark:text-neutral-300 font-semibold">Followers</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">{formatStat(user.following)}</span>
        <span className="text-xs tracking-wide text-neutral-500 dark:text-neutral-300 font-semibold">Following</span>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ProfileActionButton({ isMe, following, setFollowing }) {
  const [anim, setAnim] = useState(false);

  const handleFollow = () => {
    setAnim(true);
    setTimeout(() => setAnim(false), 330);
    setFollowing((old) => !old);
  };

  if (isMe) {
    return (
      <button
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-300 via-violet-200 to-fuchsia-100 text-black font-bold shadow-lg hover:bg-gradient-to-bl focus:outline-none transition-all duration-150"
        style={{ fontWeight: 700, fontSize: "1rem" }}
      >
        Edit Profile
      </button>
    );
  }
  return (
    <button
      className={`px-6 py-2 rounded-full font-bold shadow-xl focus:outline-none transition-all group ${
        following
          ? "bg-gradient-to-r from-neutral-200 via-pink-50 to-fuchsia-100 text-neutral-700"
          : "bg-gradient-to-r from-fuchsia-200 via-violet-200 to-pink-200 text-black hover:scale-105 hover:shadow-2xl"
      } ${anim ? "animate-fadepop" : ""}`}
      style={{
        fontWeight: 700,
        fontSize: "1rem",
        boxShadow: "0 0.5px 18px #d6b6ff22"
      }}
      onClick={handleFollow}
    >
      {following ? "Following" : "Follow"}
      <style>{`
      @keyframes fadepop { 0%{transform:scale(1);} 18%{transform:scale(1.12);} 35%{transform:scale(.97);} 60%{transform:scale(1.08);} 100%{transform:scale(1);} }
      .animate-fadepop { animation: fadepop 0.33s linear; }
      `}</style>
    </button>
  );
}

// PUBLIC_INTERFACE
function HighlightStoriesRow({ highlights }) {
  return (
    <div className="profile-stories-row w-full max-w-3xl mx-auto flex gap-3 overflow-x-auto px-3 pt-3 pb-5 sm:justify-center no-scrollbar">
      {highlights.map((hl) => (
        <button
          key={hl.id}
          className="flex flex-col items-center focus:outline-none group"
          style={{ minWidth: 62, maxWidth: 76 }}
        >
          <span
            className="block rounded-full p-1.5 transition-all bg-gradient-to-tr from-fuchsia-200 via-pink-100 to-violet-100 group-hover:scale-105 group-focus:scale-105 shadow-lg"
            style={{
              width: 56,
              height: 56,
              boxShadow: "0 1.2px 8px #daceff44",
              border: "2px solid #fff"
            }}
          >
            <img
              src={hl.img}
              alt={hl.label}
              className="w-full h-full object-cover rounded-full border border-white"
              draggable={false}
            />
          </span>
          <span className="mt-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-100">
            {hl.label}
          </span>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none;}
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none;}
          `}</style>
        </button>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function ProfileTabs({ tabs, activeTab, onChange }) {
  return (
    <nav className="flex w-full max-w-3xl mx-auto items-center justify-center border-b border-violet-100/60 dark:border-indigo-900/40 mb-2 mt-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={
            "flex-1 flex flex-row gap-2 items-center justify-center py-3 relative font-bold text-base outline-none group transition-all" +
            (activeTab === tab.key
              ? " text-fuchsia-700 dark:text-pink-200 "
              : " text-neutral-500 hover:text-violet-300 dark:hover:text-pink-50")
          }
          onClick={() => onChange(tab.key)}
          style={{
            letterSpacing: ".03em",
            transition: "all 0.14s cubic-bezier(.48,0,.44,1)"
          }}
        >
          <span
            className={
              "transition-all " +
              (activeTab === tab.key
                ? "scale-110 drop-shadow-md"
                : "opacity-70 group-hover:opacity-95 group-focus:opacity-100")
            }
          >
            {tab.icon({ active: activeTab === tab.key })}
          </span>
          <span>{tab.label}</span>
          {activeTab === tab.key && (
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-1 h-[3px] w-14 rounded bg-gradient-to-r from-fuchsia-300 to-pink-200 shadow-md transition-all" />
          )}
        </button>
      ))}
    </nav>
  );
}

// PUBLIC_INTERFACE
function ProfileTabContents({ tab, posts, reels, tagged }) {
  if (tab === "grid")
    return <PostGrid posts={posts} />;
  if (tab === "reels")
    return <ReelsGrid reels={reels} />;
  if (tab === "tagged")
    return <TaggedGrid tagged={tagged} />;
  return null;
}

// PUBLIC_INTERFACE
function PostGrid({ posts }) {
  // Responsive grid; fade and hover; mobile friendly aspect
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="relative group aspect-[1/1] sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-tr from-pink-50 via-violet-100 to-fuchsia-50 hover:scale-105 focus:scale-105 active:scale-[.99] shadow hover:shadow-2xl transition-all duration-200"
          tabIndex={0}
          style={{
            background: `linear-gradient(120deg,#f7e2ff 84%,#e2f0ff 100%)`,
            boxShadow: "0 2px 16px #cbbaff12"
          }}
        >
          <img
            src={post.image}
            alt={post.caption?.slice(0, 97) || "User post"}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.06] group-active:scale-100"
            draggable={false}
          />
          <div className="absolute bottom-0 left-0 right-0 py-1 px-2 flex items-center justify-between bg-gradient-to-t from-white/70 via-white/10 to-transparent">
            <span className="text-pink-500 text-xs font-bold drop-shadow">❤ {post.likes}</span>
            <span className="text-black/90 text-xs font-semibold">{post.caption.split(" ")[0]}</span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-85 group-focus:opacity-85 transition-all duration-200 bg-gradient-to-br from-violet-50/50 via-pink-100/19 to-sky-100/8"></div>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function ReelsGrid({ reels }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
      {reels.map((reel, i) => (
        <div
          key={reel.id}
          className="relative group aspect-[9/16] sm:aspect-[12/17] rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-pink-100 shadow hover:scale-105 transition-transform cursor-pointer"
          style={{
            minHeight: 100,
            background: "linear-gradient(120deg,#ddf2ff,#faddeb 82%)"
          }}
          tabIndex={0}
        >
          <img
            src={reel.image}
            alt={reel.caption}
            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
            draggable={false}
          />
          {/* Play badge */}
          <span className="absolute left-2 top-2 rounded-full bg-white/70 text-pink-500 p-1.5 flex items-center shadow-sm">
            <svg width={22} height={22} viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" fill="#f9e9fe" /><polygon points="8.2,7.5 15,11 8.1,14.5" fill="#A855F7"/></svg>
          </span>
          <span className="absolute right-2 bottom-2 text-xs font-bold text-pink-500 bg-white/60 px-2 py-0.5 rounded-lg shadow">❤ {reel.likes}</span>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function TaggedGrid({ tagged }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
      {tagged.map((t, i) => (
        <div
          key={t.id}
          className="relative group aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-violet-100 to-fuchsia-50 hover:scale-105 focus:scale-105 transition-transform shadow"
          tabIndex={0}
        >
          <img
            src={t.image}
            alt={t.caption}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            draggable={false}
          />
          {/* Tag badge */}
          <span className="absolute left-2 top-2 rounded-2xl bg-white/80 text-pink-600 py-0.5 px-1.5 text-[11px] font-bold shadow-sm">Tagged</span>
        </div>
      ))}
    </div>
  );
}

// --- Styling Helper Components ---

function GradientAuraProfileBG() {
  // Subtle animated blobs for aura background
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[-1] top-0 left-0 w-full h-full overflow-hidden"
      style={{ filter: "blur(60px)", opacity: 0.28, pointerEvents: "none" }}
    >
      <div className="absolute top-[-6%] left-1/3 w-[36vw] h-[33vw] bg-gradient-to-r from-pink-200 via-purple-100 to-fuchsia-100 rounded-full mix-blend-multiply animate-pulseblobProfile" />
      <div className="absolute bottom-[-9%] right-[18%] w-[24vw] h-[17vw] bg-gradient-to-l from-fuchsia-300 via-pink-100 to-purple-200 rounded-[54%] opacity-55 animate-pulseblob2Profile" />
      <div className="absolute top-[71%] left-[-6%] w-[22vw] h-[13vw] bg-gradient-to-b from-amber-100 via-pink-100 to-pink-200 rounded-full opacity-44 animate-pulseblob3Profile" />
      <style>{`
        @keyframes pulseblobProfile {
          0% {transform: scale(1);}
          48% {transform: scale(1.09);}
          100% {transform: scale(1);}
        }
        @keyframes pulseblob2Profile {
          0% {transform: scale(1) translateY(0);}
          50% {transform: scale(1.06) translateY(16px);}
          100% {transform: scale(1) translateY(0);}
        }
        @keyframes pulseblob3Profile {
          0% {transform: scale(1);}
          55% {transform: scale(0.93);}
          100% {transform: scale(1);}
        }
        .animate-pulseblobProfile { animation: pulseblobProfile 11s cubic-bezier(.43,0,0.57,1) infinite; }
        .animate-pulseblob2Profile { animation: pulseblob2Profile 15s cubic-bezier(.43,0,0.57,1) infinite; }
        .animate-pulseblob3Profile { animation: pulseblob3Profile 8s cubic-bezier(.43,0,0.57,1) infinite; }
      `}</style>
    </div>
  );
}

// --- ICONS ---

function GridIcon({ active }) {
  return (
    <svg width={20} height={20} fill="none" stroke={active ? "#df2fa0" : "#8D7CC9"} strokeWidth={1.7} viewBox="0 0 20 20">
      <rect x="2.9" y="2.9" width="5.2" height="5.2" rx="1" fill={active ? "#fbe6fa" : "#fcfcfe"} strokeWidth={1.3}/>
      <rect x="11.9" y="2.9" width="5.2" height="5.2" rx="1" fill={active ? "#fbe6fa" : "#fcfcfe"} strokeWidth={1.3}/>
      <rect x="2.9" y="11.9" width="5.2" height="5.2" rx="1" fill={active ? "#fbe6fa" : "#fcfcfe"} strokeWidth={1.3}/>
      <rect x="11.9" y="11.9" width="5.2" height="5.2" rx="1" fill={active ? "#fbe6fa" : "#fcfcfe"} strokeWidth={1.3}/>
    </svg>
  );
}

function ReelsIcon({ active }) {
  return (
    <svg width={22} height={20} fill="none" viewBox="0 0 22 20" strokeWidth={1.6}>
      <rect x="2.6" y="2.8" width="16.8" height="14.5" rx="3.2" fill={active ? "#ffeaf9" : "#f5f5fa"} stroke={active ? "#db2ebc" : "#aaa9ca"} strokeWidth={active ? 1.9 : 1.2}/>
      <rect x="6.2" y="5.7" width="2.7" height="7.6" rx="1.12" fill={active ? "#e8c6fd" : "#e4e3f8"} />
      <rect x="11" y="5.7" width="2.7" height="7.6" rx="1.12" fill={active ? "#e8c6fd" : "#e4e3f8"} />
      <polygon points="17.1,11.5 17.1,8.6 20,10.05" fill={active ? "#f68fc7" : "#d1b8ea"} />
    </svg>
  );
}

function TaggedIcon({ active }) {
  return (
    <svg width={22} height={20} fill="none" viewBox="0 0 22 20">
      <rect x="3.4" y="3.2" width="15.5" height="13.8" rx="3" fill={active ? "#ffeafd" : "#f7f7fb"} stroke={active ? "#b431fb" : "#aaa9ca"} strokeWidth={active ? 1.7 : 1.1} />
      <circle cx={11.2} cy={10.8} r={3.2} fill="#e7d5f6" stroke={active ? "#df2fa0" : "#aa97ca"} strokeWidth={1.06} />
      <circle cx={11.2} cy={10.8} r={1.6} fill={active ? "#fae9f3" : "#eee9f7"} />
    </svg>
  );
}

function LocationIcon({ color }) {
  return (
    <svg width={17} height={17} fill="none" viewBox="0 0 18 18" className="inline" style={{ marginRight: 1, marginBottom:-2}}>
      <path
        d="M9 2.6c2.76 0 5 2.09 5 4.86 0 1.42-.71 3.02-2.21 5.05a25.6 25.6 0 01-2.53 2.95c-.27.26-.69.26-.96 0a25.6 25.6 0 01-2.53-2.95C4.7 10.48 4 8.88 4 7.46c0-2.77 2.24-4.86 5-4.86zm0 2.28c-1.39 0-2.52 1.06-2.52 2.38a2.51 2.51 0 005.02 0c0-1.32-1.13-2.38-2.5-2.38z"
        fill={color || "#8D7CC9"}
      />
    </svg>
  );
}

// --- UTILS ---

function formatStat(n) {
  if (n > 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n > 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return n;
}

// PUBLIC_INTERFACE
export default ProfilePage;
