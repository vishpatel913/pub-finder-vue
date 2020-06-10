import { Coords } from '../schemas/Coords';

export const toTitleCase = (string: string): string =>
  string
    .split(/\s|-|_/)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

export const toCamelCase = (string: string): string =>
  string
    .split(/\s|-|_/)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.substring(1)))
    .join('');

// Converts from degrees to radians.
const toRad = (deg: number) => (deg * Math.PI) / 180;

// Converts from radians to degrees.
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export const distanceBetweenCoords = (from: Coords, to: Coords, dp = 2) => {
  const earthRadius = 6371000; // meters
  const x1 = parseFloat(String(from.lat));
  const x2 = parseFloat(String(to.lat));
  const y1 = parseFloat(String(from.lng));
  const y2 = parseFloat(String(to.lng));

  const dx = toRad(x2 - x1);
  const dy = toRad(y2 - y1);
  const x1r = toRad(x1);
  const x2r = toRad(x2);

  const a =
    Math.sin(dx / 2) * Math.sin(dx / 2) +
    Math.sin(dy / 2) * Math.sin(dy / 2) * Math.cos(x1r) * Math.cos(x2r);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;

  return Math.round(d * Math.pow(10, dp)) / Math.pow(10, dp);
};

export const bearingBetweenCoords = (from: Coords, to: Coords) => {
  const x1 = toRad(from.lat);
  const x2 = toRad(to.lat);
  const y1 = toRad(from.lng);
  const y2 = toRad(to.lng);

  const y = Math.sin(y2 - y1) * Math.cos(x2);
  const x =
    Math.cos(x1) * Math.sin(x2) -
    Math.sin(x1) * Math.cos(x2) * Math.cos(y2 - y1);
  const brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
};

export const timeToWalkDistance = (distance: number) => {
  const walkingSpeed = 1.4; // m/s
  const time = distance / walkingSpeed;

  return time;
};
