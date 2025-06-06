import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SIDEBAR_LINKS = [
  { to: '/feed', label: 'Home', emoji: '🏠' },
  { to: '/explore', label: 'Explore', emoji: '🔍' },
  // Stories REMOVED as navigation option
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
      {/* Brand at top - MY AURAGRAM */}
      <div className="sidebar-brand" tabIndex={0}>
        MY AURAGRAM
      </div>
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
        .sidebar-brand {
          font-family: 'Times New Roman', Times, serif;
          font-size: 2.12rem;
          font-weight: 900;
          color: #fff; /* base white */
          letter-spacing: 2px;
          margin-left: 18px;
          margin-bottom: 24px;
          cursor: pointer;
          border-radius: 12px;
          line-height: 1.2;
          padding: 4px 20px 4px 0;
          transition: color 0.18s, background 0.18s, filter 0.19s;
          box-sizing: border-box;
          background: none;
          outline: none;
          text-shadow:
            0 2px 8px #cdaaff31,
            0 1.5px 1.5px #29004814;
          /* Subtle glowing effect */
        }
        .sidebar-brand:focus,
        .sidebar-brand:hover {
          color: #e087fb;
          background: rgba(51,19,90,0.09);
          filter: drop-shadow(0 0 15px #db9ffd78);
          outline: none;
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
