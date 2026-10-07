import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const initialForm = { name: '', email: '', role: 'User', status: 'Aktif' };

export default function AddUserModal({ onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
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
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menambahkan pengguna.');
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
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">✦ Tambah Pengguna Baru</h2>
          <button
            id="modal-close-btn"
            className="modal-close"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="field-name">
                Nama Lengkap <span>*</span>
              </label>
              <input
                id="field-name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                autoComplete="off"
              />
              {errors.name && (
                <span className="form-error">⚠ {errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="field-email">
                Alamat Email <span>*</span>
              </label>
              <input
                id="field-email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Contoh: budi@example.com"
                autoComplete="off"
              />
              {errors.email && (
                <span className="form-error">⚠ {errors.email}</span>
              )}
            </div>

            {/* Role & Status */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="field-role">
                  Role
                </label>
                <select
                  id="field-role"
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="field-status">
                  Status
                </label>
                <select
                  id="field-status"
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
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
            <button
              id="modal-cancel-btn"
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Batal
            </button>
            <button
              id="modal-submit-btn"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '⏳ Menyimpan...' : '✓ Simpan Pengguna'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
