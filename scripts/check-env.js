#!/usr/bin/env node

/**
 * Script untuk mengecek apakah .env.local sudah diisi dengan benar
 * Usage: node scripts/check-env.js
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

console.log('🔍 Checking Firebase configuration...\n');

// Check if .env.local exists
if (!fs.existsSync(envPath)) {
  console.error('❌ File .env.local tidak ditemukan!');
  console.log('\n📝 Langkah-langkah:');
  console.log('1. Copy .env.local.example menjadi .env.local');
  console.log('2. Isi dengan kredensial Firebase Anda');
  console.log('3. Baca panduan di GET_WEB_CONFIG.md\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const envVars = {};
let hasError = false;

// Parse environment variables
envLines.forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

// Check each required variable
console.log('📋 Checking required variables:\n');

requiredVars.forEach((varName) => {
  const value = envVars[varName];

  if (!value) {
    console.log(`❌ ${varName}: MISSING`);
    hasError = true;
  } else if (value.includes('YOUR_') || value.includes('_HERE')) {
    console.log(`⚠️  ${varName}: NOT CONFIGURED (masih placeholder)`);
    hasError = true;
  } else {
    // Additional validation
    let isValid = true;
    let warning = '';

    if (varName === 'NEXT_PUBLIC_FIREBASE_API_KEY') {
      if (!value.startsWith('AIza')) {
        isValid = false;
        warning = ' (API Key biasanya dimulai dengan "AIza")';
      }
    }

    if (varName === 'NEXT_PUBLIC_FIREBASE_DATABASE_URL') {
      if (!value.startsWith('https://')) {
        isValid = false;
        warning = ' (Database URL harus dimulai dengan "https://")';
      }
    }

    if (varName === 'NEXT_PUBLIC_FIREBASE_APP_ID') {
      if (!value.includes(':web:')) {
        isValid = false;
        warning = ' (App ID biasanya berisi ":web:")';
      }
    }

    if (isValid) {
      console.log(`✅ ${varName}: OK`);
    } else {
      console.log(`⚠️  ${varName}: ${value}${warning}`);
      hasError = true;
    }
  }
});

console.log('\n' + '='.repeat(60) + '\n');

if (hasError) {
  console.error('❌ Konfigurasi Firebase belum lengkap!\n');
  console.log('📚 Baca panduan lengkap di: GET_WEB_CONFIG.md');
  console.log('🔗 Atau buka: https://console.firebase.google.com/\n');
  console.log('Langkah-langkah:');
  console.log('1. Buka Firebase Console');
  console.log('2. Pilih project "chatglobalaffiliatego"');
  console.log('3. Settings > Project settings > Your apps > Web');
  console.log('4. Copy semua nilai ke .env.local\n');
  process.exit(1);
} else {
  console.log('✅ Semua konfigurasi Firebase sudah lengkap!\n');
  console.log('🚀 Jalankan aplikasi dengan: npm run dev\n');
  process.exit(0);
}
