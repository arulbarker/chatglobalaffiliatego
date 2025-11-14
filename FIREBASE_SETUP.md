# Firebase Setup Guide

Panduan lengkap untuk setup Firebase untuk aplikasi Location Chat.

## 1. Membuat Firebase Project

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add project"** atau **"Tambahkan project"**
3. Masukkan nama project (contoh: `location-chat-app`)
4. Google Analytics: pilih sesuai kebutuhan (optional untuk app ini)
5. Klik **"Create project"**

## 2. Enable Realtime Database

1. Di sidebar Firebase Console, cari **"Realtime Database"**
2. Klik **"Create Database"**
3. Pilih lokasi database server:
   - `us-central1` untuk US
   - `europe-west1` untuk Europe
   - `asia-southeast1` untuk Asia
4. Security Rules: Pilih **"Start in test mode"** untuk development
   - ⚠️ Test mode memberikan akses penuh selama 30 hari
   - Setelah itu atau sebelum production, update ke production rules

## 3. Mendapatkan Firebase Configuration

1. Di Firebase Console, klik icon ⚙️ (Settings) > **"Project settings"**
2. Scroll ke bawah ke bagian **"Your apps"**
3. Klik icon **</>** (Web)
4. Daftarkan app:
   - App nickname: `Location Chat Web`
   - Firebase Hosting: tidak perlu dicentang
5. Klik **"Register app"**
6. Copy konfigurasi yang muncul:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

7. Paste nilai-nilai ini ke file `.env.local`

## 4. Setup Database Rules

### Development (Test Mode)

Rules default untuk testing (sudah aktif jika pilih "test mode"):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **JANGAN** gunakan ini untuk production!

### Production Rules

Untuk production, gunakan rules dari file `firebase-rules.json`:

1. Di Firebase Console, buka **Realtime Database** > **Rules**
2. Copy isi dari `firebase-rules.json`
3. Paste ke editor rules
4. Klik **"Publish"**

Rules ini akan:
- ✅ Validasi struktur data yang benar
- ✅ Mencegah pesan terlalu panjang (max 1000 karakter)
- ✅ Memastikan data types yang benar
- ✅ Index untuk query yang efisien

## 5. Database Structure

Aplikasi akan membuat struktur database seperti ini:

```
location-chat-app-db/
├── groups/
│   └── {groupId}/
│       ├── id: string
│       ├── location: string
│       ├── latitude: number (optional)
│       ├── longitude: number (optional)
│       ├── memberCount: number
│       └── createdAt: number (timestamp)
│
└── messages/
    └── {messageId}/
        ├── id: string
        ├── groupId: string
        ├── userName: string
        ├── text: string (max 1000 chars)
        └── timestamp: number
```

## 6. Verifikasi Setup

### Test Connection

1. Jalankan app: `npm run dev`
2. Buka browser: `http://localhost:3000`
3. Masukkan nama dan lokasi
4. Klik "Bergabung ke Chat"
5. Cek Firebase Console > Realtime Database
6. Seharusnya ada data baru di `groups/` dan saat kirim pesan di `messages/`

### Check Rules

Di Firebase Console > Realtime Database > Rules, pastikan:
- Ada indexing untuk `groupId` dan `timestamp`
- Validasi data structure sudah aktif

## 7. Optional: Setup Firebase Emulator (untuk Development)

Jika ingin development tanpa koneksi Firebase Cloud:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Init Firebase:
```bash
firebase init database
```

4. Jalankan emulator:
```bash
firebase emulators:start
```

5. Update `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_DATABASE_URL=http://localhost:9000/?ns=your-project-id
```

## 8. Monitoring dan Analytics

### Realtime Database Usage

Di Firebase Console > Realtime Database > Usage:
- Monitor concurrent connections
- Database storage
- Bandwidth usage

### Free Tier Limits

Firebase Spark Plan (gratis):
- 100 concurrent connections
- 1 GB storage
- 10 GB/month bandwidth

Jika exceed, upgrade ke Blaze Plan (pay as you go).

## 9. Security Best Practices

### Environment Variables
- ✅ Jangan commit `.env.local` ke Git
- ✅ Add `.env.local` ke `.gitignore`
- ✅ Gunakan environment variables di Vercel untuk deployment

### Database Rules
- ✅ Selalu gunakan validasi di production
- ✅ Limit data size (misal max message length)
- ✅ Setup proper indexing untuk performance

### API Keys
- Firebase Web API keys aman di frontend
- Tapi untuk keamanan ekstra, setup **Firebase App Check**

### Backup
- Setup automated backups di Firebase Console
- Export data secara berkala

## Troubleshooting

### Error: "Permission denied"
- Cek Database Rules di Firebase Console
- Pastikan `.read` dan `.write` allow untuk testing
- Untuk production, pastikan rules sesuai dengan structure data

### Error: "Database URL invalid"
- Pastikan `NEXT_PUBLIC_FIREBASE_DATABASE_URL` di `.env.local` benar
- Format: `https://your-project-default-rtdb.firebaseio.com`
- Untuk Asia/Europe regions, bisa berbeda (contoh: `rtdb.asia-southeast1.firebasedatabase.app`)

### Data tidak muncul realtime
- Cek koneksi internet
- Cek Firebase Console apakah data tersimpan
- Cek browser console untuk errors
- Pastikan listener `onValue` sudah registered dengan benar

### Quota exceeded
- Cek usage di Firebase Console
- Optimize queries (gunakan indexing)
- Cleanup old data
- Upgrade ke Blaze Plan jika perlu

## Support

Dokumentasi resmi Firebase:
- [Realtime Database Guide](https://firebase.google.com/docs/database)
- [Security Rules](https://firebase.google.com/docs/database/security)
- [Best Practices](https://firebase.google.com/docs/database/usage/best-practices)

---

Setelah setup Firebase selesai, kembali ke [SETUP.md](./SETUP.md) untuk melanjutkan development.
