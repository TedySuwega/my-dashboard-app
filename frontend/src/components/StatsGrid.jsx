import React from 'react';

export default function StatsGrid({ users }) {
  const total = users.length;
  const aktif = users.filter(u => u.status === 'Aktif').length;
  const tidakAktif = users.filter(u => u.status === 'Tidak Aktif').length;
  const admins = users.filter(u => u.role === 'Admin').length;

  const stats = [
    {
      id: 'stat-total',
      label: 'Total Pengguna',
      value: total,
      icon: '👥',
      iconClass: 'indigo',
      change: '+12%',
      changeType: 'up',
      changeText: 'vs bulan lalu',
      barColor: 'linear-gradient(90deg, #6366f1, #a855f7)',
    },
    {
      id: 'stat-active',
      label: 'Pengguna Aktif',
      value: aktif,
      icon: '✅',
      iconClass: 'emerald',
      change: '+8%',
      changeType: 'up',
      changeText: 'vs bulan lalu',
      barColor: 'linear-gradient(90deg, #10b981, #06b6d4)',
    },
    {
      id: 'stat-inactive',
      label: 'Tidak Aktif',
      value: tidakAktif,
      icon: '⛔',
      iconClass: 'rose',
      change: '-3%',
      changeType: 'down',
      changeText: 'vs bulan lalu',
      barColor: 'linear-gradient(90deg, #f43f5e, #f59e0b)',
    },
    {
      id: 'stat-admin',
      label: 'Total Admin',
      value: admins,
      icon: '🛡️',
      iconClass: 'amber',
      change: 'Stabil',
      changeType: '',
      changeText: 'tidak ada perubahan',
      barColor: 'linear-gradient(90deg, #f59e0b, #f43f5e)',
    },
  ];

  return (
    <section className="stats-grid" aria-label="Ringkasan statistik pengguna">
      {stats.map((stat) => (
        <div key={stat.id} id={stat.id} className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">{stat.label}</span>
            <div className={`stat-icon ${stat.iconClass}`}>{stat.icon}</div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.changeType}`}>
            <span>{stat.change}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>{stat.changeText}</span>
          </div>
          <div className="stat-bar" style={{ background: stat.barColor }} />
        </div>
      ))}
    </section>
  );
}
