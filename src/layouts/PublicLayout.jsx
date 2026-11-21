import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PublicLayout({ children }) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="public-shell">
      <header className="public-header">
        <div className="public-header-inner">
          <Link to="/" className="brand-logo">
            <span className="brand-mark">P</span>
            <span>Prashnify</span>
          </Link>

          <nav className="public-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/help">Help &amp; FAQ</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="flex gap-sm" style={{ alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={toggleTheme}
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="btn btn-outline btn-sm">Log in</Link>
            <Link to="/dashboard" className="btn btn-primary btn-sm">Student App</Link>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {children || <Outlet />}
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-elevated)', padding: '44px 0 28px', marginTop: 48 }}>
        <div className="container">
          <div className="grid grid-4 mb-lg">
            <div>
              <div className="brand-logo mb-sm">
                <span className="brand-mark">P</span>
                <span>Prashnify</span>
              </div>
              <p className="text-sm text-secondary">
                Focused exam preparation, All-India Test Series, and verified topper mentorship for Life Sciences &amp; Biotech aspirants.
              </p>
            </div>

            <div>
              <h4 className="mb-sm" style={{ fontSize: 14 }}>Platform</h4>
              <div className="flex" style={{ flexDirection: 'column', gap: 8 }}>
                <Link to="/dashboard" className="text-sm text-secondary">Student Dashboard</Link>
                <Link to="/test-series" className="text-sm text-secondary">All-India Test Series</Link>
                <Link to="/practice-sets" className="text-sm text-secondary">Topic Practice Sets</Link>
                <Link to="/mentorship" className="text-sm text-secondary">1-on-1 &amp; Group Mentorship</Link>
              </div>
            </div>

            <div>
              <h4 className="mb-sm" style={{ fontSize: 14 }}>Portals</h4>
              <div className="flex" style={{ flexDirection: 'column', gap: 8 }}>
                <Link to="/mentor/dashboard" className="text-sm text-secondary">Mentor Dashboard</Link>
                <Link to="/admin/dashboard" className="text-sm text-secondary">Admin Panel</Link>
                <Link to="/campus-ambassador" className="text-sm text-secondary">Campus Ambassador</Link>
                <Link to="/states" className="text-sm text-secondary">UI States Reference</Link>
              </div>
            </div>

            <div>
              <h4 className="mb-sm" style={{ fontSize: 14 }}>Support &amp; Legal</h4>
              <div className="flex" style={{ flexDirection: 'column', gap: 8 }}>
                <Link to="/help" className="text-sm text-secondary">Help &amp; FAQ</Link>
                <Link to="/contact" className="text-sm text-secondary">Contact Us</Link>
                <Link to="/legal" className="text-sm text-secondary">Privacy, Terms &amp; Refund Policy</Link>
                <Link to="/pricing" className="text-sm text-secondary">Pricing Plans</Link>
              </div>
            </div>
          </div>

          <div className="flex-between flex-wrap" style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
            <span className="text-xs text-muted">© 2026 Prashnify EdTech. Frontend simulation — no real payment processing.</span>
            <div className="flex gap-md text-xs text-muted">
              <Link to="/legal?tab=privacy">Privacy</Link>
              <Link to="/legal?tab=terms">Terms</Link>
              <Link to="/legal?tab=refund">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
