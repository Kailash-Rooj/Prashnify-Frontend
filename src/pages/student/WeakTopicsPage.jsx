import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Target } from 'lucide-react';
import { SUBJECTS_WITH_SUBTOPICS } from '../../data/mockData';

export default function WeakTopicsPage() {
  const [threshold, setThreshold] = useState(65);

  const weakItems = SUBJECTS_WITH_SUBTOPICS.flatMap((sub) =>
    sub.subtopics
      .filter((st) => st.accuracy < threshold)
      .map((st) => ({ ...st, subject: sub.name }))
  ).sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Weak Topics</h1>
          <p className="page-description">Subtopics below your target accuracy threshold. Drill these directly to recover lost marks fastest.</p>
        </div>
        <div className="flex gap-sm" style={{ alignItems: 'center' }}>
          <span className="text-sm text-secondary">Threshold: &lt; {threshold}%</span>
          <select className="form-select" style={{ width: 130 }} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))}>
            <option value={55}>Below 55%</option>
            <option value={65}>Below 65%</option>
            <option value={75}>Below 75%</option>
          </select>
        </div>
      </div>

      <div className="grid grid-2">
        {weakItems.map((item) => (
          <div key={item.id} className="card">
            <div className="flex-between mb-sm">
              <span className="badge badge-neutral">{item.subject}</span>
              <span className={`badge ${item.accuracy < 55 ? 'badge-danger' : 'badge-warning'}`}>
                <AlertCircle size={13} /> {item.accuracy}% accuracy
              </span>
            </div>
            <h3 style={{ fontSize: 17 }}>{item.name}</h3>
            <p className="text-xs text-muted mt-sm">{item.count} bank questions · Difficulty: {item.difficulty}</p>
            <div className="progress-track mt-md mb-md">
              <div
                className="progress-fill"
                style={{
                  width: `${item.accuracy}%`,
                  background: item.accuracy < 55 ? 'var(--danger)' : 'var(--warning)'
                }}
              />
            </div>
            <div className="flex-between">
              <span className="text-xs text-secondary flex-center"><Target size={13} /> Recommended: 15 Q drill</span>
              <Link to={`/create-test?subject=${encodeURIComponent(item.subject)}`} className="btn btn-primary btn-sm">
                Practice Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
