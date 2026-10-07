# Admin Dashboard — Requirements Document

## Overview
Sebuah web dashboard admin yang memungkinkan administrator untuk melihat dan mengelola data pengguna secara real-time melalui antarmuka yang bersih dan responsif.

---

## Tech Stack
- **Frontend**: React + Vite (SPA)
- **Backend**: Node.js + Fastify (REST API)
- **Deployment**: Vercel (frontend + serverless functions)

---

## Fitur Utama

### 1. Halaman Dashboard
- Header dengan judul aplikasi dan nama admin yang sedang login (dummy).
- Sidebar navigasi sederhana (Dashboard, Users, Settings).
- Area konten utama yang menampilkan ringkasan statistik (total pengguna, aktif, tidak aktif).

### 2. Tabel Data Pengguna
- Menampilkan daftar pengguna dari endpoint `GET /api/users`.
- Kolom tabel: **ID**, **Nama**, **Email**, **Role**, **Status**, **Tanggal Bergabung**.
- Fitur pencarian/filter berdasarkan nama atau email.
- Paginasi sederhana (10 baris per halaman).
- Status pengguna ditampilkan sebagai badge berwarna (Aktif = hijau, Tidak Aktif = merah).

### 3. Tombol & Form Tambah Data
- Tombol **"+ Tambah Pengguna"** di atas tabel.
- Modal/form yang muncul saat tombol diklik, berisi field:
  - Nama Lengkap (text, required)
  - Email (email, required)
  - Role (select: Admin / User / Editor)
  - Status (select: Aktif / Tidak Aktif)
- Tombol **Submit** mengirimkan data ke endpoint `POST /api/users`.
- Setelah submit berhasil, tabel diperbarui otomatis (re-fetch).

### 4. Notifikasi
- Toast notification saat pengguna berhasil ditambahkan.
- Pesan error jika request gagal.

---

## API Endpoints

| Method | Endpoint     | Deskripsi                         |
|--------|--------------|-----------------------------------|
| GET    | /api/users   | Mengembalikan daftar semua pengguna |
| POST   | /api/users   | Menambahkan pengguna baru         |

### Contoh Response GET /api/users
```json
{
  "success": true,
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

### Contoh Request Body POST /api/users
```json
{
  "name": "Ani Rahayu",
  "email": "ani@example.com",
  "role": "User",
  "status": "Aktif"
}
```

---

## Non-Functional Requirements
- Waktu respons API < 200ms.
- UI responsif untuk layar desktop dan tablet (min-width: 768px).
- Kode mengikuti standar ESLint + Prettier.
- Semua endpoint mendukung CORS untuk pengembangan lokal.

---

## Out of Scope (v1)
- Autentikasi nyata (login/logout).
- Database persisten (data disimpan in-memory).
- Dark mode toggle (dapat ditambahkan di v2).
