import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import { FeedPage } from './features/Feed';
import { ExplorePage } from './features/Explore';
import { ProfilePage } from './features/Profile';
import { StoriesPage } from './features/Stories';
import { MessagingPage } from './features/Messaging';
import { AdminPage } from './features/Admin';
import { NotificationsPage } from './features/Notifications';

import { MediaUploadPage } from './features/MediaUpload';

import Sidebar from './components/Sidebar';

import { AuthProvider, useAuth } from './features/Auth/AuthContext';
import SplashScreen from './components/SplashScreen';

/**
 * AppRoutes for the main app UI after authentication.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/stories" element={<StoriesPage />} />
      <Route path="/messaging" element={<MessagingPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/media-upload" element={<MediaUploadPage />} />
      {/* Optionally, add a catch-all NotFound route */}
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  );
}

/**
 * AuthCard: The login/signup UI in a modal/panel style for SplashScreen, using Tailwind.
 * Note: Now decoupled from "full auth page"; this is just the core form (with a brand row).
 */
import { useState } from "react";
import { useAuth } from "./features/Auth/AuthContext";

// PUBLIC_INTERFACE
function AuthCard() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    if (!email || !password) {
      setErr("Please enter both email and password.");
      setLoading(false);
      return;
    }
    const fn = mode === "login" ? login : signup;
    const res = await fn(email.trim(), password);
    setLoading(false);
    if (res && res.ok) {
      // AuthRedirect handled in parent as app state.
    } else {
      setErr((res && res.error) || "Unknown error, please try again.");
    }
  };

  return (
    <div
      className="rounded-2xl shadow-2xl max-w-[380px] sm:max-w-md w-[96vw] py-8 px-6 bg-gradient-to-br from-neutral-900/90 via-indigo-900/80 to-black/80
      border border-violet-900/40 fadein-auth shadow-fuchsia-900/30 transition-all duration-700"
      style={{ animation: "fadeInAuthPanel 0.68s" }}
      tabIndex={-1}
    >
      {/* Brand */}
      <div className="flex flex-row items-center gap-2 mb-3">
        <span className="text-[1.7rem] font-black tracking-widest text-pink-300 drop-shadow select-none" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          AURAGRAM
        </span>
      </div>
      <div className="text-zinc-200 text-[1.03rem] mb-6 leading-tight text-center" style={{ opacity: 0.82 }}>
        Welcome to your digital aura space.<br />
        <span className="font-bold text-fuchsia-200">
          {mode === "login" ? "Sign in" : "Sign up"} to join the flow.
        </span>
      </div>
      {/* Toggle bar */}
      <div className="flex mb-6 border bg-gradient-to-r from-zinc-800/30 to-violet-900/10 rounded-lg overflow-hidden">
        <button
          onClick={() => { setMode("login"); setErr(""); }}
          type="button"
          className={`flex-1 py-2 font-bold text-base transition-all
          ${mode === "login" ? "bg-gradient-to-r from-violet-900/70 to-pink-900/70 text-white shadow" : "text-fuchsia-200 bg-transparent"}
          `}
          aria-pressed={mode === "login"}
        >Sign In</button>
        <button
          onClick={() => { setMode("signup"); setErr(""); }}
          type="button"
          className={`flex-1 py-2 font-bold text-base transition-all
          ${mode === "signup" ? "bg-gradient-to-r from-fuchsia-800/80 to-indigo-900/80 text-white shadow" : "text-violet-200 bg-transparent"}
          `}
          aria-pressed={mode === "signup"}
        >Sign Up</button>
      </div>
      {/* Error */}
      {err && (
        <div className="mb-4 py-2 px-3 rounded bg-pink-950/70 text-pink-200 font-semibold text-[1.04rem] animate-shake">
          {err}
        </div>
      )}
      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="on" spellCheck={false}>
        <input
          className="bg-black/80 border border-violet-700 text-white rounded-lg px-4 py-3 text-[1.07rem] outline-none focus:border-pink-400 focus:shadow-md"
          type="email"
          placeholder="Email"
          value={email}
          disabled={loading}
          autoFocus
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="bg-black/70 border border-violet-800 text-white rounded-lg px-4 py-3 text-[1.11rem] outline-none focus:border-pink-400 focus:shadow-md"
          type="password"
          placeholder="Password"
          minLength={4}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          disabled={loading}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="rounded-lg bg-gradient-to-r from-fuchsia-700 to-purple-900 py-3 font-extrabold text-white text-lg mt-2 shadow transition-all active:scale-[.98] hover:brightness-110 focus:outline-none"
          type="submit"
          disabled={loading}
        >
          {loading
            ? (mode === "login" ? "Signing In..." : "Signing Up...")
            : (mode === "login" ? "Sign In" : "Create Account")}
        </button>
      </form>
      {/* Hint && toggle link */}
      <div className="mt-5 text-center text-zinc-300">
        {mode === "login" ? (
          <span>Don&apos;t have an account?
            <button className="underline text-fuchsia-400 ml-1 font-bold hover:text-fuchsia-200 bg-transparent border-0"
              type="button" onClick={() => { setMode("signup"); setErr(""); }}>
              Sign up
            </button>
          </span>
        ) : (
          <span>Already a member?
            <button className="underline text-pink-100 ml-1 font-bold hover:text-fuchsia-200 bg-transparent border-0"
              type="button" onClick={() => { setMode("login"); setErr(""); }}>
              Sign in
            </button>
          </span>
        )}
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeInAuthPanel { from { opacity:0; transform: scale(.97) translateY(18px);} to { opacity:1; transform:none; } }
        .fadein-auth { animation: fadeInAuthPanel 0.68s cubic-bezier(.34,0,.36,1); }
        @keyframes shake { 0%{transform:translateX(0);} 28%{transform:translateX(-7px);} 55%{transform:translateX(4px);} 75%{transform:translateX(-2px);} 100%{transform:translateX(0);} }
        .animate-shake { animation: shake 0.33s cubic-bezier(.60,0,.50,1); }
      `}</style>
    </div>
  );
}

/**
 * AppContent handles the splash->auth->main routing and persistent brand.
 */
function AppContent() {
  const { isAuthenticated } = useAuth();
  const [splashDone, setSplashDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If authenticated and on root ("/") route after splash, go to feed.
  useEffect(() => {
    if (splashDone && isAuthenticated && location.pathname === '/') {
      navigate('/feed', { replace: true });
    }
  }, [splashDone, isAuthenticated, navigate, location.pathname]);

  // Show splash until complete, then reveal auth if unauthenticated, else main app UI.
  if (!splashDone) {
    return (
      <SplashScreen duration={2500}>
        {/* After brand anim, show AuthCard with fade-in */}
        {!isAuthenticated &&
          <div className="transition-opacity duration-700 animate-fadein z-30">
            <AuthCard />
          </div>
        }
        <SplashScreenDoneSetter setDone={setSplashDone} />
      </SplashScreen>
    );
  }

  // Still not logged in: Show persistent brand at top left and auth UI at center.
  if (!isAuthenticated) {
    // Auth UI is only shown via SplashScreen, so after splashDone unauthenticated, show nothing (waiting for login)
    return null;
  }

  // --- Main App Layout: persistent "My AuraGram" brand top-left always visible ---
  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrandTopLeft />
      <div className="main-layout" style={{ display: 'flex', flex: 1, paddingTop: 56 }}>
        <Sidebar />
        <main className="main-content" style={{
          flex: 1,
          marginLeft: 200,
          minHeight: 'calc(100vh - 56px)',
          padding: '32px 12px 12px 12px',
          transition: 'margin-left 0.2s'
        }}>
          <AppRoutes />
        </main>
      </div>
      <style>{`
        .auragram-brand:focus, .auragram-brand:hover {
          color: #e087fb !important;
          background: rgba(51,19,90,0.13) !important;
        }
        @media (max-width: 900px) {
          .main-layout { flex-direction: column; }
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

/**
 * BrandTopLeft renders the persistent top-left "My AuraGram" brand bar.
 */
function BrandTopLeft() {
  return (
    <div
      style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        background: 'var(--base-dark)',
        borderBottom: '1px solid var(--border-color)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
      }}
    >
      <span
        className="auragram-brand"
        style={{
          fontWeight: 900,
          fontSize: '2.0rem',
          letterSpacing: '2.5px',
          color: '#fff',
          marginLeft: 32,
          cursor: 'pointer',
          transition: 'color 0.18s, background 0.18s',
          padding: '2px 18px 2px 0',
          borderRadius: 8
        }}
        tabIndex={0}
        onMouseOver={e => { e.currentTarget.style.color = '#e087fb'; e.currentTarget.style.background = 'rgba(51,19,90,0.13)'; }}
        onFocus={e => { e.currentTarget.style.color = '#e087fb'; e.currentTarget.style.background = 'rgba(51,19,90,0.13)'; }}
        onMouseOut={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'transparent'; }}
        onBlur={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'transparent'; }}
      >
        MY AURAGRAM
      </span>
    </div>
  );
}

/**
 * SplashScreenDoneSetter: invisible helper component to set splashDone after effect.
 * This ensures only one completion event is dispatched regardless of children.
 */
function SplashScreenDoneSetter({ setDone }) {
  useEffect(() => {
    // SplashScreen anim is approximately 2.5+1 seconds for full settle.
    const t = setTimeout(() => setDone(true), 2550 + 940);
    return () => clearTimeout(t);
  }, [setDone]);
  return null;
}

function App() {
  // Enforce dark mode on mount
  useEffect(() => {
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
    if (typeof localStorage !== "undefined") {
      localStorage.setItem('aura_theme', 'dark');
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Mount AppContent at root */}
        <Routes>
          <Route path="*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;