import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Main nav links
const SIDEBAR_LINKS = [
  { to: '/feed', label: 'Home', emoji: '🏠' },
  { to: '/explore', label: 'Explore', emoji: '🔍' },
  // Stories REMOVED as navigation option
  { to: '/media-upload', label: 'Upload', emoji: '⬆️' },
  { to: '/profile', label: 'Profile', emoji: '👤' },
  { to: '/admin', label: 'Admin', emoji: '🛠️' }
];

// AI Studio and Settings - dummy routes for now; icons as SVG
function AIStudioIcon({ size = 22, color = "#7be0dc" }) {
  // "Robot" chip/AI icon – easy recognizable
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="3.5" y="7.2" width="15" height="9.1" rx="4.1" fill="#1ed2e0" opacity="0.12"/>
      <rect x="5.9" y="8.8" width="10.1" height="6" rx="3" fill={color} opacity="0.19"/>
      <rect x="7.5" y="10" width="7.3" height="4.2" rx="2.1" fill="#262d3b" stroke={color} strokeWidth="1.1"/>
      <circle cx="9.7" cy="12.1" r="0.7" fill="#fff"/>
      <circle cx="12.8" cy="12.1" r="0.7" fill="#fff"/>
      <rect x="10.7" y="13.7" width="1.1" height="0.5" rx="0.25" fill="#fff" opacity="0.7"/>
      <rect x="0.7" y="12.1" width="2" height="0.8" rx="0.35" fill={color} />
      <rect x="18.7" y="12.1" width="2" height="0.8" rx="0.35" fill={color} />
      <rect x="10" y="3.6" width="2" height="2" rx="0.9" fill={color} />
    </svg>
  );
}
function SettingsIcon({ size = 22, color = "#87a1f6" }) {
  // Minimal "cog" for gear/settings
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="3.4" fill={color} opacity="0.18"/>
      <circle cx="11" cy="11" r="2.0" fill="none" stroke={color} strokeWidth="1.6"/>
      <g stroke={color} strokeWidth="1.2">
        <path d="M11 6V3.6" />
        <path d="M11 18.4V16" />
        <path d="M6 11H3.6" />
        <path d="M18.4 11H16" />
        <path d="M15.3 7.1l1.7-1.7" />
        <path d="M7.1 15.3l-1.7 1.7" />
        <path d="M15.3 14.9l1.7 1.7" />
        <path d="M7.1 6.7l-1.7-1.7" />
      </g>
    </svg>
  );
}

/**
 * PUBLIC_INTERFACE
 * Fixed sidebar for widescreen, hidden on mobile.
 * Now adds Settings at very bottom, AI Studio above Settings with visual separation.
 */
function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar" style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      {/* Brand at top - MY AURAGRAM */}
      <div
        className="sidebar-brand"
        tabIndex={0}
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "2.5px",
          marginLeft: 14,
          marginBottom: 28,
          cursor: "pointer",
          borderRadius: 16,
          lineHeight: "1.09",
          padding: "5px 32px 7px 0",
          transition: "color 0.23s cubic-bezier(.53,0,.53,1), background 0.18s cubic-bezier(.49,.03,.61,1), filter 0.20s",
          background: "none",
          outline: "none",
          textShadow: "0 4px 18px #c580ff29, 0 2.5px 2.5px #39005818"
        }}
        onMouseOver={e => {
          e.currentTarget.style.color = "#e087fb";
          e.currentTarget.style.background = "rgba(51,19,90,0.13)";
          e.currentTarget.style.filter = "drop-shadow(0 0 25px #db9ffd8A)";
        }}
        onFocus={e => {
          e.currentTarget.style.color = "#e087fb";
          e.currentTarget.style.background = "rgba(51,19,90,0.13)";
          e.currentTarget.style.filter = "drop-shadow(0 0 25px #db9ffd8A)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.background = "none";
          e.currentTarget.style.filter = "";
        }}
        onBlur={e => {
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.background = "none";
          e.currentTarget.style.filter = "";
        }}
        aria-label="MY AURAGRAM app branding"
      >
        MY AURAGRAM
      </div>
      <div className="sidebar-links" style={{flex: 1, display: "flex", flexDirection: "column", gap: 8}}>
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
      {/* Bottom actions: AI Studio and Settings - with visual separation */}
      <div style={{
        marginTop: 22,
        marginBottom: 12,
        paddingLeft: 4,
        paddingRight: 8,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "stretch"
      }}>
        <div style={{ borderTop: "1.2px solid var(--border-color)", margin: "8px 0 6px 1px" }} />
        <Link
          to="/ai-studio"
          className={location.pathname === '/ai-studio' ? 'sidebar-link sidebar-active' : 'sidebar-link'}
          style={{
            display: 'flex', alignItems: 'center', gap: 13,
            color: 'var(--text-color)', textDecoration: 'none',
            fontWeight: 500, fontSize: '1.08rem',
            borderRadius: 7, padding: '10px 8px 10px 3px',
            marginBottom: 2,
            transition: 'background 0.2s'
          }}
          tabIndex={0}
          aria-label="AI Studio"
        >
          <AIStudioIcon size={21} />
          <span>AI Studio</span>
        </Link>
        <Link
          to="/settings"
          className={location.pathname === '/settings' ? 'sidebar-link sidebar-active' : 'sidebar-link'}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            color: 'var(--text-color)', textDecoration: 'none',
            fontWeight: 500, fontSize: '1.07rem',
            borderRadius: 7, padding: '10px 8px 10px 3px',
            marginBottom: 1,
            marginTop: 2,
            transition: 'background 0.2s'
          }}
          tabIndex={0}
          aria-label="Settings"
        >
          <SettingsIcon size={20} />
          <span>Settings</span>
        </Link>
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
          font-size: 2.5rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 2.5px;
          margin-left: 14px;
          margin-bottom: 28px;
          cursor: pointer;
          border-radius: 16px;
          line-height: 1.09;
          padding: 5px 32px 7px 0;
          transition: color 0.23s cubic-bezier(.53,0,.53,1), background 0.18s cubic-bezier(.49,.03,.61,1), filter 0.20s;
          box-sizing: border-box;
          background: none;
          outline: none;
          text-shadow:
            0 4px 18px #c580ff29,
            0 2.5px 2.5px #39005818;
        }
        .sidebar-brand:focus,
        .sidebar-brand:hover {
          color: #e087fb;
          background: rgba(51,19,90,0.13);
          filter: drop-shadow(0 0 25px #db9ffd8A);
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
        /* AI Studio and Settings - highlight on hover */
        .sidebar-link[aria-label="AI Studio"]:hover,
        .sidebar-link[aria-label="AI Studio"].sidebar-active {
          background: linear-gradient(90deg, #15ecf9 1%, #eec3ff 99%);
          color: #0f1c2d;
          font-weight: 600;
        }
        .sidebar-link[aria-label="Settings"]:hover,
        .sidebar-link[aria-label="Settings"].sidebar-active {
          background: linear-gradient(90deg, #bacfff 0%, #f4e9ff 100%);
          color: #202f54;
          font-weight: 600;
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
