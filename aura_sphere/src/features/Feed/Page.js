import React, { useState, useEffect, useCallback } from "react";
import "./HomePage.css";

// --- Helpers for demo/mock data: replace with real API fetches in production ---
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const users = [
  { id: "1", name: "Willow", avatar: "/assets/avatar1.png" },
  { id: "2", name: "Seren", avatar: "/assets/avatar2.png" },
  { id: "3", name: "Aiden", avatar: "/assets/avatar3.png" },
  { id: "4", name: "Sky", avatar: "/assets/avatar4.png" },
  { id: "5", name: "Noor", avatar: "/assets/avatar5.png" },
  { id: "6", name: "Kai", avatar: "/assets/avatar6.png" },
  { id: "7", name: "Rhea", avatar: "/assets/avatar7.png" },
];
const generatePosts = (count = 7) => {
  return Array.from({ length: count }, (_, i) => {
    const u = users[i % users.length];
    const hasVideo = Math.random() > 0.7;
    const ts = Date.now() - randomBetween(60_000, 86400000);
    return {
      id: `post-${i}`,
      user: u,
      media: hasVideo
        ? { type: "video", src: `https://www.w3schools.com/html/mov_bbb.mp4` }
        : { type: "image", src: `https://picsum.photos/seed/${i + randomBetween(1, 9999)}/500/600` },
      likes: randomBetween(10, 1400),
      commentsCount: randomBetween(0, 90),
      caption: [
        "Just vibing in my own aura ✨🌙",
        "Mood of the day: radiant!",
        "Sunsets and pastel dreams 💗💜",
        "Serendipity in every scroll.",
        "Let your energy speak louder than words.",
        "Finding beauty in the ordinary.",
        "Live in color.",
      ][(i + randomBetween(1, 99)) % 7],
      createdAt: ts,
      isLiked: Math.random() > 0.7,
    };
  });
};
const mockStories = users.map((u, i) => ({
  id: `story-${i}`,
  user: {
    ...u,
    avatar: `/assets/avatar${(i % 7) + 1}.png`
  },
  media: [
    { type: "image", src: `https://picsum.photos/seed/st${i * 2}/400/700`, time: 7 },
    { type: "image", src: `https://picsum.photos/seed/st${i * 2 + 1}/400/700`, time: 7 },
  ],
  viewed: i < 2,
}));

// --- PUBLIC_INTERFACE: HomePage component ---
/**
 * AuraSphere HomePage: responsive feed with top nav, stories, posts, explore sidebar, dark mode, animations
 */
function HomePage() {
  // Feed State and Infinite Scroll
  const [posts, setPosts] = useState(() => generatePosts(8));
  const [loading, setLoading] = useState(false);

  // For stories carousel/modal
  const [stories] = useState(mockStories);
  const [storyModal, setStoryModal] = useState({ open: false, storyIdx: 0 });

  // Theme
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("aura_theme") || (prefersDark ? "dark" : "light")
  );
  useEffect(() => {
    document.body.classList.toggle("theme-dark", darkMode === "dark");
    document.body.classList.toggle("theme-light", darkMode === "light");
    localStorage.setItem("aura_theme", darkMode);
  }, [darkMode]);

  // Infinite Scroll Load More
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 350 &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          setPosts((p) => [...p, ...generatePosts(6)]);
          setLoading(false);
        }, 900);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [loading]);

  // Action handlers
  const handleLike = useCallback((postId) => {
    setPosts((posts) =>
      posts.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }, []);

  return (
    <div className="aura-homepage">
      <div className="main-feed">
        <section>
          <StoriesCarousel
            stories={stories}
            onStoryClick={(idx) => setStoryModal({ open: true, storyIdx: idx })}
            darkMode={darkMode}
          />
        </section>
        <section>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              darkMode={darkMode}
            />
          ))}
          {loading && (
            <div className="feed-loader">
              <AuraSpinner />
            </div>
          )}
        </section>
      </div>
      <aside className="explore-recommendations">
        <ExploreRecommendations />
        <button
          aria-label="Toggle dark mode"
          className="darkmode-toggle aura-gradient-btn"
          onClick={() => setDarkMode((m) => (m === "dark" ? "light" : "dark"))}
        >
          {darkMode === "dark" ? "🌙 Dark Mode" : "🔆 Light Mode"}
        </button>
      </aside>
      {/* Full-Screen Story Modal */}
      {storyModal.open && (
        <StoryModal
          story={stories[storyModal.storyIdx]}
          onClose={() => setStoryModal({ ...storyModal, open: false })}
          onPrev={
            storyModal.storyIdx > 0
              ? () => setStoryModal({ open: true, storyIdx: storyModal.storyIdx - 1 })
              : undefined
          }
          onNext={
            storyModal.storyIdx < stories.length - 1
              ? () => setStoryModal({ open: true, storyIdx: storyModal.storyIdx + 1 })
              : undefined
          }
        />
      )}
    </div>
  );
}

// --- PUBLIC_INTERFACE: Stories Carousel ---
function StoriesCarousel({ stories, onStoryClick, darkMode }) {
  return (
    <div className="aura-stories-carousel">
      <div className="stories-list">
        {stories.map((story, idx) => (
          <button
            className={`story-ava-btn${story.viewed ? " viewed" : ""}`}
            key={story.id}
            aria-label={`View ${story.user.name}'s story`}
            onClick={() => onStoryClick(idx)}
          >
            <div className="story-ava-gradient">
              <img
                className="story-ava"
                src={story.user.avatar}
                alt={`${story.user.name}'s avatar`}
                draggable={false}
              />
            </div>
            <span className="story-user">{story.user.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- PUBLIC_INTERFACE: Story Modal ---
function StoryModal({ story, onClose, onPrev, onNext }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (!story?.media?.length) return;
    setPage(0);
  }, [story]);
  useEffect(() => {
    if (!story?.media?.length) return;
    const timer = setTimeout(() => {
      if (page < story.media.length - 1) setPage((p) => p + 1);
      else onNext?.();
    }, story.media[page]?.time * 1000 || 7000);
    return () => clearTimeout(timer);
  }, [page, story, onNext]);

  if (!story) return null;
  return (
    <div className="aura-modal-overlay" tabIndex={-1}>
      <div className="aura-modal-content">
        <button className="aura-modal-close" onClick={onClose} aria-label="Close story modal">
          ×
        </button>
        <div className="story-modal-header">
          <img src={story.user.avatar} alt="" className="story-modal-ava" />
          <span>{story.user.name}</span>
        </div>
        <div className="story-modal-media">
          {story.media[page].type === "image" ? (
            <img src={story.media[page].src} alt="" />
          ) : (
            <video src={story.media[page].src} autoPlay controls />
          )}
        </div>
        <div className="story-modal-progress">
          {story.media.map((_, i) => (
            <div
              key={i}
              className="story-progress-bar"
              style={{
                width: `${100 / story.media.length}%`,
                background:
                  i < page
                    ? "var(--aura-main-gradient)"
                    : "rgba(255,255,255,0.2)",
                opacity: i === page ? 1 : 0.75,
                transition: "all 0.3s",
              }}
            ></div>
          ))}
        </div>
        <div className="story-modal-nav">
          <button disabled={!onPrev} onClick={onPrev} aria-label="Previous story" className="aura-modal-navbtn">
            ‹
          </button>
          <button disabled={!onNext} onClick={onNext} aria-label="Next story" className="aura-modal-navbtn">
            ›
          </button>
        </div>
      </div>
      <div className="aura-modal-bg" onClick={onClose} tabIndex={-1}></div>
    </div>
  );
}

// --- PUBLIC_INTERFACE: Single Feed Post Card ---
function PostCard({ post, onLike, darkMode }) {
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 500);
    onLike();
  };

  return (
    <div className="aura-post-card">
      {/* Header */}
      <div className="post-header">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="post-ava"
        />
        <span className="post-user">{post.user.name}</span>
      </div>
      {/* Media */}
      <div className="post-media">
        {post.media.type === "image" ? (
          <img
            src={post.media.src}
            alt="Post"
            className="post-media-img"
          />
        ) : (
          <video
            src={post.media.src}
            controls
            className="post-media-video"
          />
        )}
      </div>
      {/* Actions */}
      <div className="post-actions">
        <button
          className={`post-action-btn${post.isLiked ? " liked" : ""} ${
            likeAnimating ? "anim-pop" : ""
          }`}
          onClick={handleLike}
          aria-label={post.isLiked ? "Unlike" : "Like"}
        >
          <span role="img" aria-label="like">❤️</span>
        </button>
        <button className="post-action-btn" aria-label="Comment">
          <span role="img" aria-label="comment">💬</span>
        </button>
        <button className="post-action-btn" aria-label="Share">
          <span role="img" aria-label="share">🔗</span>
        </button>
        <button className="post-action-btn" aria-label="Save" style={{ marginLeft: "auto" }}>
          <span role="img" aria-label="save">🔖</span>
        </button>
      </div>
      {/* Caption, likes, comments */}
      <div className="post-caption">
        <span className="post-likes">
          <b>{post.likes.toLocaleString()}</b> likes
        </span>
        <span className="post-caption-text">{post.caption}</span>
        <span className="post-comments-link">
          {post.commentsCount > 0
            ? `View all ${post.commentsCount} comments`
            : "No comments yet"}
        </span>
      </div>
    </div>
  );
}

// --- PUBLIC_INTERFACE: Explore/Recommended Section ---
function ExploreRecommendations() {
  // Mockup: Random user suggestions with avatars.
  const suggestions = users.slice(0, 3);
  const imgs = [
    "https://picsum.photos/seed/ex1/64/64",
    "https://picsum.photos/seed/ex2/64/64",
    "https://picsum.photos/seed/ex3/64/64",
  ];
  return (
    <div className="explore-rec-wrap">
      <h3>Explore</h3>
      <div className="rec-grid">
        {imgs.map((src, idx) => (
          <a key={src} href={`#`} className="rec-thumb-link">
            <img
              src={src}
              alt={`Explore ${idx}`}
              className="rec-thumb-img"
              draggable={false}
            />
          </a>
        ))}
      </div>
      <div className="rec-users">
        {suggestions.map((u, i) => (
          <div className="rec-user-row" key={u.id}>
            <img src={u.avatar} alt={u.name} className="rec-user-ava" />
            <span>{u.name}</span>
            <button className="rec-user-follow aura-gradient-btn">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- PUBLIC_INTERFACE: Spinner Loader (Aura style) ---
function AuraSpinner() {
  return (
    <div className="aura-spinner">
      <div />
      <div />
      <div />
    </div>
  );
}

export default HomePage;
