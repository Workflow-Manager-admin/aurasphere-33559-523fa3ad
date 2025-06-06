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
import { AuthPage } from './features/Auth';
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
 * Standalone auth card for use in SplashScreen (minus full-page brand).
 */
function AuthCardOnly() {
  // The AuthPage supports an `onlyCard` prop for this minimal display.
  return <AuthPage onlyCard />;
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
        {/* After splash anim, the auth card appears, controlled inside SplashScreen */}
        {!isAuthenticated ? (
          <div style={{ zIndex: 200 }}>
            <AuthCardOnly />
          </div>
        ) : null}
        {/* SplashScreen will hide itself and brand when splashDone is set */}
        <SplashScreenDoneSetter setDone={setSplashDone} />
      </SplashScreen>
    );
  }

  // Still not logged in: Show persistent brand at top left and auth UI at center.
  if (!isAuthenticated) {
    return (
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrandTopLeft />
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #1a1424 70%, #232235 100%)",
          minHeight: 'calc(100vh - 56px)'
        }}>
          <AuthCardOnly />
        </div>
      </div>
    );
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