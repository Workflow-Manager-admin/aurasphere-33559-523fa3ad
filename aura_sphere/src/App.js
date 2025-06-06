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

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="main-layout" style={{ display: 'flex', flex: 1, paddingTop: 64 }}>
          {/* Sidebar visible on desktop only */}
          <Sidebar />
          <main className="main-content" style={{
            flex: 1,
            marginLeft: 200,
            minHeight: 'calc(100vh - 64px)',
            padding: '32px 12px 12px 12px',
            transition: 'margin-left 0.2s'
          }}>
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/stories" element={<StoriesPage />} />
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