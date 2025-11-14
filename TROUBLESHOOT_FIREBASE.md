# 🔧 Troubleshooting: Firebase Database Not Initialized

## ❌ Error yang Anda Alami

```
Firebase database is not initialized. Please check your environment variables.
```

---

## ✅ Solusi Step-by-Step

### 1. Cek Environment Variables di Vercel

**PENTING:** Environment variables HARUS ditambahkan di Vercel Dashboard!

#### Cara Cek:

1. Buka: https://vercel.com/dashboard
2. Pilih project: **chatglobalaffiliatego**
3. Klik **Settings**
4. Sidebar > **Environment Variables**
5. Pastikan ada **7 variables**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

#### Jika BELUM ADA atau ADA yang KURANG:

Tambahkan satu per satu dengan **EXACT** values ini:

```
NEXT_PUBLIC_FIREBASE_API_KEY
AIzaSyDX0YDW20HnPdpcBtCxIwTAZCYcVAJQHRA

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
chatglobalaffiliatego.firebaseapp.com

NEXT_PUBLIC_FIREBASE_DATABASE_URL
https://chatglobalaffiliatego-default-rtdb.asia-southeast1.firebasedatabase.app

NEXT_PUBLIC_FIREBASE_PROJECT_ID
chatglobalaffiliatego

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
chatglobalaffiliatego.firebasestorage.app

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
1084571943058

NEXT_PUBLIC_FIREBASE_APP_ID
1:1084571943058:web:26870875dcc84bb9aa264b
```

**PENTING:**
- Centang: ✅ Production ✅ Preview ✅ Development
- Pastikan tidak ada spasi di awal/akhir value
- Key harus PERSIS seperti di atas (case-sensitive!)

### 2. Redeploy Setelah Menambahkan Env Vars

Setelah menambahkan semua environment variables:

1. Tab **"Deployments"**
2. Klik deployment terakhir
3. Klik titik tiga **"..."**
4. Pilih **"Redeploy"**
5. **UNCHECK** "Use existing Build Cache"
6. Klik **"Redeploy"**

Build akan memakan waktu 2-3 menit.

### 3. Verify di Production

Setelah deployment selesai:

1. Buka URL production Anda
2. Buka **Developer Tools** (F12)
3. Tab **"Console"**

**Jika masih error:**
```
❌ Missing Firebase environment variables: ...
❌ Firebase database is not initialized
```
→ Environment variables belum ter-load. Redeploy lagi dengan force (uncheck cache).

**Jika sudah OK:**
```
✅ No error messages
✅ Form login muncul normal
✅ Bisa pilih nama dan lokasi
```

---

## 🔍 Debug Checklist

### A. Cek Environment Variables di Vercel

- [ ] Ada 7 environment variables
- [ ] Semua Key ditulis dengan BENAR (case-sensitive)
- [ ] Semua Value tidak ada typo
- [ ] Semua dipilih untuk Production, Preview, Development
- [ ] Tidak ada spasi di awal/akhir value

### B. Cek Firebase Console

1. Buka: https://console.firebase.google.com/
2. Pilih project: **chatglobalaffiliatego**
3. Sidebar > **Realtime Database**
4. Pastikan database sudah **enabled** (ada data atau empty tapi active)
5. Cek **Database URL** di bagian atas:
   - Harus match dengan `NEXT_PUBLIC_FIREBASE_DATABASE_URL` di Vercel
   - Format: `https://chatglobalaffiliatego-default-rtdb.asia-southeast1.firebasedatabase.app`

### C. Cek Database Rules

Di Firebase Console > Realtime Database > **Rules**:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Jika rules berbeda:**
1. Copy rules di atas
2. Paste ke editor
3. Klik **"Publish"**

⚠️ Ini rules untuk testing. Untuk production, gunakan rules yang lebih strict.

---

## 🐛 Common Issues

### Issue 1: "Permission Denied"

**Penyebab:** Database rules terlalu strict atau database belum enabled.

**Solusi:**
1. Enable Realtime Database di Firebase Console
2. Set rules ke test mode (lihat Database Rules di atas)
3. Redeploy Vercel

### Issue 2: "Database URL not found"

**Penyebab:** Database URL salah atau typo.

**Solusi:**
1. Cek Database URL di Firebase Console
2. Copy URL yang benar
3. Update `NEXT_PUBLIC_FIREBASE_DATABASE_URL` di Vercel
4. Pastikan URL include region: `asia-southeast1`
5. Redeploy

### Issue 3: "Invalid API Key"

**Penyebab:** API Key salah atau typo.

**Solusi:**
1. Firebase Console > Project Settings > Web app
2. Copy API Key yang benar
3. Update `NEXT_PUBLIC_FIREBASE_API_KEY` di Vercel
4. Redeploy

### Issue 4: Environment Variables Tidak Ter-load

**Penyebab:** Vercel cache issue.

**Solusi:**
1. Redeploy dengan **UNCHECK** "Use existing Build Cache"
2. Atau delete deployment dan deploy ulang
3. Clear browser cache
4. Test di incognito/private window

---

## 🎯 Quick Test

Setelah fix, test dengan cara ini:

1. **Buka URL production**
2. **Open Developer Tools (F12) > Console**
3. **Cek error messages:**
   - Jika ada error "Firebase...", berarti env vars belum OK
   - Jika tidak ada error, coba login

4. **Test login:**
   - Masukkan nama: "Test"
   - Pilih lokasi: "Jakarta"
   - Klik "Mulai Chat Global"
   - Jika berhasil, Anda akan masuk ke chatroom

5. **Test chat:**
   - Ketik pesan: "Hello"
   - Klik "Kirim"
   - Jika berhasil, pesan akan muncul

6. **Verify di Firebase:**
   - Buka Firebase Console > Realtime Database
   - Lihat data di `groups/` dan `messages/`
   - Jika ada data, berarti sukses!

---

## 📞 Jika Masih Bermasalah

1. **Screenshot:**
   - Vercel environment variables page
   - Browser console errors
   - Firebase Console Realtime Database page

2. **Verify lagi:**
   - Setiap character di environment variables
   - Tidak ada spasi hidden
   - Key exact match (case-sensitive)

3. **Force Redeploy:**
   - Delete all deployments
   - Redeploy from scratch
   - Clear browser cache

4. **Test Local:**
   - File `.env.local` lokal sudah OK?
   - `npm run dev` di lokal jalan?
   - Jika lokal jalan tapi production tidak, 100% masalah di Vercel env vars

---

## ✅ Success Indicators

Aplikasi berhasil jika:
- ✅ Tidak ada error di browser console
- ✅ Form login muncul dengan dropdown lokasi
- ✅ Bisa login tanpa error
- ✅ Bisa kirim dan terima pesan realtime
- ✅ Data muncul di Firebase Console

---

**Remember:** Environment variables adalah kunci utama. Pastikan benar 100%!
