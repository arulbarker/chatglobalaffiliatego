# 🎯 Langkah Selanjutnya

Saya sudah melihat file Admin SDK Anda untuk project **chatglobalaffiliatego**.

File `.env.local` sudah dibuat dengan template. Sekarang Anda perlu melengkapi konfigurasi Firebase.

## ⚠️ Penting: Perbedaan Admin SDK vs Web Config

File JSON yang Anda download (**Admin SDK**) adalah untuk **server-side** (Node.js backend).

Untuk aplikasi **web client-side** ini, kita butuh **Web Config** yang berbeda.

---

## 🚀 Langkah yang Harus Dilakukan

### 1. Enable Realtime Database

**PENTING:** Pastikan Realtime Database sudah aktif!

1. Buka: https://console.firebase.google.com/
2. Pilih project: **chatglobalaffiliatego**
3. Sidebar kiri > **Realtime Database**
4. Jika belum ada database:
   - Klik **"Create Database"**
   - Pilih region (contoh: `us-central1` atau `asia-southeast1`)
   - Security rules: **"Start in test mode"**
   - Klik **"Enable"**

### 2. Dapatkan Web Config

**Cara mendapatkan:**

1. Buka: https://console.firebase.google.com/
2. Pilih project: **chatglobalaffiliatego**
3. Klik icon ⚙️ (Settings) > **"Project settings"**
4. Scroll ke bawah ke **"Your apps"**
5. Jika belum ada Web app:
   - Klik icon **</>** (Web)
   - App nickname: `Location Chat Web`
   - Klik **"Register app"**
6. Copy konfigurasi yang muncul

Anda akan melihat:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "chatglobalaffiliatego.firebaseapp.com",
  databaseURL: "https://chatglobalaffiliatego-default-rtdb...",
  projectId: "chatglobalaffiliatego",
  storageBucket: "chatglobalaffiliatego.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3. Isi File .env.local

Buka file `.env.local` yang sudah saya buat, lalu **ganti nilai-nilai berikut:**

- `NEXT_PUBLIC_FIREBASE_API_KEY` → Ganti dengan `apiKey` dari Web Config
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL` → Ganti dengan `databaseURL` (cek di Realtime Database)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` → Ganti dengan `messagingSenderId`
- `NEXT_PUBLIC_FIREBASE_APP_ID` → Ganti dengan `appId`

**Nilai yang lain kemungkinan sudah benar** (authDomain, projectId, storageBucket).

### 4. Cek Konfigurasi

Jalankan script checker:

```bash
npm run check-env
```

Script ini akan mengecek apakah `.env.local` sudah diisi dengan benar.

### 5. Jalankan Aplikasi

Jika semua OK:

```bash
npm run dev
```

Buka browser: **http://localhost:3000**

### 6. Test Aplikasi

1. Masukkan nama dan lokasi
2. Klik "Deteksi Lokasi Otomatis" atau input manual
3. Klik "Bergabung ke Chat"
4. Kirim pesan
5. Cek Firebase Console > Realtime Database, seharusnya ada data baru!

---

## 📚 Dokumentasi Lengkap

Jika butuh bantuan lebih detail:

- **GET_WEB_CONFIG.md** - Panduan lengkap cara mendapatkan Web Config
- **FIREBASE_SETUP.md** - Panduan setup Firebase detail
- **SETUP.md** - Quick setup guide
- **README.md** - Dokumentasi lengkap aplikasi

---

## ❓ Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
→ API Key salah. Cek lagi di Firebase Console.

### Error: "Permission denied"
→ Realtime Database belum di-enable atau rules terlalu strict.
→ Solusi: Enable dengan "test mode"

### Error: Database URL tidak valid
→ Cek Database URL di Firebase Console > Realtime Database
→ Bisa berbeda tergantung region:
  - US: `https://PROJECT_ID-default-rtdb.firebaseio.com`
  - Asia: `https://PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app`

---

## 📞 Bantuan

Jika masih ada masalah, screenshot error dan cek:
1. Firebase Console > Realtime Database (sudah enable?)
2. `.env.local` (semua nilai sudah diisi?)
3. Browser console (ada error message?)

---

**Next:** Setelah semua OK, baca **README.md** untuk cara deploy ke Vercel!
