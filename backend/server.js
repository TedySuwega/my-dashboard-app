import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

// Register CORS
await fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
});

// In-memory data store (dummy data)
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

// Schemas
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['Admin', 'User', 'Editor'] },
    status: { type: 'string', enum: ['Aktif', 'Tidak Aktif'] },
    joinedAt: { type: 'string' },
  },
};

// GET /api/users — Return all users
fastify.get('/api/users', {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          total: { type: 'integer' },
          data: { type: 'array', items: userSchema },
        },
      },
    },
  },
}, async (request, reply) => {
  return {
    success: true,
    total: users.length,
    data: users,
  };
});

// POST /api/users — Add a new user
fastify.post('/api/users', {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'role', 'status'],
      properties: {
        name: { type: 'string', minLength: 2 },
        email: { type: 'string', format: 'email' },
        role: { type: 'string', enum: ['Admin', 'User', 'Editor'] },
        status: { type: 'string', enum: ['Aktif', 'Tidak Aktif'] },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: userSchema,
        },
      },
    },
  },
}, async (request, reply) => {
  const { name, email, role, status } = request.body;

  // Check duplicate email
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return reply.status(409).send({
      success: false,
      message: 'Email sudah terdaftar.',
    });
  }

  const today = new Date().toISOString().split('T')[0];
  const newUser = {
    id: nextId++,
    name,
    email,
    role,
    status,
    joinedAt: today,
  };

  users.push(newUser);

  return reply.status(201).send({
    success: true,
    message: 'Pengguna berhasil ditambahkan.',
    data: newUser,
  });
});

// Health check
fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// Start server
const PORT = process.env.PORT || 3001;
try {
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
