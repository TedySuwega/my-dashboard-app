import React, { useState } from 'react';

const PAGE_SIZE = 10;

function RoleBadge({ role }) {
  const cls = { Admin: 'badge-admin', Editor: 'badge-editor', User: 'badge-user' }[role] || 'badge-user';
  return <span className={`badge ${cls}`}>{role}</span>;
}

function StatusBadge({ status }) {
  return (
    <span className={`badge ${status === 'Aktif' ? 'badge-aktif' : 'badge-inactive'}`}>
      {status}
    </span>
  );
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function UserTable({ users, loading, onAddUser, onEditUser, onDeleteUser }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <section className="table-section" aria-label="Tabel data pengguna">
      {/* Table Header */}
      <div className="table-header">
        <div className="table-title-group">
          <h2 className="table-title">Daftar Pengguna</h2>
          <p className="table-subtitle">
            {loading ? 'Memuat data...' : `${filtered.length} pengguna ditemukan`}
          </p>
        </div>
        <div className="table-controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="user-search-input"
              type="text"
              className="search-input"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={handleSearch}
              aria-label="Cari pengguna berdasarkan nama atau email"
            />
          </div>
          <button id="export-btn" className="btn btn-ghost btn-sm" aria-label="Export data">
            📤 Export
          </button>
          <button
            id="add-user-btn"
            className="btn btn-primary"
            onClick={onAddUser}
            aria-label="Tambah pengguna baru"
          >
            + Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table id="users-table" role="table" aria-label="Data pengguna">
          <thead>
            <tr>
              <th scope="col">Pengguna</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Bergabung</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j}>
                      <div
                        className="skeleton"
                        style={{ height: '16px', width: j === 0 ? '160px' : j === 1 ? '200px' : '80px' }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-title">Tidak ada hasil</div>
                    <p className="empty-desc">Coba kata kunci pencarian lain.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((user) => (
                <tr key={user.id} id={`user-row-${user.id}`}>
                  <td>
                    <div className="user-cell">
                      <div className="cell-avatar">{getInitials(user.name)}</div>
                      <div>
                        <div className="cell-name">{user.name}</div>
                        <div className="cell-id">#{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{user.email}</td>
                  <td><RoleBadge role={user.role} /></td>
                  <td><StatusBadge status={user.status} /></td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                    {new Date(user.joinedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        id={`edit-btn-${user.id}`}
                        className="btn btn-ghost btn-sm btn-icon"
                        aria-label={`Edit ${user.name}`}
                        title="Edit pengguna"
                        onClick={() => onEditUser(user)}
                      >
                        ✏️
                      </button>
                      <button
                        id={`delete-btn-${user.id}`}
                        className="btn btn-danger btn-sm btn-icon"
                        aria-label={`Hapus ${user.name}`}
                        title="Hapus pengguna"
                        onClick={() => onDeleteUser(user)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div className="pagination" role="navigation" aria-label="Navigasi halaman">
          <span className="pagination-info">
            Menampilkan {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} pengguna
          </span>
          <div className="pagination-controls">
            <button
              id="page-prev-btn"
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="page-btn" style={{ cursor: 'default' }}>…</span>
                ) : (
                  <button
                    key={p}
                    id={`page-btn-${p}`}
                    className={`page-btn ${currentPage === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-label={`Halaman ${p}`}
                    aria-current={currentPage === p ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              id="page-next-btn"
              className="page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Halaman berikutnya"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
