import type { AvailabilitySlot, TimeOfDay } from "./types";
import { getCityCoordinates } from "./data/geo";

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const parseDistrictNumber = (district: string) => {
  const match = district.match(/^(\d+)/);
  return match ? Number(match[1]) : 0;
};

const toRadians = (value: number) => (value * Math.PI) / 180;

const haversineDistanceKm = (from: { lat: number; lng: number }, to: { lat: number; lng: number }) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadiusKm * c * 10) / 10;
};

export const districtDistanceKm = (fromDistrict: string, toDistrict: string) => {
  const fromGeo = getCityCoordinates(fromDistrict);
  const toGeo = getCityCoordinates(toDistrict);
  if (fromGeo && toGeo) {
    return haversineDistanceKm(fromGeo, toGeo);
  }
  const from = parseDistrictNumber(fromDistrict);
  const to = parseDistrictNumber(toDistrict);
  if (!from || !to) return 0;
  const base = Math.abs(from - to);
  return Math.round((base * 1.2 + 1.5) * 10) / 10;
};

export const formatDistance = (distanceKm: number) => `ca. ${distanceKm} km`;

export const formatSetting = (setting: Array<"online" | "praxis">) => {
  if (setting.length === 2) return "Online + Praxis";
  if (setting[0] === "online") return "Online";
  return "Praxis";
};

export const formatInsurance = (kasse: boolean) => (kasse ? "Kasse möglich" : "Privat/Selbstzahlung");

export const normalizePhotoSrc = (value?: string) => {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "/therapist-placeholder.svg";
  if (trimmed.startsWith("/") || trimmed.startsWith("http")) return trimmed;
  return `/${trimmed}`;
};

const timeOrder: Record<TimeOfDay, number> = {
  Vormittag: 1,
  Nachmittag: 2,
  Abend: 3
};

export const formatAvailability = (availability: AvailabilitySlot[]) => {
  if (!availability.length) return "Keine Angabe";
  const grouped: Record<string, TimeOfDay[]> = {};
  availability.forEach((slot) => {
    if (!grouped[slot.day]) grouped[slot.day] = [];
    grouped[slot.day].push(slot.time);
  });
  const parts = Object.entries(grouped)
    .map(([day, times]) => {
      const sorted = [...new Set(times)].sort((a, b) => timeOrder[a] - timeOrder[b]);
      return `${day} (${sorted.join(", ")})`;
    })
    .sort();
  return parts.join(" | ");
};

export const formatAvailabilityCoverage = (availability: {
  coverage: number;
  matched: number;
  requested: number;
}) => {
  if (availability.requested === 0) return "Zeitfenster: flexibel";
  return `Zeitfenster: ${availability.matched}/${availability.requested}`;
};

export const unique = <T,>(values: T[]) => Array.from(new Set(values));
