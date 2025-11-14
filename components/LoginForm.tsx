"use client";

import { useState } from "react";
import { findOrCreateGroup } from "@/lib/groupService";

interface LoginFormProps {
  onLogin: (user: { name: string; location: string; groupId: string }) => void;
}

// Daftar lokasi Indonesia
const LOKASI_INDONESIA = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Semarang",
  "Makassar",
  "Palembang",
  "Tangerang",
  "Depok",
  "Bekasi",
  "Batam",
  "Bogor",
  "Pekanbaru",
  "Bandar Lampung",
  "Malang",
  "Padang",
  "Denpasar",
  "Balikpapan",
  "Samarinda",
  "Banjarmasin",
  "Pontianak",
  "Manado",
  "Yogyakarta",
  "Solo",
  "Cirebon",
  "Serang",
  "Jambi",
  "Mataram",
  "Kupang",
  "Ambon",
  "Jayapura",
  "Papua",
  "Aceh",
  "Bali",
  "NTB",
  "NTT",
  "Sulawesi",
  "Kalimantan",
  "Maluku",
];

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Nama harus diisi");
      return;
    }

    if (!location) {
      setError("Pilih lokasi terlebih dahulu");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if Firebase env vars are loaded
      const hasEnvVars = Boolean(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      );

      if (!hasEnvVars) {
        throw new Error(
          "⚠️ Firebase environment variables belum ter-load. " +
          "Pastikan sudah menambahkan 7 environment variables di Vercel dan sudah REDEPLOY. " +
          "Lihat panel debug di kanan bawah untuk detail."
        );
      }

      // Cari atau buat group berdasarkan lokasi (tanpa koordinat GPS)
      const groupId = await findOrCreateGroup(location);

      onLogin({
        name: name.trim(),
        location: location,
        groupId,
      });
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Gagal bergabung ke chatroom. Periksa koneksi Firebase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Chat Global Indonesia
        </h1>
        <p className="text-gray-600">
          Bergabung dengan chatroom berdasarkan lokasi Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
            disabled={isLoading}
          />
        </div>

        {/* Location Select */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pilih Lokasi
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white"
            disabled={isLoading}
          >
            <option value="" className="text-gray-400">-- Pilih Lokasi Anda --</option>
            {LOKASI_INDONESIA.map((lok) => (
              <option key={lok} value={lok} className="text-gray-900">
                {lok}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Bergabung...
            </span>
          ) : (
            "Mulai Chat Global"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Chat global dengan orang-orang dari lokasi yang sama yang sedang online
        </p>
      </div>
    </div>
  );
}
