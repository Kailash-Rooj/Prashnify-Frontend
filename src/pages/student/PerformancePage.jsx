import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Calendar, Target, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { SUBJECTS_WITH_SUBTOPICS } from '../../data/mockData';

const ACCURACY_TREND = [
  { week: 'W1', accuracy: 58 },
  { week: 'W2', accuracy: 63 },
  { week: 'W3', accuracy: 67 },
  { week: 'W4', accuracy: 71 },
  { week: 'W5', accuracy: 76 },
  { week: 'W6', accuracy: 81 },
  { week: 'W7', accuracy: 84 }
];

const HEATMAP_LEVELS = [
  1, 2, 0, 3, 2, 4, 1, 2, 3, 4, 2, 3,
  2, 3, 1, 0, 2, 3, 4, 2, 1, 3, 4, 4,
  0, 1, 2, 3, 4, 2, 3, 3, 2, 4, 3, 4,
  1, 2, 3, 2, 1, 4, 4, 3, 4, 2, 3, 4
];

export default function PerformancePage() {
  const subjectData = SUBJECTS_WITH_SUBTOPICS.map((s) => ({
    name: s.name.split(' ')[0],
    fullName: s.name,
    accuracy: s.accuracy
  }));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Performance Analytics</h1>
          <p className="page-description">Track your weekly accuracy trend, compare subject mastery, and review your daily practice consistency.</p>
        </div>
        <Link to="/weak-topics" className="btn btn-primary">Fix Weak Topics <ArrowRight size={16} /></Link>
      </div>

      <div className="grid grid-2 mb-lg">
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title flex gap-sm" style={{ alignItems: 'center' }}><TrendingUp size={17} className="text-primary" /> Accuracy Trend</h2>
              <p className="card-subtitle">7-week progression across all mocks &amp; practice</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={ACCURACY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[40, 100]} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
                <Line type="monotone" dataKey="accuracy" stroke="#6C47FF" strokeWidth={3} dot={{ r: 4 }} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title flex gap-sm" style={{ alignItems: 'center' }}><BarChart3 size={17} className="text-primary" /> Subject Accuracy Breakdown</h2>
              <p className="card-subtitle">Genetics (58%) &amp; Immunology (64%) need priority focus</p>
            </div>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
                <Bar dataKey="accuracy" fill="#6C47FF" radius={[8, 8, 0, 0]} name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title flex gap-sm" style={{ alignItems: 'center' }}><Calendar size={17} className="text-primary" /> Activity Calendar (Last 48 Days)</h2>
            <p className="card-subtitle">Darker purple squares indicate higher daily question volume</p>
          </div>
          <Link to="/weak-topics" className="btn btn-secondary btn-sm"><Target size={14} /> Open Weak Topics</Link>
        </div>

        <div className="heatmap-grid">
          {HEATMAP_LEVELS.map((lvl, idx) => (
            <div
              key={idx}
              className={`heatmap-cell ${lvl > 0 ? `lvl-${lvl}` : ''}`}
              title={`Day ${idx + 1}: ${lvl * 15} questions solved`}
            />
          ))}
        </div>

        <div className="flex gap-md mt-md text-xs text-muted" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <span>Less</span>
          <span className="heatmap-cell" style={{ width: 14, height: 14 }} />
          <span className="heatmap-cell lvl-1" style={{ width: 14, height: 14 }} />
          <span className="heatmap-cell lvl-2" style={{ width: 14, height: 14 }} />
          <span className="heatmap-cell lvl-3" style={{ width: 14, height: 14 }} />
          <span className="heatmap-cell lvl-4" style={{ width: 14, height: 14 }} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
