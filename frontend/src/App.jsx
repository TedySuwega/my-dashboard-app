import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import UserTable from './components/UserTable.jsx';
import AddUserModal from './components/AddUserModal.jsx';
import Toast from './components/Toast.jsx';
import { useUsers } from './hooks/useUsers.js';
import { useToast } from './hooks/useToast.js';

export default function App() {
  const { users, loading, error, addUser } = useUsers();
  const { toasts, addToast, removeToast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const handleUserAdded = (newUser) => {
    addUser(newUser);
    addToast(`✨ Pengguna "${newUser.name}" berhasil ditambahkan!`, 'success');
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header userCount={users.length} />

        <main className="main-content" id="main-content" role="main">
          {error && (
            <div
              role="alert"
              style={{
                background: 'rgba(244,63,94,0.1)',
                border: '1px solid rgba(244,63,94,0.3)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-accent-rose)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>⚠️</span>
              <span>
                Gagal memuat data dari server backend. Pastikan backend Fastify berjalan di port 3001.{' '}
                <strong>Error: {error}</strong>
              </span>
            </div>
          )}

          <StatsGrid users={users} />

          <UserTable
            users={users}
            loading={loading}
            onAddUser={() => setShowModal(true)}
          />
        </main>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onSuccess={handleUserAdded}
        />
      )}

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
