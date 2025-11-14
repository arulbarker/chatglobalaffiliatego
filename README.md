# Location Chat App

Aplikasi chatgroup berbasis web yang secara otomatis mengelompokkan user berdasarkan lokasi mereka. User dapat chat secara realtime dengan orang-orang di lokasi yang sama atau terdekat.

## Fitur Utama

- **Auto-grouping berdasarkan lokasi**: User secara otomatis dimasukkan ke chatgroup berdasarkan lokasi yang sama atau dalam radius 50km
- **Deteksi lokasi otomatis**: Menggunakan HTML5 Geolocation API untuk mendeteksi lokasi user
- **Input lokasi manual**: User bisa memasukkan lokasi secara manual jika deteksi otomatis gagal
- **Realtime messaging**: Chat realtime menggunakan Firebase Realtime Database
- **Chat history**: Pesan disimpan per group, jadi user bisa melihat history saat join ulang
- **Responsive UI**: Interface yang clean dan responsive

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Firebase Realtime Database
- **Deployment**: Vercel

## Setup Lokal

### 1. Prerequisites

Pastikan sudah terinstall:
- Node.js 18+ dan npm
- Akun Firebase (gratis)
- Git (optional)

### 2. Clone atau Download Project

```bash
cd location-chat-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Firebase

#### a. Buat Firebase Project

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambahkan project"
3. Ikuti wizard setup (nama project, analytics, dll)

#### b. Enable Realtime Database

1. Di Firebase Console, pilih project Anda
2. Klik "Realtime Database" di menu sidebar
3. Klik "Create Database"
4. Pilih lokasi (pilih yang paling dekat dengan user Anda)
5. Pilih "Start in test mode" untuk development (PENTING: Ubah ke production rules sebelum deploy production!)

#### c. Setup Database Rules (Optional - untuk production)

Di Firebase Console > Realtime Database > Rules, gunakan rules berikut:

```json
{
  "rules": {
    "groups": {
      ".read": true,
      ".write": true,
      "$groupId": {
        ".validate": "newData.hasChildren(['id', 'location', 'memberCount', 'createdAt'])"
      }
    },
    "messages": {
      ".read": true,
      ".write": true,
      "$messageId": {
        ".validate": "newData.hasChildren(['id', 'groupId', 'userName', 'text', 'timestamp'])"
      }
    }
  }
}
```

#### d. Dapatkan Firebase Config

1. Di Firebase Console, klik icon gear (⚙️) > Project settings
2. Scroll ke bawah ke bagian "Your apps"
3. Klik icon web (</>)
4. Daftarkan app (beri nama, tidak perlu Firebase Hosting)
5. Copy konfigurasi Firebase (apiKey, authDomain, dll)

### 5. Setup Environment Variables

1. Copy file `.env.local.example` menjadi `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` dan isi dengan kredensial Firebase Anda:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 6. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: `http://localhost:3000`

## Deployment ke Vercel

### 1. Push ke Git Repository (GitHub/GitLab/Bitbucket)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy ke Vercel

#### Option A: Melalui Vercel Dashboard

1. Kunjungi [vercel.com](https://vercel.com)
2. Sign up/login dengan GitHub/GitLab/Bitbucket
3. Klik "Add New Project"
4. Import repository Anda
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Tambahkan Environment Variables:
   - Klik "Environment Variables"
   - Copy semua variable dari `.env.local`
   - Paste satu per satu (Key dan Value)
7. Klik "Deploy"

#### Option B: Melalui Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Ikuti prompt dan tambahkan environment variables saat diminta.

### 3. Setup Environment Variables di Vercel

Jika belum ditambahkan saat deployment:

1. Buka project di Vercel Dashboard
2. Klik "Settings" > "Environment Variables"
3. Tambahkan semua variable dari `.env.local`
4. Klik "Save"
5. Redeploy project (Settings > Deployments > klik titik tiga > Redeploy)

## Struktur Project

```
location-chat-app/
├── app/
│   ├── globals.css          # Global styles dengan Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage dengan login/chat logic
├── components/
│   ├── LoginForm.tsx        # Form login dengan deteksi lokasi
│   └── ChatRoom.tsx         # Interface chat realtime
├── lib/
│   ├── firebase.ts          # Firebase configuration
│   ├── locationService.ts   # Service untuk deteksi lokasi
│   ├── groupService.ts      # Service untuk group matching
│   └── chatService.ts       # Service untuk realtime chat
├── types/
│   └── index.ts             # TypeScript type definitions
├── .env.local.example       # Template environment variables
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Cara Kerja Aplikasi

### 1. User Login
- User memasukkan nama
- User bisa deteksi lokasi otomatis (menggunakan Geolocation API) atau input manual
- Jika deteksi otomatis, app akan mendapatkan koordinat lat/long dan reverse geocoding untuk nama lokasi

### 2. Group Matching
- App mencari existing group dengan lokasi yang sama atau dalam radius 50km
- Jika ada koordinat GPS, matching menggunakan Haversine formula untuk menghitung jarak
- Jika hanya nama lokasi (manual input), matching berdasarkan nama yang dinormalisasi
- Jika tidak ada group yang cocok, buat group baru

### 3. Realtime Chat
- User masuk ke chatroom group mereka
- Semua pesan dikirim ke Firebase Realtime Database
- Firebase secara otomatis sync pesan ke semua user di group yang sama
- Chat history disimpan di database

### 4. Chat History
- Saat user join ulang dengan lokasi yang sama, mereka akan masuk ke group yang sama
- History pesan otomatis dimuat (limit 100 pesan terakhir)

## Kustomisasi

### Mengubah Threshold Jarak

Edit `lib/groupService.ts`:

```typescript
const DISTANCE_THRESHOLD_KM = 50; // Ubah nilai ini
```

### Mengubah Limit Chat History

Edit `lib/chatService.ts`:

```typescript
export const subscribeToMessages = (
  groupId: string,
  callback: (messages: Message[]) => void,
  limit: number = 100  // Ubah nilai default
)
```

### Mengubah Reverse Geocoding Provider

Saat ini menggunakan Nominatim (OpenStreetMap). Bisa diganti dengan:
- Google Maps Geocoding API
- Mapbox Geocoding API
- Atau provider lain

Edit `lib/locationService.ts` di function `getLocationName`.

## Troubleshooting

### Geolocation tidak bekerja
- Pastikan menggunakan HTTPS (atau localhost untuk development)
- Browser harus support Geolocation API
- User harus memberikan permission untuk akses lokasi

### Pesan tidak realtime
- Cek Firebase Realtime Database rules (harus allow read/write)
- Cek koneksi internet
- Cek Firebase Database URL di environment variables

### Build error di Vercel
- Pastikan semua environment variables sudah ditambahkan
- Cek logs di Vercel untuk error detail
- Pastikan `package.json` dependencies sudah benar

## Security Notes

**PENTING untuk Production:**

1. **Firebase Security Rules**: Ubah dari "test mode" ke production rules dengan validasi proper
2. **API Keys**: Meskipun Firebase API keys aman di frontend, pastikan setup Firebase App Check untuk keamanan ekstra
3. **Rate Limiting**: Implementasi rate limiting untuk prevent spam
4. **Input Validation**: Validasi semua input user di backend
5. **Environment Variables**: Jangan commit `.env.local` ke git

## Lisensi

MIT License - bebas digunakan untuk project personal maupun komersial.

## Support

Jika ada pertanyaan atau issue, silakan buat issue di repository ini.

---

Dibuat dengan Next.js, Firebase, dan Tailwind CSS
