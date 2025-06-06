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

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol">*</span> KAVIA AI
              </div>
              <button className="btn">Template Button</button>
            </div>
          </div>
        </nav>

        <main>
          <div className="container">
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
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;