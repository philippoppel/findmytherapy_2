type Coordinates = { lat: number; lng: number };

const normalizeCityKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\u00e4/g, "ae")
    .replace(/\u00f6/g, "oe")
    .replace(/\u00fc/g, "ue")
    .replace(/\u00df/g, "ss")
    .replace(/\s+/g, " ");

const cityCoordinates: Record<string, Coordinates> = {
  "amstetten": { lat: 48.12033, lng: 14.87524 },
  "baden": { lat: 48.00767, lng: 16.23437 },
  "braunau": { lat: 48.25342, lng: 13.03979 },
  "bregenz": { lat: 47.50258, lng: 9.74729 },
  "dornbirn": { lat: 47.41364, lng: 9.74238 },
  "feldkirch": { lat: 47.23757, lng: 9.59817 },
  "graz": { lat: 47.07087, lng: 15.43828 },
  "hallein": { lat: 47.68215, lng: 13.09563 },
  "innsbruck": { lat: 47.26543, lng: 11.39277 },
  "kapfenberg": { lat: 47.44055, lng: 15.29017 },
  "klagenfurt": { lat: 46.62394, lng: 14.3076 },
  "klosterneuburg": { lat: 48.30499, lng: 16.32376 },
  "krems": { lat: 48.41084, lng: 15.60037 },
  "kufstein": { lat: 47.583, lng: 12.16921 },
  "leoben": { lat: 47.38051, lng: 15.09478 },
  "leonding": { lat: 48.27933, lng: 14.24875 },
  "linz": { lat: 48.30591, lng: 14.2862 },
  "moedling": { lat: 48.08559, lng: 16.28335 },
  "salzburg": { lat: 47.79813, lng: 13.04648 },
  "schwechat": { lat: 48.105, lng: 16.5849 },
  "st. poelten": { lat: 48.2044, lng: 15.62291 },
  "steyr": { lat: 48.039, lng: 14.41913 },
  "stockerau": { lat: 48.38461, lng: 16.20763 },
  "traiskirchen": { lat: 48.01389, lng: 16.29523 },
  "traun": { lat: 48.22144, lng: 14.23681 },
  "villach": { lat: 46.61673, lng: 13.85003 },
  "wels": { lat: 48.15655, lng: 14.02438 },
  "wien": { lat: 48.20835, lng: 16.3725 },
  "wiener neustadt": { lat: 47.81318, lng: 16.24412 },
  "wolfsberg": { lat: 46.83906, lng: 14.84521 }
};

export const getCityCoordinates = (value: string) => cityCoordinates[normalizeCityKey(value)];
