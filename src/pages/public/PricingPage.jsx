import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PricingPage() {
  const { plans, user } = useApp();

  return (
    <div className="container" style={{ padding: '52px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 36px' }}>
        <span className="badge badge-primary mb-sm">1, 6, and 12-Month Plans</span>
        <h1 style={{ fontSize: 34, marginTop: 8 }}>Choose the right plan for {user.exam} {user.attemptYear}</h1>
        <p className="text-secondary mt-sm">
          Start free or unlock full All-India Test Series, detailed analytics, and priority mentorship slots. Mentorship sessions are billed separately (₹299/hr 1-on-1, ₹99/hr Group).
        </p>
      </div>

      <div className="grid grid-3 mb-lg">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="card"
            style={plan.months === 6 ? { borderColor: 'var(--primary)', boxShadow: 'var(--shadow-md)' } : undefined}
          >
            <div className="flex-between mb-sm">
              <h2 style={{ fontSize: 19 }}>{plan.name}</h2>
              <span className={`badge ${plan.months === 6 ? 'badge-primary' : 'badge-neutral'}`}>{plan.badge}</span>
            </div>
            <div style={{ margin: '18px 0' }}>
              <span style={{ fontSize: 36, fontWeight: 800 }}>₹{plan.price}</span>
              <span className="text-sm text-muted" style={{ marginLeft: 8, textDecoration: 'line-through' }}>₹{plan.originalPrice}</span>
              <div className="text-xs text-muted mt-sm">
                Effective ₹{Math.round(plan.price / plan.months)} / month · Billed once
              </div>
            </div>

            <div className="flex" style={{ flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {plan.features.map((feat) => (
                <div key={feat} className="text-sm text-secondary flex gap-sm" style={{ alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} className="text-success" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link
              to={`/checkout?plan=${plan.id}`}
              className={`btn ${plan.months === 6 ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%' }}
            >
              Proceed to Checkout
            </Link>
          </div>
        ))}
      </div>

      <div className="card flex-between flex-wrap gap-md">
        <div className="flex gap-md" style={{ alignItems: 'center' }}>
          <div className="stat-icon"><Sparkles size={18} /></div>
          <div>
            <h3 style={{ fontSize: 16 }}>Not ready to subscribe yet?</h3>
            <p className="text-sm text-secondary">Continue with the Free Starter tier — includes daily practice quizzes and sample Practice Sets.</p>
          </div>
        </div>
        <Link to="/choose-exam" className="btn btn-outline">Continue Free</Link>
      </div>
    </div>
  );
}
