import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FilePlus2,
  Flame,
  Layers,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/common/StatCard';

const TREND_DATA = [
  { test: 'Mock 3', accuracy: 64, score: 42 },
  { test: 'Mock 4', accuracy: 69, score: 47 },
  { test: 'Mock 5', accuracy: 72, score: 50 },
  { test: 'Mock 6', accuracy: 77, score: 54 },
  { test: 'Mock 7', accuracy: 81, score: 59 },
  { test: 'DNA Set', accuracy: 88, score: 66 }
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, testHistory, testSeries } = useApp();

  const avgAccuracy = testHistory.length
    ? Math.round(testHistory.reduce((acc, t) => acc + t.accuracy, 0) / testHistory.length)
    : 0;
  const upcomingTests = testSeries.flatMap((s) =>
    s.tests.filter((t) => t.status === 'Live Now' || t.status === 'Upcoming').map((t) => ({ ...t, seriesTitle: s.title, seriesId: s.id }))
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="page-description">
            {user.exam} {user.attemptYear} · Daily goal: {user.dailyGoal} · Keep your {user.streak}-day streak active today.
          </p>
        </div>
        <div className="flex gap-sm flex-wrap">
          <Link to="/create-test" className="btn btn-primary"><FilePlus2 size={16} /> Create Test</Link>
          <Link to="/test-series" className="btn btn-secondary"><Layers size={16} /> Test Series</Link>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-4 mb-lg">
        <StatCard label="Overall Accuracy" value={`${avgAccuracy}%`} meta="+7% vs last 30 days" icon={Target} accent="#6C47FF" />
        <StatCard label="Study Streak" value={`${user.streak} Days`} meta={`Goal: ${user.dailyGoal}/day`} icon={Flame} accent="#F59E0B" />
        <StatCard label="Tests Completed" value={testHistory.length} meta="Across mocks & practice" icon={CheckCircle2} accent="#22C55E" />
        <StatCard label="Best All-India Rank" value="AIR 142" meta="96.4 percentile · Mock 7" icon={TrendingUp} accent="#38BDF8" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-4 mb-lg">
        {[
          { title: 'Start Full Mock 8', desc: '60 Qs · Live National Window', to: '/test-series', icon: Calendar },
          { title: 'Create Custom Test', desc: 'Pick subject & difficulty', to: '/create-test', icon: Layers },
          { title: 'Solve PYQs', desc: '2020–2025 Papers', to: '/pyqs', icon: BookOpen },
          { title: 'Weak Topics Drill', desc: 'Target low-accuracy areas', to: '/weak-topics', icon: Target }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} to={item.to} className="card card-compact card-interactive flex gap-md" style={{ alignItems: 'center' }}>
              <div className="stat-icon"><Icon size={18} /></div>
              <div style={{ minWidth: 0 }}>
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-muted">{item.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid-sidebar-split mb-lg">
        {/* Accuracy Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Accuracy &amp; Score Progression</h2>
              <p className="card-subtitle">Last 6 timed and topic assessments</p>
            </div>
            <Link to="/performance" className="btn btn-ghost btn-sm">Full Analytics <ArrowRight size={14} /></Link>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <AreaChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="test" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#6C47FF" fill="rgba(108,71,255,0.22)" strokeWidth={2.5} name="Accuracy %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Scheduled Tests */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Upcoming &amp; Live Tests</h2>
              <p className="card-subtitle">First live attempt counts for AIR</p>
            </div>
            <Link to="/test-series" className="btn btn-ghost btn-sm">View all</Link>
          </div>
          <div className="flex" style={{ flexDirection: 'column', gap: 12 }}>
            {upcomingTests.slice(0, 3).map((t) => (
              <div key={t.id} className="card card-compact" style={{ background: 'var(--surface-muted)' }}>
                <div className="flex-between mb-sm">
                  <span className={`badge ${t.status === 'Live Now' ? 'badge-success' : 'badge-warning'}`}>{t.status}</span>
                  <span className="text-xs text-muted">{t.durationMinutes} min · {t.questionCount} Qs</span>
                </div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted mt-sm">{t.liveWindow}</div>
                {t.status === 'Live Now' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-sm"
                    onClick={() => navigate(`/exam?mode=series&seriesId=${t.seriesId}&testId=${t.id}`)}
                  >
                    Enter Live Test
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Test Results</h2>
            <p className="card-subtitle">Click any attempt to open your full subject breakdown</p>
          </div>
          <Link to="/test-history" className="btn btn-ghost btn-sm">All History <ArrowRight size={14} /></Link>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Mode</th>
                <th>Date</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Rank</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {testHistory.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold">{item.title}</td>
                  <td><span className="badge badge-neutral">{item.type}</span></td>
                  <td className="text-secondary text-sm">{item.date}</td>
                  <td className="font-semibold">{item.score} / {item.maxScore}</td>
                  <td><span className={`badge ${item.accuracy >= 75 ? 'badge-success' : 'badge-warning'}`}>{item.accuracy}%</span></td>
                  <td>{item.air ? `AIR ${item.air}` : 'Practice'}</td>
                  <td>
                    <Link to={`/series-result/${item.id}`} className="btn btn-secondary btn-sm">View Result</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
