"use client";

import { useEffect, useState } from "react";

export default function FirebaseDebug() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

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
  }, []);

  const allPresent = Object.values(envVars).every(v => v !== 'MISSING');

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-xs font-mono">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm">🔧 Firebase Debug</h3>
        <span className={`px-2 py-1 rounded text-white text-xs ${allPresent ? 'bg-green-500' : 'bg-red-500'}`}>
          {allPresent ? 'OK' : 'ERROR'}
        </span>
      </div>

      <div className="space-y-1 max-h-80 overflow-auto">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="border-b border-gray-200 pb-1">
            <div className="font-semibold text-gray-700 truncate">{key}</div>
            <div className={`truncate ${value === 'MISSING' ? 'text-red-600 font-bold' : 'text-green-600'}`}>
              {value === 'MISSING' ? '❌ MISSING' : `✅ ${value.substring(0, 30)}...`}
            </div>
          </div>
        ))}
      </div>

      {!allPresent && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700">
          <strong>⚠️ Missing variables!</strong>
          <p className="mt-1">Check Vercel environment variables and redeploy.</p>
        </div>
      )}
    </div>
  );
}
