import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Award,
  BarChart3,
  Bell,
  Bookmark,
  BookOpen,
  Compass,
  FileCheck2,
  FilePlus2,
  Gift,
  GraduationCap,
  HelpCircle,
  History,
  Home,
  Layers,
  Menu,
  Moon,
  Newspaper,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Target,
  Trophy,
  User,
  Users,
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
      { to: '/pyqs', label: 'PYQs', icon: BookOpen },
      { to: '/mentorship', label: 'Mentorship', icon: Users }
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
    label: 'Community',
    items: [
    ]
  },
  {
    label: 'Join Prashnify',
    items: [
    ]
  },
  {
    label: 'Account',
    items: [
      { to: '/choose-exam', label: 'Switch Exam', icon: Compass }
    ]
  }
];

export default function StudentLayout({ children }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user, notifications } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.read).length;

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
                  {item.to === '/notifications' && unreadCount > 0 && (
                    <span className="sidebar-badge">{unreadCount}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <div className="sidebar-section-label">Switch Portal</div>
        <div className="sidebar-nav-list">
          <Link to="/mentor/dashboard" className="sidebar-link" onClick={onLinkClick}>
            <GraduationCap size={17} />
            <span>Mentor Dashboard</span>
          </Link>
        </div>
      </div>
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

            <Link to="/dashboard" className="btn btn-ghost btn-icon" style={{ position: 'relative' }} aria-label="Notifications">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--danger)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link to="/dashboard" className="flex gap-sm" style={{ alignItems: 'center' }}>
              <div className="avatar">
                {user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-xs text-muted">{user.streak}-day streak</div>
              </div>
            </Link>
          </div>
        </header>

        <main className="app-content">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Bottom Navigation: Home, Create, PYQs, Mentors, Menu */}
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
        <Link to="/mentorship" className={`mobile-nav-item ${location.pathname.startsWith('/mentor') && !location.pathname.startsWith('/mentor/dashboard') ? 'active' : ''}`}>
          <Users size={19} />
          <span>Mentors</span>
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
