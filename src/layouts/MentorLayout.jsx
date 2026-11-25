import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  Users,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';

export default function MentorLayout({ children }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { mentorRequests } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const waitingCount = mentorRequests.filter((r) => r.status === 'Waiting').length;

  const renderLinks = (onClick) => (
    <div className="sidebar-sections">
      <div>
        <div className="sidebar-section-label">Mentor Workspace</div>
        <div className="sidebar-nav-list">
          <NavLink to="/mentor/dashboard" end onClick={onClick} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={17} />
            <span>Overview &amp; Requests</span>
            {waitingCount > 0 && <span className="sidebar-badge">{waitingCount}</span>}
          </NavLink>
          <a href="#mentor-requests" onClick={onClick} className="sidebar-link">
            <CheckCircle2 size={17} />
            <span>1-on-1 Queue (₹299/hr)</span>
          </a>
          <a href="#mentor-availability" onClick={onClick} className="sidebar-link">
            <CalendarClock size={17} />
            <span>Weekly Availability</span>
          </a>
          <a href="#mentor-groups" onClick={onClick} className="sidebar-link">
            <Users size={17} />
            <span>Group Batches (5-min)</span>
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <div className="sidebar-section-label">Switch Portal</div>
        <div className="sidebar-nav-list">
          <Link to="/dashboard" className="sidebar-link" onClick={onClick}>
            <ArrowLeft size={17} />
            <span>Student App</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <Link to="/mentor/dashboard" className="brand-logo">
            <span className="brand-mark"><GraduationCap size={17} /></span>
            <span>Mentor Portal</span>
          </Link>
        </div>
        {renderLinks()}
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="flex gap-sm" style={{ alignItems: 'center' }}>
            <button type="button" className="btn btn-ghost btn-icon" onClick={() => setDrawerOpen(true)} aria-label="Menu">
              <Menu size={18} />
            </button>
            <span className="badge badge-success">Verified Mentor · Dr. Ananya Deshmukh</span>
          </div>

          <div className="flex gap-sm" style={{ alignItems: 'center' }}>
            <button type="button" className="btn btn-ghost btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/mentorship" className="btn btn-secondary btn-sm">Student Mentorship View</Link>
          </div>
        </header>

        <main className="app-content">
          {children || <Outlet />}
        </main>
      </div>

      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div className="drawer-panel" style={{ maxWidth: 320, padding: 0 }} onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <span className="brand-logo">
                <span className="brand-mark"><GraduationCap size={16} /></span>
                <span>Mentor Menu</span>
              </span>
              <button type="button" className="btn btn-ghost btn-icon" onClick={() => setDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>
            {renderLinks(() => setDrawerOpen(false))}
          </div>
        </div>
      )}
    </div>
  );
}
