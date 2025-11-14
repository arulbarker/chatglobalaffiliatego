import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0 && typeof window !== 'undefined') {
  console.error(
    '❌ Missing Firebase environment variables:',
    missingEnvVars.join(', ')
  );
}

// Initialize Firebase only if all required variables are present
let app: FirebaseApp | undefined;
let database: Database | undefined;
let initError: Error | undefined;

try {
  if (missingEnvVars.length === 0) {
    console.log('🔄 Initializing Firebase...');
    console.log('📍 Database URL:', process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    database = getDatabase(app);

    console.log('✅ Firebase initialized successfully');
    console.log('✅ Database instance created');
  } else if (typeof window === 'undefined') {
    console.warn('⚠️ Firebase not initialized: Missing environment variables during build');
  }
} catch (error: any) {
  console.error('❌ Error initializing Firebase:', error);
  initError = error;

  if (typeof window !== 'undefined') {
    console.error('🔍 Firebase Config:', {
      hasApiKey: !!firebaseConfig.apiKey,
      hasAuthDomain: !!firebaseConfig.authDomain,
      hasDatabaseURL: !!firebaseConfig.databaseURL,
      hasProjectId: !!firebaseConfig.projectId,
    });

    if (error.message?.includes('database')) {
      console.error(
        '⚠️ Database initialization failed! ' +
        'Pastikan Realtime Database sudah di-enable di Firebase Console.'
      );
    }
  }
}

export { app, database, initError };
