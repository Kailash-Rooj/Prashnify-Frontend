import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex-between mb-md">
          <div>
            <h3>{title}</h3>
            {subtitle && <p className="text-sm text-muted mt-sm">{subtitle}</p>}
          </div>
          <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="flex flex-wrap gap-sm mt-lg" style={{ justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </div>
  );
}
