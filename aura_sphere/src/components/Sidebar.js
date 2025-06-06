import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SIDEBAR_LINKS = [
  { to: '/feed', label: 'Home', emoji: '🏠' },
  { to: '/explore', label: 'Explore', emoji: '🔍' },
  // { to: '/stories', label: 'Stories', emoji: '📚' }, // Removed Stories as navigation option
  { to: '/media-upload', label: 'Upload', emoji: '⬆️' },
  { to: '/profile', label: 'Profile', emoji: '👤' },
  { to: '/admin', label: 'Admin', emoji: '🛠️' }
];

/**
 * PUBLIC_INTERFACE
 * Fixed sidebar for widescreen, hidden on mobile.
 */
function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-links">
        {SIDEBAR_LINKS.map(({ to, label, emoji }) => (
          <Link
            key={to}
            to={to}
            className={location.pathname === to ? 'sidebar-link sidebar-active' : 'sidebar-link'}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              color: 'var(--text-color)', textDecoration: 'none',
              fontWeight: 500, fontSize: '1.1rem',
              borderRadius: 6, padding: '12px',
              transition: 'background 0.2s'
            }}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
      {/* Responsive styles */}
      <style>{`
        .sidebar {
          width: 200px;
          min-width: 180px;
          background: var(--base-dark);
          border-right: 1px solid var(--border-color);
          height: 100vh;
          position: fixed;
          top: 64px;
          left: 0;
          padding-top: 32px;
          z-index: 50;
          display: flex;
          flex-direction: column;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sidebar-link:hover, .sidebar-active {
          background: rgba(0,0,0,0.10);
          color: #000;
        }

        @media (max-width: 900px) {
          .sidebar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;
