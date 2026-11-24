import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Circle, Sparkles, Users } from 'lucide-react';

const INITIAL_WEEKLY_PLAN = [
  { id: 'd1', day: 'Mon', task: 'DNA Replication Custom Drill (25 Qs)', target: '/create-test?subject=Molecular%20Biology', done: true },
  { id: 'd2', day: 'Tue', task: 'Immunology Complement Pathways Subtopic Drill (15 Qs)', target: '/subtopics?subject=Immunology', done: true },
  { id: 'd3', day: 'Wed', task: 'Enzyme Kinetics & Hardy-Weinberg NAT Numericals', target: '/create-test?subject=Biochemistry', done: false },
  { id: 'd4', day: 'Thu', task: 'Review Saved Questions & Mistake Notes', target: '/saved-questions', done: false },
  { id: 'd5', day: 'Fri', task: 'Review Accuracy Trend & Subject Performance', target: '/performance', done: false },
  { id: 'd6', day: 'Sat', task: 'Full Mock 8 — Live All-India Test Window (First Attempt)', target: '/test-series', done: false },
  { id: 'd7', day: 'Sun', task: 'Error Analysis & Weak Topic Re-test', target: '/weak-topics', done: false }
];

export default function RecommendationsPage() {
  const [plan, setPlan] = useState(INITIAL_WEEKLY_PLAN);

  const toggleDay = (id) => {
    setPlan((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const completed = plan.filter((p) => p.done).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Personalized Recommendations</h1>
          <p className="page-description">Actionable next steps generated from your Mock 7 accuracy, weak subtopics, and upcoming live test calendar.</p>
        </div>
        <span className="badge badge-primary">{completed} / {plan.length} weekly tasks done</span>
      </div>

      <div className="grid grid-3 mb-lg">
        <div className="card">
          <span className="badge badge-danger mb-sm">Priority #1</span>
          <h3 style={{ fontSize: 17 }}>Recover Genetics Mapping Marks</h3>
          <p className="text-sm text-secondary mt-sm mb-md">Your accuracy in Three-Point Cross &amp; Linkage Mapping is 44%. A focused 15-question custom test can lift your score by +6 marks.</p>
          <Link to="/create-test?subject=Genetics" className="btn btn-primary btn-sm">Launch Genetics Test <ArrowRight size={14} /></Link>
        </div>

        <div className="card">
          <span className="badge badge-warning mb-sm">Priority #2</span>
          <h3 style={{ fontSize: 17 }}>Complete Full Mock 8 Live Window</h3>
          <p className="text-sm text-secondary mt-sm mb-md">Live window closes Nov 22. Only your first attempt qualifies for the All-India Rank leaderboard.</p>
          <Link to="/test-series" className="btn btn-secondary btn-sm">Open Test Series <ArrowRight size={14} /></Link>
        </div>

        <div className="card">
          <span className="badge badge-info mb-sm">Mentorship Match</span>
          <h3 style={{ fontSize: 17 }}>Book a 1-on-1 Error Audit</h3>
          <p className="text-sm text-secondary mt-sm mb-md">Rohan Kulkarni (AIR 11, IIT Bombay) specializes in Biochemistry &amp; NAT numericals — ₹299/hr, pay only after acceptance.</p>
          <Link to="/performance" className="btn btn-secondary btn-sm"><Users size={14} /> View Analytics</Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title flex gap-sm" style={{ alignItems: 'center' }}><Sparkles size={17} className="text-primary" /> Your 7-Day Study Plan</h2>
            <p className="card-subtitle">Check off tasks as you complete them</p>
          </div>
        </div>
        <div className="flex" style={{ flexDirection: 'column', gap: 10 }}>
          {plan.map((item) => (
            <div key={item.id} className="card card-compact flex-between flex-wrap gap-sm" style={{ background: 'var(--surface-muted)' }}>
              <button
                type="button"
                onClick={() => toggleDay(item.id)}
                className="flex gap-md"
                style={{ background: 'transparent', border: 'none', textAlign: 'left', alignItems: 'center' }}
              >
                {item.done ? <CheckCircle2 size={19} className="text-success" /> : <Circle size={19} className="text-muted" />}
                <div>
                  <span className="badge badge-neutral" style={{ marginRight: 8 }}>{item.day}</span>
                  <span className="text-sm font-semibold" style={item.done ? { textDecoration: 'line-through', opacity: 0.65 } : undefined}>
                    {item.task}
                  </span>
                </div>
              </button>
              <Link to={item.target} className="btn btn-ghost btn-sm">Go <ArrowRight size={14} /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
