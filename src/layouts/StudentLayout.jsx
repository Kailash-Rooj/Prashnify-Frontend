import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Bookmark,
  BookOpen,
  Compass,
  CreditCard,
  FileCheck2,
  FilePlus2,
  History,
  Home,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Target,
  Trophy,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';

const STUDENT_SECTIONS = [
  {
    label: 'Main',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: Home },
      { to: '/create-test', label: 'Create Test', icon: FilePlus2 },
      { to: '/test-series', label: 'Test Series', icon: FileCheck2 },
      { to: '/pyqs', label: 'PYQs', icon: BookOpen }
    ]
  },
  {
    label: 'Progress',
    items: [
      { to: '/performance', label: 'Performance', icon: BarChart3 },
      { to: '/weak-topics', label: 'Weak Topics', icon: Target },
      { to: '/test-history', label: 'Test History', icon: History },
      { to: '/saved-questions', label: 'Saved Questions', icon: Bookmark },
      { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
      { to: '/leaderboard', label: 'Leaderboard', icon: Trophy }
    ]
  },
  {
    label: 'Account',
    items: [
      { to: '/choose-exam', label: 'Switch Exam', icon: Compass },
      { to: '/pricing', label: 'Plans & Pricing', icon: CreditCard }
    ]
  }
];

export default function StudentLayout({ children }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const renderSidebarNav = (onLinkClick) => (
    <div className="sidebar-sections">
      {STUDENT_SECTIONS.map((section) => (
        <div key={section.label}>
          <div className="sidebar-section-label">{section.label}</div>
          <div className="sidebar-nav-list">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onLinkClick}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <Link to="/dashboard" className="brand-logo">
            <span className="brand-mark">P</span>
            <span>Prashnify</span>
          </Link>
          <span className="badge badge-primary">{user.exam}</span>
        </div>
        {renderSidebarNav()}
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="flex gap-sm" style={{ alignItems: 'center' }}>
            <span className="badge badge-neutral">Exam: {user.exam}</span>
            <span className="badge badge-success">{user.plan}</span>
          </div>

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

            <div className="flex gap-sm" style={{ alignItems: 'center' }}>
              <div className="avatar">
                {user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-muted">{user.streak}-day streak</div>
              </div>
            </div>
          </div>
        </header>

        <main className="app-content">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link to="/dashboard" className={`mobile-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <Home size={19} />
          <span>Home</span>
        </Link>
        <Link to="/create-test" className={`mobile-nav-item ${location.pathname === '/create-test' ? 'active' : ''}`}>
          <FilePlus2 size={19} />
          <span>Create</span>
        </Link>
        <Link to="/pyqs" className={`mobile-nav-item ${location.pathname === '/pyqs' ? 'active' : ''}`}>
          <BookOpen size={19} />
          <span>PYQs</span>
        </Link>
        <Link to="/test-series" className={`mobile-nav-item ${location.pathname === '/test-series' ? 'active' : ''}`}>
          <FileCheck2 size={19} />
          <span>Series</span>
        </Link>
        <button type="button" className="mobile-nav-item" onClick={() => setDrawerOpen(true)}>
          <Menu size={19} />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Full Menu Drawer */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div className="drawer-panel" style={{ maxWidth: 320, padding: 0 }} onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <span className="brand-logo">
                <span className="brand-mark">P</span>
                <span>Prashnify Menu</span>
              </span>
              <button type="button" className="btn btn-ghost btn-icon" onClick={() => setDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>
            {renderSidebarNav(() => setDrawerOpen(false))}
          </div>
        </div>
      )}
    </div>
  );
}
