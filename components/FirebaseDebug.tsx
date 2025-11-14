"use client";

import { useEffect, useState } from "react";
import { database, initError } from "@/lib/firebase";

export default function FirebaseDebug() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [dbStatus, setDbStatus] = useState<string>('checking...');

  useEffect(() => {
    // Check all Firebase env vars
    const vars = {
      'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'MISSING',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'MISSING',
      'NEXT_PUBLIC_FIREBASE_DATABASE_URL': process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'MISSING',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'MISSING',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'MISSING',
      'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'MISSING',
    };
    setEnvVars(vars);

    // Check database status
    if (initError) {
      setDbStatus(`❌ Init Error: ${initError.message}`);
    } else if (database) {
      setDbStatus('✅ Database OK');
    } else {
      setDbStatus('❌ Database is undefined');
    }
  }, []);

  const allPresent = Object.values(envVars).every(v => v !== 'MISSING');
  const isHealthy = allPresent && database && !initError;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-xs font-mono">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm">🔧 Firebase Debug</h3>
        <span className={`px-2 py-1 rounded text-white text-xs ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}>
          {isHealthy ? 'OK' : 'ERROR'}
        </span>
      </div>

      {/* Database Status */}
      <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
        <div className="font-bold text-blue-800">Database Status:</div>
        <div className={`text-xs ${database && !initError ? 'text-green-600' : 'text-red-600'}`}>
          {dbStatus}
        </div>
      </div>

      <div className="space-y-1 max-h-60 overflow-auto">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="border-b border-gray-200 pb-1">
            <div className="font-semibold text-gray-700 truncate">{key}</div>
            <div className={`truncate ${value === 'MISSING' ? 'text-red-600 font-bold' : 'text-green-600'}`}>
              {value === 'MISSING' ? '❌ MISSING' : `✅ ${value.substring(0, 30)}...`}
            </div>
          </div>
        ))}
      </div>

      {!isHealthy && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-300 rounded text-yellow-800">
          <strong>⚠️ Action Required:</strong>
          {!allPresent && <p className="mt-1 text-xs">Missing env vars - check Vercel settings</p>}
          {allPresent && !database && (
            <p className="mt-1 text-xs">
              <strong>Enable Realtime Database di Firebase Console:</strong><br/>
              1. Buka console.firebase.google.com<br/>
              2. Pilih project: chatglobalaffiliatego<br/>
              3. Realtime Database → Create Database<br/>
              4. Set rules ke "test mode"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
