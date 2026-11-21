import React from 'react';

export default function StatCard({ label, value, meta, icon: Icon, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        {Icon && (
          <div
            className="stat-icon"
            style={accent ? { background: `${accent}22`, color: accent } : undefined}
          >
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {meta && <div className="stat-meta">{meta}</div>}
    </div>
  );
}
