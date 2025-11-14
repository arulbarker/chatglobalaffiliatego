# Quick Setup Guide

## Langkah Cepat untuk Mulai

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Enable "Realtime Database"
3. Dapatkan konfigurasi Firebase dari Project Settings

### 3. Setup Environment Variables

Copy `.env.local.example` ke `.env.local`:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` dan isi dengan kredensial Firebase Anda.

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka browser: `http://localhost:3000`

## Deploy ke Vercel

### Cara Paling Mudah:

1. Push code ke GitHub
2. Import repository di [Vercel](https://vercel.com)
3. Tambahkan environment variables dari `.env.local`
4. Deploy!

### Melalui CLI:

```bash
npm install -g vercel
vercel login
vercel
```

## Checklist Setup

- [ ] Node.js 18+ terinstall
- [ ] Firebase project sudah dibuat
- [ ] Realtime Database sudah enabled
- [ ] `.env.local` sudah diisi dengan kredensial Firebase
- [ ] Dependencies sudah diinstall (`npm install`)
- [ ] Development server berjalan (`npm run dev`)
- [ ] Aplikasi bisa diakses di `http://localhost:3000`

## Troubleshooting

### Firebase connection error
- Cek apakah semua environment variables sudah benar
- Pastikan Realtime Database sudah enabled di Firebase Console
- Cek Firebase Database Rules (harus allow read/write untuk testing)

### Geolocation tidak bekerja
- Pastikan menggunakan HTTPS atau localhost
- Browser harus support Geolocation API
- User harus allow permission untuk akses lokasi

### Build error
- Jalankan `npm install` ulang
- Cek versi Node.js (minimal 18+)
- Delete folder `.next` dan `node_modules`, lalu install ulang

## Next Steps

Setelah aplikasi berjalan, Anda bisa:
1. Kustomisasi UI di `components/`
2. Ubah threshold jarak grouping di `lib/groupService.ts`
3. Tambahkan fitur baru (emoji, file upload, dll)
4. Setup Firebase Security Rules untuk production

Untuk dokumentasi lengkap, lihat [README.md](./README.md)
