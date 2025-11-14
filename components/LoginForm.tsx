"use client";

import { useState } from "react";
import { detectLocation, getLocationName } from "@/lib/locationService";
import { findOrCreateGroup } from "@/lib/groupService";

interface LoginFormProps {
  onLogin: (user: { name: string; location: string; groupId: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [useManual, setUseManual] = useState(false);

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    setError("");

    try {
      const position = await detectLocation();
      const { latitude, longitude } = position.coords;

      const locationName = await getLocationName(latitude, longitude);
      setLocation(locationName);
      setUseManual(false);
    } catch (err: any) {
      setError(
        err.message || "Gagal mendeteksi lokasi. Silakan masukkan manual."
      );
      setUseManual(true);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !location.trim()) {
      setError("Nama dan lokasi harus diisi");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let latitude: number | undefined;
      let longitude: number | undefined;

      // Jika menggunakan deteksi otomatis, ambil koordinat
      if (!useManual) {
        try {
          const position = await detectLocation();
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        } catch (err) {
          console.warn("Gagal mendapatkan koordinat:", err);
        }
      }

      // Cari atau buat group berdasarkan lokasi
      const groupId = await findOrCreateGroup(location, latitude, longitude);

      onLogin({
        name: name.trim(),
        location: location.trim(),
        groupId,
      });
    } catch (err: any) {
      setError(err.message || "Gagal bergabung ke chatroom");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Location Chat
        </h1>
        <p className="text-gray-600">
          Chat dengan orang-orang di lokasi yang sama
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            disabled={isLoading}
          />
        </div>

        {/* Location Input */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Lokasi
          </label>

          <div className="space-y-3">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Masukkan lokasi atau deteksi otomatis"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isLoading || isDetecting}
            />

            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetecting || isLoading}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isDetecting ? (
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
                  Mendeteksi Lokasi...
                </span>
              ) : (
                "🌍 Deteksi Lokasi Otomatis"
              )}
            </button>
          </div>
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
          disabled={isLoading || isDetecting}
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
            "Bergabung ke Chat"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Anda akan bergabung ke chatroom dengan orang-orang di lokasi yang
          sama
        </p>
      </div>
    </div>
  );
}
