import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { History, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmptyState from '../../components/common/EmptyState';

export default function TestHistoryPage() {
  const navigate = useNavigate();
  const { testHistory } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = testHistory.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.exam.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Test History</h1>
          <p className="page-description">Every completed Test Series mock, Custom Test, and Practice Set with score and accuracy history.</p>
        </div>
        <Link to="/create-test" className="btn btn-primary">New Custom Test</Link>
      </div>

      <div className="flex-between flex-wrap gap-md mb-lg">
        <div className="input-with-icon" style={{ minWidth: 260, flex: 1, maxWidth: 400 }}>
          <Search size={16} />
          <input className="form-input" placeholder="Search test name or exam..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="tabs">
          {['All', 'Test Series', 'Custom Test', 'Practice Set'].map((t) => (
            <button key={t} type="button" className={`tab-btn ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={History}
          title="No matching tests found"
          description="Try clearing your filter or take your first timed mock to see detailed results here."
          actionLabel="Create a Test"
          onAction={() => navigate('/create-test')}
        />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Type</th>
                <th>Date</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Rank Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-muted">{item.exam} · Attempt #{item.attemptNumber || 1}</div>
                  </td>
                  <td><span className="badge badge-neutral">{item.type}</span></td>
                  <td className="text-sm text-secondary">{item.date}</td>
                  <td className="font-semibold">{item.score} / {item.maxScore}</td>
                  <td><span className={`badge ${item.accuracy >= 75 ? 'badge-success' : 'badge-warning'}`}>{item.accuracy}%</span></td>
                  <td>
                    {item.countedForRank && item.air ? (
                      <span className="badge badge-primary">AIR {item.air} ({item.percentile}%ile)</span>
                    ) : (
                      <span className="text-xs text-muted">Practice Only</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/series-result/${item.id}`} className="btn btn-secondary btn-sm">Open Result</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
