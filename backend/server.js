import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });
await fastify.register(cors, { origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] });

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

fastify.get('/api/users', async () => ({ success: true, total: users.length, data: users }));

fastify.post('/api/users', async (req, reply) => {
  const { name, email, role, status } = req.body;
  if (users.find(u => u.email === email))
    return reply.status(409).send({ success: false, message: 'Email sudah terdaftar.' });
  const newUser = { id: nextId++, name, email, role, status, joinedAt: new Date().toISOString().split('T')[0] };
  users.push(newUser);
  return reply.status(201).send({ success: true, message: 'Pengguna berhasil ditambahkan.', data: newUser });
});

fastify.put('/api/users/:id', async (req, reply) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return reply.status(404).send({ success: false, message: 'Pengguna tidak ditemukan.' });
  const { name, email, role, status } = req.body;
  if (users.find(u => u.email === email && u.id !== id))
    return reply.status(409).send({ success: false, message: 'Email sudah digunakan pengguna lain.' });
  users[index] = { ...users[index], name, email, role, status };
  return { success: true, message: 'Pengguna berhasil diperbarui.', data: users[index] };
});

fastify.delete('/api/users/:id', async (req, reply) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return reply.status(404).send({ success: false, message: 'Pengguna tidak ditemukan.' });
  const deleted = users.splice(index, 1)[0];
  return { success: true, message: `Pengguna "${deleted.name}" berhasil dihapus.`, data: deleted };
});

fastify.get('/health', async () => ({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
await fastify.listen({ port: PORT, host: '0.0.0.0' });
console.log(`🚀 Backend running at http://localhost:${PORT}`);
