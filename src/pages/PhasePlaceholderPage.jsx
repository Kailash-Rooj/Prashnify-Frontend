import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PhasePlaceholderPage({ title = 'Student Dashboard', phase = 'Phase 2+' }) {
  const { user } = useApp();
  const location = useLocation();

  return (
    <div className="card" style={{ maxWidth: 680 }}>
      <div className="flex gap-sm mb-md" style={{ alignItems: 'center' }}>
        <div className="stat-icon">
          <Layers size={18} />
        </div>
        <div>
          <span className="badge badge-primary">{phase} Placeholder</span>
          <h1 style={{ fontSize: 22, marginTop: 4 }}>{title}</h1>
        </div>
      </div>

      <p className="text-sm text-secondary mb-md">
        You are viewing the Step 0 shared shell (<strong>StudentLayout</strong>) — including the left sidebar menu,
        active link highlight, topbar, dark/light theme toggle, and mobile bottom navigation bar — at{' '}
        <code>{location.pathname}</code>.
      </p>

      <div className="card card-compact mb-lg" style={{ background: 'var(--surface-muted)' }}>
        <div className="flex-between text-sm mb-sm">
          <span className="text-muted">Active Exam</span>
          <span className="font-semibold">{user.exam}</span>
        </div>
        <div className="flex-between text-sm mb-sm">
          <span className="text-muted">Plan</span>
          <span className="font-semibold">{user.plan}</span>
        </div>
        <div className="flex-between text-sm">
          <span className="text-muted">Student</span>
          <span className="font-semibold">{user.name} ({user.email})</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-sm">
        <Link to="/" className="btn btn-primary btn-sm">
          <ArrowLeft size={15} /> Back to Landing Page
        </Link>
        <Link to="/choose-exam" className="btn btn-secondary btn-sm">
          Switch Exam
        </Link>
        <Link to="/pricing" className="btn btn-outline btn-sm">
          View Pricing
        </Link>
      </div>
    </div>
  );
}
