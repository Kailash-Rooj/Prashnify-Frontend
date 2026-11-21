import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Lock, Mail, Shield, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    setUser((prev) => ({
      ...prev,
      isAuthenticated: true,
      role: 'student',
      name: mode === 'signup' ? name.trim() : prev.name,
      email: email.trim()
    }));

    if (mode === 'signup') {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const quickEnterPortal = (role, targetPath) => {
    setUser((prev) => ({ ...prev, isAuthenticated: true, role }));
    navigate(targetPath);
  };

  return (
    <div className="container" style={{ maxWidth: 480, padding: '56px 20px' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <h1 style={{ fontSize: 24 }}>{mode === 'login' ? 'Welcome back to Prashnify' : 'Create your Prashnify account'}</h1>
          <p className="text-sm text-secondary mt-sm">
            {mode === 'login'
              ? 'Continue your streak, review mocks, and track weak topics.'
              : 'Takes 30 seconds. Next you will set your exam and daily study goal.'}
          </p>
        </div>

        <div className="tabs mb-lg" style={{ width: '100%', justifyContent: 'center' }}>
          <button type="button" className={`tab-btn ${mode === 'login' ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => { setMode('login'); setError(''); }}>
            Log in
          </button>
          <button type="button" className={`tab-btn ${mode === 'signup' ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => { setMode('signup'); setError(''); }}>
            Sign up
          </button>
        </div>

        {error && <div className="alert alert-danger mb-md">{error}</div>}

        <form onSubmit={handleSubmit} className="flex" style={{ flexDirection: 'column', gap: 14 }}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Full Name</label>
              <div className="input-with-icon">
                <User size={16} />
                <input id="auth-name" className="form-input" placeholder="e.g. Aarav Sharma" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input id="auth-email" type="email" className="form-input" placeholder="you@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-pass">Password</label>
            <div className="input-with-icon">
              <Lock size={16} />
              <input id="auth-pass" type="password" className="form-input" placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg mt-sm" style={{ width: '100%' }}>
            {mode === 'login' ? 'Log in to Dashboard' : 'Continue to Onboarding'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ borderTop: '1px solid var(--border)', marginTop: 22, paddingTop: 18 }}>
          <div className="text-xs text-muted mb-sm" style={{ textAlign: 'center' }}>
            Frontend Demo — Instant Portal Access (No Backend Auth)
          </div>
          <div className="grid grid-3" style={{ gap: 8 }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => quickEnterPortal('student', '/dashboard')}>
              <User size={14} /> Student
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => quickEnterPortal('mentor', '/mentor/dashboard')}>
              <GraduationCap size={14} /> Mentor
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => quickEnterPortal('admin', '/admin/dashboard')}>
              <Shield size={14} /> Admin
            </button>
          </div>
        </div>

        <p className="text-xs text-muted mt-md" style={{ textAlign: 'center' }}>
          By continuing you agree to our <Link to="/legal?tab=terms" className="text-primary">Terms</Link> and <Link to="/legal?tab=privacy" className="text-primary">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
