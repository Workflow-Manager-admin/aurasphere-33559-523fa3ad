import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/feed', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  // Stories REMOVED as navigation option
  { to: '/messaging', label: 'Messages' },
  { to: '/media-upload', label: 'Upload' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/profile', label: 'Profile' },
  { to: '/admin', label: 'Admin' },
];

/**
 * PUBLIC_INTERFACE
 * Responsive top navigation bar for desktop/mobile.
 */
function Navbar({ onMenuClick }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMobileNavOpen((open) => !open);
    if (onMenuClick) onMenuClick();
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div className="logo" style={{ fontWeight: 700, fontSize: '1.3rem', letterSpacing: '2px' }}>
          <span className="logo-symbol" role="img" aria-label="aura" style={{ color: 'var(--base-light)', marginRight: 7 }}>*</span> AuraSphere
        </div>
        {/* Desktop nav links */}
        <div className="nav-links desktop-nav" style={{ display: 'flex', gap: 24 }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to ? 'nav-link nav-active' : 'nav-link'}
              style={{ textDecoration: 'none', color: 'var(--text-color)' }}
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          className="mobile-nav-btn"
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          onClick={handleMenuToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            fontSize: '2rem',
            display: 'none',
            cursor: 'pointer'
          }}
        >
          {/* Hamburger/close icon */}
          <span>{mobileNavOpen ? '✖' : '☰'}</span>
        </button>
      </div>
      {/* Mobile drop-down links */}
      {mobileNavOpen && (
        <div className="mobile-nav-dropdown">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to ? 'nav-link nav-active' : 'nav-link'}
              style={{ display: 'block', padding: '14px 0', textDecoration: 'none', color: 'var(--text-color)' }}
              onClick={() => setMobileNavOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
      {/* Responsive styles */}
      <style>{`
        /* Desktop nav only visible >768px */
        .desktop-nav { display: flex; }
        .mobile-nav-btn { display: none; }
        .mobile-nav-dropdown { display: none; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: block !important; }
          .mobile-nav-dropdown {
            display: block;
            background: var(--base-dark);
            position: absolute;
            top: 64px;
            right: 0;
            width: 100%;
            z-index: 10;
            border-bottom: 1px solid var(--border-color);
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            animation: dropdown-in 0.25s;
          }
        }
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .nav-link {
          font-size: 1rem;
          opacity: 0.85;
          transition: opacity 0.2s, color 0.2s;
          padding: 4px 0;
        }
        .nav-link:hover, .nav-active {
          color: var(--base-light);
          opacity: 1;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
