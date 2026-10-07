import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export default function DeleteConfirmModal({ user, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      const isVercel = !API_URL || API_URL === '';
      const url = isVercel
        ? `${API_URL}/api/users?id=${user.id}`
        : `${API_URL}/api/users/${user.id}`;

      const res = await fetch(url, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menghapus pengguna.');
      onSuccess(user.id, data.message);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={handleOverlayClick}
    >
      <div className="modal" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h2 id="delete-modal-title" className="modal-title">🗑️ Hapus Pengguna</h2>
          <button
            id="delete-modal-close-btn"
            className="modal-close"
            onClick={onClose}
            aria-label="Tutup modal hapus"
          >
            ×
          </button>
        </div>

        <div className="modal-body" style={{ gap: '16px' }}>
          {/* Warning icon */}
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(244,63,94,0.12)',
              border: '2px solid rgba(244,63,94,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', margin: '0 auto 12px',
            }}>
              ⚠️
            </div>
            <p style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Yakin ingin menghapus?
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Pengguna <strong style={{ color: 'var(--color-text-primary)' }}>{user.name}</strong> akan dihapus secara permanen.
              Tindakan ini tidak bisa dibatalkan.
            </p>
          </div>

          {/* User summary card */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px',
            background: 'rgba(244,63,94,0.06)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(244,63,94,0.15)',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(244,63,94,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '12px',
              color: 'var(--color-accent-rose)', flexShrink: 0,
            }}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {user.name}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {user.email} · {user.role}
              </div>
            </div>
          </div>

          {error && (
            <div className="form-error" style={{ padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: '8px' }}>
              ⚠ {error}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            id="delete-modal-cancel-btn"
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </button>
          <button
            id="delete-modal-confirm-btn"
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
            style={{ background: 'var(--color-accent-rose)', color: 'white', borderColor: 'var(--color-accent-rose)' }}
          >
            {loading ? '⏳ Menghapus...' : '🗑️ Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}
