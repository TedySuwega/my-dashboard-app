import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/users`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setUsers(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = useCallback((newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  }, []);

  return { users, loading, error, refetch: fetchUsers, addUser };
}
