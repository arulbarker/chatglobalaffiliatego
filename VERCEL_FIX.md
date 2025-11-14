# 🔧 Fix Vercel Build Error

## ❌ Error yang Terjadi

```
FIREBASE FATAL ERROR: Can't determine Firebase Database URL.
Be sure to include a Project ID when calling firebase.initializeApp().
```

**Penyebab:** Environment variables belum ditambahkan di Vercel.

---

## ✅ Solusi: Tambahkan Environment Variables di Vercel

### Langkah 1: Buka Vercel Project Settings

1. Buka: https://vercel.com/dashboard
2. Pilih project: **chatglobalaffiliatego**
3. Klik tab **"Settings"**
4. Scroll ke sidebar > **"Environment Variables"**

### Langkah 2: Tambahkan 7 Environment Variables

Copy-paste satu per satu:

#### 1. NEXT_PUBLIC_FIREBASE_API_KEY
- **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
- **Value:** `AIzaSyDX0YDW20HnPdpcBtCxIwTAZCYcVAJQHRA`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 2. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- **Key:** `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- **Value:** `chatglobalaffiliatego.firebaseapp.com`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 3. NEXT_PUBLIC_FIREBASE_DATABASE_URL
- **Key:** `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- **Value:** `https://chatglobalaffiliatego-default-rtdb.asia-southeast1.firebasedatabase.app`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 4. NEXT_PUBLIC_FIREBASE_PROJECT_ID
- **Key:** `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- **Value:** `chatglobalaffiliatego`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 5. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- **Key:** `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- **Value:** `chatglobalaffiliatego.firebasestorage.app`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 6. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- **Key:** `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** `1084571943058`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 7. NEXT_PUBLIC_FIREBASE_APP_ID
- **Key:** `NEXT_PUBLIC_FIREBASE_APP_ID`
- **Value:** `1:1084571943058:web:26870875dcc84bb9aa264b`
- **Environment:** ✅ Production ✅ Preview ✅ Development

### Langkah 3: Redeploy

Setelah menambahkan semua environment variables:

1. Kembali ke tab **"Deployments"**
2. Klik deployment yang terakhir (yang failed)
3. Klik titik tiga **"..."** di kanan atas
4. Pilih **"Redeploy"**
5. Centang **"Use existing Build Cache"** (optional, untuk lebih cepat)
6. Klik **"Redeploy"**

### Langkah 4: Tunggu Build Selesai

Build akan memakan waktu 2-3 menit.

Status yang akan Anda lihat:
- ⏳ Building...
- ⏳ Deploying...
- ✅ Ready

Setelah selesai, aplikasi akan live!

---

## 📱 Quick Copy-Paste Format

Jika Anda ingin copy semua sekaligus, berikut formatnya:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDX0YDW20HnPdpcBtCxIwTAZCYcVAJQHRA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=chatglobalaffiliatego.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://chatglobalaffiliatego-default-rtdb.asia-southeast1.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=chatglobalaffiliatego
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=chatglobalaffiliatego.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1084571943058
NEXT_PUBLIC_FIREBASE_APP_ID=1:1084571943058:web:26870875dcc84bb9aa264b
```

**Note:** Sayangnya Vercel tidak support bulk import environment variables via UI. Anda harus menambahkan satu per satu.

Alternatif: Gunakan Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Paste value saat diminta
# Pilih environment: production, preview, development

# Ulangi untuk setiap variable
```

---

## 🔍 Cara Mengecek Environment Variables Sudah Benar

Setelah menambahkan semua variables:

1. Di Vercel Dashboard > Project Settings > Environment Variables
2. Pastikan ada **7 variables** dengan nama yang benar
3. Pastikan setiap variable selected untuk **Production, Preview, Development**
4. Pastikan tidak ada typo di Key atau Value

---

## 🎯 Screenshot Guide

### Menambahkan Environment Variable:

1. **Settings > Environment Variables > "Add New"**
2. **Key:** Isi dengan nama variable (contoh: `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. **Value:** Paste value dari list di atas
4. **Environment:** Centang ketiga-tiganya (Production, Preview, Development)
5. **Save**

Ulangi 7 kali untuk semua variables.

---

## 🆘 Troubleshooting

### Error Masih Muncul Setelah Redeploy

**Solusi 1:** Clear cache
- Redeploy dengan **uncheck** "Use existing Build Cache"

**Solusi 2:** Cek typo
- Pastikan Key ditulis dengan benar (case-sensitive!)
- Pastikan Value tidak ada spasi di awal/akhir

**Solusi 3:** Delete dan tambahkan ulang
- Hapus semua environment variables
- Tambahkan ulang dengan teliti

### Build Success tapi App Error di Browser

**Cek browser console:**
```
Firebase: Error (auth/invalid-api-key)
```

**Solusi:**
- Environment variables tidak ter-apply
- Pastikan variable dipilih untuk "Production"
- Force redeploy

---

## 🎉 Setelah Build Success

Aplikasi akan live di URL seperti:
```
https://chatglobalaffiliatego-xxx.vercel.app
```

Test aplikasi:
1. Buka URL production
2. Input nama & lokasi
3. Chat!

---

## 📞 Butuh Bantuan?

Jika masih ada masalah:
1. Screenshot error di Vercel
2. Screenshot environment variables settings
3. Check Firebase Console (database rules, database URL)

---

**Next:** Setelah deployment sukses, update Firebase Security Rules untuk production!
(Lihat file `FIREBASE_SETUP.md` section "Setup Database Rules")
