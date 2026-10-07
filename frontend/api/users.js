// Vercel Serverless Function — GET & POST /api/users
// This wraps the Fastify endpoints for Vercel deployment

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

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  }

  if (req.method === 'POST') {
    const { name, email, role, status } = req.body || {};

    if (!name || !email || !role || !status) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });
    }

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar.' });
    }

    const today = new Date().toISOString().split('T')[0];
    const newUser = { id: nextId++, name, email, role, status, joinedAt: today };
    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Pengguna berhasil ditambahkan.',
      data: newUser,
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
