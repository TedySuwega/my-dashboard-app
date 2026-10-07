import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import UserTable from './components/UserTable.jsx';
import AddUserModal from './components/AddUserModal.jsx';
import EditUserModal from './components/EditUserModal.jsx';
import DeleteConfirmModal from './components/DeleteConfirmModal.jsx';
import Toast from './components/Toast.jsx';
import { useUsers } from './hooks/useUsers.js';
import { useToast } from './hooks/useToast.js';

export default function App() {
  const { users, loading, error, addUser, updateUser, deleteUser } = useUsers();
  const { toasts, addToast, removeToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);   // user object or null
  const [deletingUser, setDeletingUser] = useState(null); // user object or null

  const handleUserAdded = (newUser) => {
    addUser(newUser);
    addToast(`✨ Pengguna "${newUser.name}" berhasil ditambahkan!`, 'success');
  };

  const handleUserUpdated = (updatedUser) => {
    updateUser(updatedUser);
    addToast(`✏️ Pengguna "${updatedUser.name}" berhasil diperbarui!`, 'success');
  };

  const handleUserDeleted = (userId, message) => {
    deleteUser(userId);
    addToast(`🗑️ ${message}`, 'success');
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
            onAddUser={() => setShowAddModal(true)}
            onEditUser={(user) => setEditingUser(user)}
            onDeleteUser={(user) => setDeletingUser(user)}
          />
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleUserAdded}
        />
      )}

      {/* Edit Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={handleUserUpdated}
        />
      )}

      {/* Delete Confirm Modal */}
      {deletingUser && (
        <DeleteConfirmModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onSuccess={handleUserDeleted}
        />
      )}

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
