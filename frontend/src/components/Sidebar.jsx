import React from 'react';

const navItems = [
  { icon: '⚡', label: 'Dashboard', id: 'dashboard', active: false },
  { icon: '👥', label: 'Pengguna', id: 'users', active: true },
  { icon: '📊', label: 'Analitik', id: 'analytics', active: false },
  { icon: '🔔', label: 'Notifikasi', id: 'notifications', active: false },
];

const settingsItems = [
  { icon: '⚙️', label: 'Pengaturan', id: 'settings' },
  { icon: '🔒', label: 'Keamanan', id: 'security' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" role="navigation" aria-label="Navigasi utama">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✦</div>
        <span className="sidebar-logo-text">AdminHub</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Menu Utama</span>
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item ${item.active ? 'active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <span className="nav-section-label">Konfigurasi</span>
        {settingsItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className="nav-item"
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Card */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">T</div>
          <div className="user-info">
            <div className="user-name">Tedy Suwega</div>
            <div className="user-role">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
