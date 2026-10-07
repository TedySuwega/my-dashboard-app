// Vercel Serverless Function — GET, POST, PUT, DELETE /api/users

let users = [
  { id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'Admin', status: 'Aktif', joinedAt: '2024-01-15' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@example.com', role: 'User', status: 'Aktif', joinedAt: '2024-02-20' },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@example.com', role: 'Editor', status: 'Tidak Aktif', joinedAt: '2024-03-05' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', role: 'User', status: 'Aktif', joinedAt: '2024-03-18' },
  { id: 5, name: 'Rizky Pratama', email: 'rizky@example.com', role: 'Editor', status: 'Aktif', joinedAt: '2024-04-01' },
  { id: 6, name: 'Maya Indah', email: 'maya@example.com', role: 'User', status: 'Tidak Aktif', joinedAt: '2024-04-15' },
  { id: 7, name: 'Hendra Wijaya', email: 'hendra@example.com', role: 'Admin', status: 'Aktif', joinedAt: '2024-05-10' },
  { id: 8, name: 'Rina Kartika', email: 'rina@example.com', role: 'User', status: 'Aktif', joinedAt: '2024-05-22' },
];

let nextId = users.length + 1;

const setCORSHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default function handler(req, res) {
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Extract id from query (e.g. /api/users?id=3)
  const id = req.query?.id ? parseInt(req.query.id) : null;

  // GET /api/users
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, total: users.length, data: users });
  }

  // POST /api/users — Create
  if (req.method === 'POST') {
    const { name, email, role, status } = req.body || {};
    if (!name || !email || !role || !status)
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });

    if (users.find((u) => u.email === email))
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar.' });

    const newUser = { id: nextId++, name, email, role, status, joinedAt: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    return res.status(201).json({ success: true, message: 'Pengguna berhasil ditambahkan.', data: newUser });
  }

  // PUT /api/users?id=:id — Update
  if (req.method === 'PUT') {
    if (!id) return res.status(400).json({ success: false, message: 'ID pengguna diperlukan.' });

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });

    const { name, email, role, status } = req.body || {};
    if (!name || !email || !role || !status)
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });

    // Check duplicate email (exclude current user)
    const duplicate = users.find((u) => u.email === email && u.id !== id);
    if (duplicate) return res.status(409).json({ success: false, message: 'Email sudah digunakan pengguna lain.' });

    users[index] = { ...users[index], name, email, role, status };
    return res.status(200).json({ success: true, message: 'Pengguna berhasil diperbarui.', data: users[index] });
  }

  // DELETE /api/users?id=:id — Delete
  if (req.method === 'DELETE') {
    if (!id) return res.status(400).json({ success: false, message: 'ID pengguna diperlukan.' });

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });

    const deleted = users[index];
    users.splice(index, 1);
    return res.status(200).json({ success: true, message: `Pengguna "${deleted.name}" berhasil dihapus.`, data: deleted });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
