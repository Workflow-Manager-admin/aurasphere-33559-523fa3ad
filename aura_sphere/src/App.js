import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';

// Guard for protected routes (require authentication)
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

/**
 * AppRoutes for post-auth (main app routes, excludes root/splash+auth)
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/messaging" element={<MessagingPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/media-upload" element={<MediaUploadPage />} />
      {/* Optionally, add a catch-all NotFound route here */}
    </Routes>
  );
}

/**
 * AuthFormContainer: wraps AuthPage so only the inner form (not dual brand) is shown in SplashScreen
 */
function AuthFormContainer() {
  return <AuthPage onlyCard />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [splashComplete, setSplashComplete] = useState(false);

  // After splash animation and (if needed) authentication, let user into main app
  if (!splashComplete || !isAuthenticated) {
    // Render the SplashScreen at root, dock brand after blooming, show auth card after slide
    return (
      <SplashScreen
        duration={2600}
        // When auth is complete, trigger transition to app (handled below)
      >
        {/* Only reveal auth card if not authed (we check again after splash anim) */}
        {!isAuthenticated && <AuthFormContainer />}
        {/* If authed, SplashScreen will disappear once splashComplete is set below */}
      </SplashScreen>
    );
  }

  // --- Main App Layout ---
  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* --- The fixed animated brand at top left --- */}
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
      {/* Sidebar + routed content */}
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

function App() {
  // Enforce dark mode on mount
  React.useEffect(() => {
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
    if (typeof localStorage !== "undefined") {
      localStorage.setItem('aura_theme', 'dark');
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Always mount AppContent at '/' (root) */}
        <Routes>
          <Route
            path="/*"
            element={<AppContent />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;