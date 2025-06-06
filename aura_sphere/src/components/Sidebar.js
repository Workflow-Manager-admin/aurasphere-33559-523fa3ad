import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Only the Settings icon and label will be shown at the bottom left in dark mode:
// Other elements (MY AURAGRAM at top, AI Studio, etc.) are removed.

/** Minimal "cog" for gear/settings icon */
function SettingsIcon({ size = 22, color = "#87a1f6" }) {
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

// PUBLIC_INTERFACE
/**
 * Sidebar: only renders the Settings option at the bottom left, styled for dark mode.
 */
function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'flex-end',
      }}
    >
      {/* Only bottom Settings option */}
      <div
        style={{
          paddingLeft: 8,
          paddingRight: 16,
          marginBottom: 16,
          marginLeft: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Link
          to="/settings"
          className={location.pathname === '/settings' ? 'sidebar-link sidebar-active' : 'sidebar-link'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 13,
            color: 'var(--text-color)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1.09rem',
            borderRadius: 8,
            padding: '13px 11px 13px 5px',
            marginBottom: 0,
            marginTop: 0,
            boxShadow: '0px 0.5px 7px #28284a2a',
            background:
              location.pathname === '/settings'
                ? 'linear-gradient(90deg, #bacfff 0%, #f4e9ff 100%)'
                : 'rgba(0,0,0,0.11)',
            color:
              location.pathname === '/settings'
                ? '#202f54'
                : 'var(--text-color)',
            fontWeight: location.pathname === '/settings' ? 700 : 500,
            transition: 'background 0.19s cubic-bezier(.44,0,.52,1), color 0.19s cubic-bezier(.44,0,.52,1)',
            outline: 'none',
            border: 'none',
          }}
          tabIndex={0}
          aria-label="Settings"
        >
          <SettingsIcon size={20} color={location.pathname === '/settings' ? "#87a1f6" : "#bacfff"} />
          <span style={{
            fontWeight: 600,
            letterSpacing: '0.02em',
            fontFamily: "'Times New Roman', Times, serif"
          }}>
            Settings
          </span>
        </Link>
      </div>
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
          z-index: 50;
          box-sizing: border-box;
        }
        .sidebar-link {
          background: rgba(0,0,0,0.11);
          color: var(--text-color);
          border-radius: 8px;
          transition: background 0.18s, color 0.18s;
        }
        .sidebar-link:hover, .sidebar-link:focus {
          background: linear-gradient(90deg, #bacfff 0%, #f4e9ff 100%);
          color: #202f54;
          font-weight: 700;
          outline: none;
        }
        .sidebar-active {
          background: linear-gradient(90deg, #bacfff 0%, #f4e9ff 100%) !important;
          color: #202f54 !important;
          font-weight: 700 !important;
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
