import { LocationData } from "@/types";

export const detectLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung oleh browser ini"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

export const getLocationName = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    // Menggunakan reverse geocoding dengan Nominatim (OpenStreetMap)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "LocationChatApp/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Gagal mendapatkan nama lokasi");
    }

    const data = await response.json();

    // Prioritaskan city, town, village, atau county
    const location =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      data.address?.state ||
      "Unknown Location";

    return location;
  } catch (error) {
    console.error("Error getting location name:", error);
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }
};

// Menghitung jarak antara dua koordinat menggunakan Haversine formula (dalam km)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius bumi dalam km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

// Normalisasi nama lokasi untuk matching
export const normalizeLocationName = (location: string): string => {
  return location
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "_");
};
