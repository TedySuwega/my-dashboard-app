import React from 'react';

export default function Header({ userCount }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <h1 className="page-title">Manajemen Pengguna</h1>
        <div className="page-breadcrumb">
          <span>AdminHub</span>
          <span>›</span>
          <span>Pengguna</span>
          <span>›</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>{dateStr}</span>
        </div>
      </div>
      <div className="header-right">
        <button id="header-search-btn" className="header-btn" aria-label="Cari">🔍</button>
        <button id="header-notification-btn" className="header-btn notification-dot" aria-label="Notifikasi">🔔</button>
        <button id="header-help-btn" className="header-btn" aria-label="Bantuan">❓</button>
      </div>
    </header>
  );
}
