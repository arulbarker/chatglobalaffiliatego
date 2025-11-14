# Cara Mendapatkan Firebase Web Config

File `.env.local` sudah dibuat dengan template. Sekarang Anda perlu mengisi nilai-nilai yang benar dari Firebase Console.

## Step 1: Buka Firebase Console

1. Kunjungi: https://console.firebase.google.com/
2. Login dengan akun Google Anda
3. Pilih project: **chatglobalaffiliatego**

## Step 2: Enable Realtime Database (PENTING!)

Sebelum mendapatkan config, pastikan Realtime Database sudah aktif:

1. Di sidebar kiri, cari menu **"Realtime Database"** (di bawah Build)
2. Jika belum ada database:
   - Klik **"Create Database"**
   - Pilih lokasi server (contoh: `us-central1`, `asia-southeast1`, dll)
   - Security rules: Pilih **"Start in test mode"**
   - Klik **"Enable"**

**Catat Database URL** yang muncul (contoh: `https://chatglobalaffiliatego-default-rtdb.firebaseio.com`)

## Step 3: Dapatkan Web Config

### 3a. Buka Project Settings

1. Klik icon **⚙️** (gear/settings) di sidebar kiri atas
2. Pilih **"Project settings"**

### 3b. Cari "Your apps"

1. Scroll ke bawah sampai ke bagian **"Your apps"**
2. Cek apakah sudah ada Web app (icon `</>`):
   - **Jika SUDAH ADA**: Klik web app yang ada, lalu scroll ke bawah cari **"SDK setup and configuration"**, pilih **"Config"**
   - **Jika BELUM ADA**: Lanjut ke step 3c

### 3c. Register Web App (jika belum ada)

1. Klik icon **</>** (Web icon)
2. Isi form:
   - **App nickname**: `Location Chat Web` (atau nama lain)
   - **Firebase Hosting**: JANGAN dicentang (kita pakai Vercel)
3. Klik **"Register app"**

### 3d. Copy Configuration

Anda akan melihat kode seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",                                    // ← Copy ini
  authDomain: "chatglobalaffiliatego.firebaseapp.com",         // ← Copy ini
  databaseURL: "https://chatglobalaffiliatego-default-rtdb...", // ← Copy ini
  projectId: "chatglobalaffiliatego",                          // ← Sudah benar
  storageBucket: "chatglobalaffiliatego.appspot.com",          // ← Copy ini
  messagingSenderId: "123456789012",                           // ← Copy ini
  appId: "1:123456789012:web:abc123def456"                     // ← Copy ini
};
```

## Step 4: Isi File .env.local

Buka file `.env.local` di folder `location-chat-app`, lalu ganti nilai-nilai berikut:

```env
# Ganti dengan apiKey dari Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123...

# Biasanya sudah benar, tapi cek lagi
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=chatglobalaffiliatego.firebaseapp.com

# PENTING: Database URL bisa berbeda tergantung region!
# Cek di Realtime Database atau di Web Config
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://chatglobalaffiliatego-default-rtdb.firebaseio.com

# Project ID (sudah benar)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=chatglobalaffiliatego

# Biasanya sudah benar
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=chatglobalaffiliatego.appspot.com

# Ganti dengan messagingSenderId (angka)
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012

# Ganti dengan appId
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

## Step 5: Verifikasi

Setelah mengisi `.env.local`, jalankan:

```bash
npm run dev
```

Buka browser: `http://localhost:3000`

Coba login dengan nama dan lokasi. Jika berhasil, cek Firebase Console > Realtime Database, seharusnya ada data baru.

## Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
- API Key salah atau tidak valid
- Cek lagi di Firebase Console > Project Settings

### Error: "Permission denied"
- Realtime Database belum di-enable
- Atau Database Rules terlalu strict
- Solusi: Enable Realtime Database dengan "test mode"

### Error: "Database URL not found"
- Database URL salah atau tidak valid
- Cek di Firebase Console > Realtime Database, copy URL yang benar
- Perhatikan region! (asia-southeast1, europe-west1, dll)

### Database URL untuk berbagai region:

- **US Central**: `https://PROJECT_ID-default-rtdb.firebaseio.com`
- **Asia Southeast**: `https://PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app`
- **Europe West**: `https://PROJECT_ID-default-rtdb.europe-west1.firebasedatabase.app`

Ganti `PROJECT_ID` dengan `chatglobalaffiliatego`.

---

**Setelah selesai**, kembali jalankan:
```bash
npm run dev
```

Lalu test aplikasi di `http://localhost:3000`
