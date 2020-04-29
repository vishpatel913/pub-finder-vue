import { distanceBetweenCoords, bearingBetweenCoords, timeToWalkDistance } from './'

const start = { lat: 51.458914, lng: - 0.1691457 };
const finish = { lat: 51.4607359, lng: -0.1641117 };

describe('distanceBetweenCoords', () => {
  it('should retrun a vaguely correct distance between two coords', () => {
    const distance = distanceBetweenCoords(start, finish)
    expect(distance).toBeGreaterThan(350)
    expect(distance).toBeLessThan(450)
  });
});

describe('bearingBetweenCoords', () => {
  it('should retrun a vaguely correct bearing between two coords', () => {
    const bearing = bearingBetweenCoords(start, finish)
    expect(bearing).toBeGreaterThan(40)
    expect(bearing).toBeLessThan(60)
  });
});

describe('timeToWalkDistance', () => {
  it('should retrun a vaguely correct walking time for a distance', () => {
    const duration = timeToWalkDistance(400)
    expect(duration).toBeGreaterThan(240)
    expect(duration).toBeLessThan(300)
  });
});