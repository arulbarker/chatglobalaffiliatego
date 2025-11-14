# 🔄 UPDATE: Firebase Project Baru

## ✅ Config Lokal Sudah Diupdate

Build lokal sudah berhasil dengan Firebase project baru: **affiliategochatglobal**

```
✅ Firebase initialized successfully
✅ Database instance created
```

---

## ⚠️ SEKARANG: Update Vercel Environment Variables

Anda **HARUS** update environment variables di Vercel dengan config project baru!

---

## 📋 Langkah Update Vercel

### 1. Buka Vercel Dashboard

https://vercel.com/dashboard

### 2. Pilih Project

Klik project: **chatglobalaffiliatego** (atau nama project Anda di Vercel)

### 3. Buka Environment Variables

**Settings** > **Environment Variables**

### 4. Edit/Update Semua 7 Variables

**PENTING:** Ganti semua values dengan config project baru!

#### Variable 1: NEXT_PUBLIC_FIREBASE_API_KEY
- Klik **Edit** pada variable ini
- **New Value:** `AIzaSyDffPgQfckVoLg1PR0wJue-AUB_hwPju14`
- Save

#### Variable 2: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- Klik **Edit**
- **New Value:** `affiliategochatglobal.firebaseapp.com`
- Save

#### Variable 3: NEXT_PUBLIC_FIREBASE_DATABASE_URL
- Klik **Edit**
- **New Value:** `https://affiliategochatglobal-default-rtdb.asia-southeast1.firebasedatabase.app`
- Save

#### Variable 4: NEXT_PUBLIC_FIREBASE_PROJECT_ID
- Klik **Edit**
- **New Value:** `affiliategochatglobal`
- Save

#### Variable 5: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- Klik **Edit**
- **New Value:** `affiliategochatglobal.firebasestorage.app`
- Save

#### Variable 6: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- Klik **Edit**
- **New Value:** `897957049302`
- Save

#### Variable 7: NEXT_PUBLIC_FIREBASE_APP_ID
- Klik **Edit**
- **New Value:** `1:897957049302:web:a5990e515f1363fa746a77`
- Save

---

## 5. Verify Database Enabled

**PENTING:** Pastikan Realtime Database sudah enabled di project baru!

1. Buka: https://console.firebase.google.com/
2. Pilih project: **affiliategochatglobal**
3. Sidebar > **Realtime Database**
4. Jika belum ada:
   - Klik **"Create Database"**
   - Location: **asia-southeast1**
   - Rules: **"Start in test mode"**
   - Klik **"Enable"**

Database URL harus: `https://affiliategochatglobal-default-rtdb.asia-southeast1.firebasedatabase.app`

---

## 6. Redeploy Vercel

Setelah semua 7 variables diupdate:

1. Tab **"Deployments"**
2. Klik deployment terakhir
3. Klik **"..."** (titik tiga)
4. Pilih **"Redeploy"**
5. **⚠️ UNCHECK "Use existing Build Cache"** ← PENTING!
6. Klik **"Redeploy"**

Tunggu 2-3 menit sampai build selesai.

---

## 7. Test Production App

Setelah deployment selesai:

### A. Hard Refresh Browser
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### B. Cek Debug Panel (Kanan Bawah)

Seharusnya menampilkan:
```
Database Status: ✅ Database OK

🔧 Firebase Debug       [OK]

NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ affiliategochatglobal...
```

### C. Test Login & Chat

1. Nama: "Budi"
2. Lokasi: "Jakarta"
3. Klik "Mulai Chat Global"
4. Harus berhasil masuk chatroom!
5. Kirim pesan: "Hello"
6. Pesan muncul di chat

### D. Verify di Firebase Console

1. Firebase Console > affiliategochatglobal > Realtime Database
2. Refresh halaman
3. Data muncul:
   ```
   affiliategochatglobal-default-rtdb
     ├── groups
     │   └── -NgAbC123...
     └── messages
   ```

---

## 📊 Checklist

- [ ] Buka Vercel Dashboard
- [ ] Settings > Environment Variables
- [ ] Edit NEXT_PUBLIC_FIREBASE_API_KEY → `AIzaSyDffPgQfckVoLg1PR0wJue-AUB_hwPju14`
- [ ] Edit NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN → `affiliategochatglobal.firebaseapp.com`
- [ ] Edit NEXT_PUBLIC_FIREBASE_DATABASE_URL → `https://affiliategochatglobal-default-rtdb.asia-southeast1.firebasedatabase.app`
- [ ] Edit NEXT_PUBLIC_FIREBASE_PROJECT_ID → `affiliategochatglobal`
- [ ] Edit NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET → `affiliategochatglobal.firebasestorage.app`
- [ ] Edit NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID → `897957049302`
- [ ] Edit NEXT_PUBLIC_FIREBASE_APP_ID → `1:897957049302:web:a5990e515f1363fa746a77`
- [ ] Verify Realtime Database enabled di Firebase Console
- [ ] Redeploy Vercel (UNCHECK cache)
- [ ] Tunggu build selesai (2-3 menit)
- [ ] Hard refresh browser
- [ ] Debug panel: Database Status = ✅ OK
- [ ] Test login & chat
- [ ] Done! 🎉

---

## 🎯 Summary

**Old Project:** chatglobalaffiliatego
**New Project:** affiliategochatglobal

**Status:**
- ✅ Config lokal diupdate
- ✅ Build lokal berhasil
- ⏳ Vercel env vars perlu diupdate (manual)
- ⏳ Redeploy perlu dilakukan

**Next:** Update 7 env vars di Vercel dan redeploy!

---

## 💡 Quick Copy-Paste

Untuk memudahkan, berikut values yang perlu di-paste:

```
AIzaSyDffPgQfckVoLg1PR0wJue-AUB_hwPju14
affiliategochatglobal.firebaseapp.com
https://affiliategochatglobal-default-rtdb.asia-southeast1.firebasedatabase.app
affiliategochatglobal
affiliategochatglobal.firebasestorage.app
897957049302
1:897957049302:web:a5990e515f1363fa746a77
```

Copy satu per satu sesuai urutan di Checklist!
