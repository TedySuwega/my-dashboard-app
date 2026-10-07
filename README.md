# 🛡️ AdminHub — Demo Dashboard Admin (Multi-Agent Project)

> **Catatan Penting:** Proyek ini adalah **demo/template starter** yang dibuat menggunakan pendekatan **Multi-Agent Workflow** (PM → Backend Dev → Frontend Dev → DevOps). Data yang ditampilkan adalah **dummy/statis** dan tidak terhubung ke database nyata.

---

## 🎯 Tujuan Proyek

Proyek ini dibuat sebagai **proof of concept** untuk membuktikan bahwa alur kerja multi-agen AI dapat menghasilkan proyek fullstack yang siap deploy secara otomatis — dari requirements hingga live URL.

---

## 🌐 Live Demo

**Frontend:** [https://my-dashboard-app-iota.vercel.app](https://my-dashboard-app-iota.vercel.app)
**API Endpoint:** `https://my-dashboard-app-iota.vercel.app/api/users`

---

## 🤖 Multi-Agent Architecture

Proyek ini dibangun oleh 4 peran AI agent yang dieksekusi secara berurutan:

| Agent | File Prompt | Output yang Dihasilkan |
|---|---|---|
| 📋 **Product Manager** | `.agents/pm-prompt.md` | `requirements.md` |
| ⚙️ **Backend Developer** | `.agents/backend-prompt.md` | `backend/server.js` + `backend/package.json` |
| ⚛️ **Frontend Developer** | `.agents/ui-prompt.md` | Seluruh kode di `frontend/src/` |
| 🚀 **DevOps** | `.agents/deploy-prompt.md` | `vercel.json` + `frontend/api/users.js` |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 18 + Vite |
| **Backend (Lokal)** | Node.js + Fastify |
| **Backend (Produksi)** | Vercel Serverless Functions (`frontend/api/`) |
| **Styling** | Vanilla CSS (dark theme, glassmorphism) |
| **Deployment** | Vercel (auto-deploy dari GitHub) |
| **Version Control** | Git + GitHub (SSH via `github-personal`) |

---

## ✨ Fitur Dashboard

- 📊 **Stats Cards** — Total pengguna, aktif, tidak aktif, total admin
- 👥 **Tabel Data Pengguna** — Kolom: Nama, Email, Role, Status, Tanggal Bergabung
- 🔍 **Search & Filter** — Pencarian real-time berdasarkan nama/email
- ➕ **Form Tambah Pengguna** — Modal dengan validasi input
- 📄 **Paginasi** — 10 baris per halaman
- 🔔 **Toast Notification** — Feedback saat aksi berhasil/gagal
- 🎨 **Dark UI Premium** — Glassmorphism, gradient, micro-animation

---

## 📁 Struktur Proyek

```
my-dashboard-app/
├── .agents/                    # Prompt file untuk setiap AI agent
│   ├── pm-prompt.md            # Role: Product Manager
│   ├── ui-prompt.md            # Role: Frontend Developer
│   ├── backend-prompt.md       # Role: Backend Developer
│   └── deploy-prompt.md        # Role: DevOps Engineer
│
├── requirements.md             # Output dari PM agent
│
├── frontend/                   # React + Vite app
│   ├── api/
│   │   └── users.js            # Vercel Serverless Function (produksi)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatsGrid.jsx
│   │   │   ├── UserTable.jsx
│   │   │   ├── AddUserModal.jsx
│   │   │   └── Toast.jsx
│   │   ├── hooks/
│   │   │   ├── useUsers.js     # Custom hook: fetch API
│   │   │   └── useToast.js     # Custom hook: notifikasi
│   │   ├── App.jsx
│   │   └── index.css           # Design system (CSS variables)
│   ├── vercel.json             # SPA routing config untuk Vercel
│   └── vite.config.js          # Vite + proxy ke backend lokal
│
├── backend/                    # Fastify server (LOKAL ONLY)
│   ├── server.js               # GET & POST /api/users
│   └── package.json
│
├── vercel.json                 # Root Vercel config (referensi)
├── package.json                # Workspace scripts
└── .gitignore
```

---

## 🚀 Cara Menjalankan Lokal

### Prerequisites
- Node.js >= 18

### Install & Run

```bash
# Clone repo
git clone git@github-personal:TedySuwega/my-dashboard-app.git
cd my-dashboard-app

# Install semua dependencies
npm run install:all

# Jalankan Backend (Terminal 1) → http://localhost:3001
npm run dev:backend

# Jalankan Frontend (Terminal 2) → http://localhost:5173
npm run dev:frontend
```

### Available Scripts (root)

```bash
npm run install:all      # Install deps frontend + backend
npm run dev:backend      # Jalankan Fastify server (port 3001)
npm run dev:frontend     # Jalankan Vite dev server (port 5173)
npm run build:frontend   # Build production frontend
```

---

## 🌍 API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/users` | Ambil semua data pengguna |
| `POST` | `/api/users` | Tambah pengguna baru |

### Contoh Response GET /api/users
```json
{
  "success": true,
  "total": 8,
  "data": [
    {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "role": "Admin",
      "status": "Aktif",
      "joinedAt": "2024-01-15"
    }
  ]
}
```

---

## 🔄 CI/CD Flow

```
Edit kode lokal
    ↓
git add . && git commit -m "feat: ..."
    ↓
git push   (via SSH: git@github-personal)
    ↓
GitHub Webhook → Vercel auto-triggered
    ↓
Vercel build frontend/ (~1-2 menit)
    ↓
✅ Live di Vercel URL
```

---

## ⚠️ Batasan (v1 — Demo Only)

- ❌ **Tidak ada database** — data in-memory, reset saat serverless cold start
- ❌ **Tidak ada autentikasi** — semua halaman bisa diakses langsung
- ❌ **Tombol Edit/Hapus belum berfungsi** — hanya UI placeholder
- ❌ **Backend Fastify tidak di-deploy** — hanya untuk development lokal

---

## 🗺️ Roadmap Pengembangan (v2+)

- [ ] Integrasi database (PostgreSQL / Supabase / MongoDB)
- [ ] Sistem autentikasi (JWT / NextAuth)
- [ ] Fungsi Edit & Hapus pengguna
- [ ] Dark/Light mode toggle
- [ ] Export CSV/Excel
- [ ] Role-based access control (RBAC)

---

## 👤 Author

**Tedy Suwega** — [@TedySuwega](https://github.com/TedySuwega)

---

*Dibuat dengan Multi-Agent AI Workflow — Oktober 2026*
