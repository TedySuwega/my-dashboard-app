import React, { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className={`toast ${toast.type}`} role="alert">
      <span className="toast-icon">{toast.type === 'success' ? '✅' : '❌'}</span>
      <span>{toast.message}</span>
      <button
        onClick={onRemove}
        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '16px' }}
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  );
}
