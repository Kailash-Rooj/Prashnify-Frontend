import React, { useState } from 'react';
import { Flame, Medal, Trophy } from 'lucide-react';
import { LEADERBOARD_DATA } from '../../data/mockData';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('weekly');
  const [examFilter, setExamFilter] = useState('All');

  const rows = (LEADERBOARD_DATA[period] || []).filter(
    (r) => examFilter === 'All' || r.exam === examFilter
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Leaderboard</h1>
          <p className="page-description">Compare weekly, monthly, and all-time rankings across Prashnify aspirants.</p>
        </div>
        <div className="tabs">
          <button type="button" className={`tab-btn ${period === 'weekly' ? 'active' : ''}`} onClick={() => setPeriod('weekly')}>Weekly</button>
          <button type="button" className={`tab-btn ${period === 'monthly' ? 'active' : ''}`} onClick={() => setPeriod('monthly')}>Monthly</button>
          <button type="button" className={`tab-btn ${period === 'allTime' ? 'active' : ''}`} onClick={() => setPeriod('allTime')}>All-Time</button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-3 mb-lg">
        {rows.slice(0, 3).map((top, idx) => (
          <div key={top.name} className="card" style={idx === 0 ? { borderColor: 'var(--primary)' } : undefined}>
            <div className="flex-between mb-sm">
              <span className={`badge ${idx === 0 ? 'badge-primary' : 'badge-neutral'}`}>
                {idx === 0 ? <Trophy size={13} /> : <Medal size={13} />} Rank #{top.rank}
              </span>
              <span className="text-xs text-muted">{top.exam}</span>
            </div>
            <h3 style={{ fontSize: 18 }}>{top.name}</h3>
            <div className="flex-between mt-md text-sm">
              <span className="font-bold text-primary">{top.score.toLocaleString()} pts</span>
              <span className="text-secondary">{top.accuracy}% acc · {top.streak}d streak</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-sm mb-md">
        {['All', 'GAT-B', 'IIT JAM BT', 'CSIR NET LS', 'GATE XL'].map((ex) => (
          <button key={ex} type="button" className={`btn btn-sm ${examFilter === ex ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setExamFilter(ex)}>
            {ex}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Exam</th>
              <th>Points</th>
              <th>Accuracy</th>
              <th>Tests</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} style={r.isCurrentUser ? { background: 'var(--primary-soft)' } : undefined}>
                <td className="font-bold">#{r.rank}</td>
                <td className="font-semibold">
                  {r.name} {r.isCurrentUser && <span className="badge badge-primary" style={{ marginLeft: 6 }}>You</span>}
                </td>
                <td><span className="badge badge-neutral">{r.exam}</span></td>
                <td className="font-bold">{r.score.toLocaleString()}</td>
                <td>{r.accuracy}%</td>
                <td>{r.tests}</td>
                <td><span className="flex gap-sm text-warning font-semibold" style={{ alignItems: 'center' }}><Flame size={14} /> {r.streak}d</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
