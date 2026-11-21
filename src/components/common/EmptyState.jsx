import React from 'react';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction, tone = 'default' }) {
  const iconStyle =
    tone === 'danger'
      ? { background: 'var(--danger-soft)', color: 'var(--danger)' }
      : tone === 'warning'
      ? { background: 'var(--warning-soft)', color: 'var(--warning)' }
      : {};

  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon" style={iconStyle}>
          <Icon size={24} />
        </div>
      )}
      <h4 style={{ fontSize: 16 }}>{title}</h4>
      <p className="text-sm text-secondary" style={{ maxWidth: 420 }}>{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary btn-sm mt-sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
