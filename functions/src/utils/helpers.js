const capitaliseString = string =>
  string
    .split(/\s|-/)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

const distanceBetweenCoords = (from, to, dp = 2) => {
  const earthRadius = 3958; // mi
  x1 = parseFloat(from.lat);
  x2 = parseFloat(to.lat);
  y1 = parseFloat(from.lng);
  y2 = parseFloat(to.lng);

  toRad = num => (num * Math.PI) / 180;
  const dx = toRad(x2 - x1);
  const dy = toRad(y2 - y1);
  var x1 = toRad(x1);
  var x2 = toRad(x2);

  const a =
    Math.sin(dx / 2) * Math.sin(dx / 2) +
    Math.sin(dy / 2) * Math.sin(dy / 2) * Math.cos(x1) * Math.cos(x2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;

  return Math.round(d * Math.pow(10, dp)) / Math.pow(10, dp);
};

module.exports = { capitaliseString, distanceBetweenCoords };
