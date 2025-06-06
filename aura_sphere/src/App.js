import React from 'react';
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

// Navbar is no longer imported as per requirements.

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
    <BrowserRouter>
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Branding - 'MY AURAGRAM' at top left, always visible */}
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
        {/* No Navbar rendered; top navigation bar fully removed */}
        <div className="main-layout" style={{ display: 'flex', flex: 1, paddingTop: 56 }}>
          {/* Sidebar visible on desktop only */}
          <Sidebar />
          <main className="main-content" style={{
            flex: 1,
            marginLeft: 200,
            minHeight: 'calc(100vh - 56px)',
            padding: '32px 12px 12px 12px',
            transition: 'margin-left 0.2s'
          }}>
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* <Route path="/stories" element={<StoriesPage />} /> */}
              <Route path="/messaging" element={<MessagingPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/media-upload" element={<MediaUploadPage />} />
              {/* Optionally, add a catch-all NotFound route here */}
            </Routes>
          </main>
        </div>
        {/* Responsive adjustment: hide sidebar and use full width on mobile */}
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
    </BrowserRouter>
  );
}

export default App;