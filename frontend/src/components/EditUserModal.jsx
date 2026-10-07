import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export default function EditUserModal({ user, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Nama harus minimal 2 karakter.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Email tidak valid.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Vercel serverless: PUT /api/users?id=:id
      // Local Fastify:     PUT /api/users/:id
      const isVercel = !API_URL || API_URL === '';
      const url = isVercel
        ? `${API_URL}/api/users?id=${user.id}`
        : `${API_URL}/api/users/${user.id}`;

      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal memperbarui pengguna.');
      onSuccess(data.data);
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
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
      aria-labelledby="edit-modal-title"
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <div className="modal-header">
          <h2 id="edit-modal-title" className="modal-title">✏️ Edit Pengguna</h2>
          <button
            id="edit-modal-close-btn"
            className="modal-close"
            onClick={onClose}
            aria-label="Tutup modal edit"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Badge info user */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px',
              background: 'rgba(99,102,241,0.08)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: '4px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--color-brand-gradient)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '12px', color: 'white', flexShrink: 0,
              }}>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  ID #{user.id} · Bergabung {new Date(user.joinedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-field-name">
                Nama Lengkap <span>*</span>
              </label>
              <input
                id="edit-field-name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                autoComplete="off"
              />
              {errors.name && <span className="form-error">⚠ {errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="edit-field-email">
                Alamat Email <span>*</span>
              </label>
              <input
                id="edit-field-email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                autoComplete="off"
              />
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>

            {/* Role & Status */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-field-role">Role</label>
                <select id="edit-field-role" className="form-select" name="role" value={form.role} onChange={handleChange}>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="edit-field-status">Status</label>
                <select id="edit-field-status" className="form-select" name="status" value={form.status} onChange={handleChange}>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            {errors.submit && (
              <div className="form-error" style={{ padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: '8px' }}>
                ⚠ {errors.submit}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button id="edit-modal-cancel-btn" type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Batal
            </button>
            <button id="edit-modal-submit-btn" type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Menyimpan...' : '✓ Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
