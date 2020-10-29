import { getDuration } from '@/utils/datetime';
import { DateTime } from 'luxon';

const getISOFromTime = (hours, minutes) => DateTime.fromObject({ hours, minutes }).toISO();

describe('getDuration', () => {
  const testFrom = getISOFromTime(16, 20);

  it('should return multiple hours and round down when applicable', () => {
    const result = getDuration(testFrom, getISOFromTime(22, 30));
    expect(result).toEqual(expect.objectContaining({ value: 6, unit: 'hours' }));
  });

  it('should return multiple hours and round up when applicable', () => {
    const result = getDuration(testFrom, getISOFromTime(23, 0));
    expect(result).toEqual(expect.objectContaining({ value: 7, unit: 'hours' }));
  });

  it('should return one hour', () => {
    const result = getDuration(testFrom, getISOFromTime(17, 30));
    expect(result).toEqual(expect.objectContaining({ value: 1, unit: 'hour' }));
  });

  it('should return minutes in as a multiple of ten round down when applicable', () => {
    const result = getDuration(testFrom, getISOFromTime(17, 1));
    expect(result).toEqual(expect.objectContaining({ value: 40, unit: 'minutes' }));
  });

  it('should return minutes in as a multiple of ten round up when applicable', () => {
    const result = getDuration(testFrom, getISOFromTime(17, 9));
    expect(result).toEqual(expect.objectContaining({ value: 50, unit: 'minutes' }));
  });

  it('should handle next day correctly', () => {
    const result = getDuration(testFrom, getISOFromTime(0, 30));
    expect(result).toEqual(expect.objectContaining({ value: 8, unit: 'hours' }));
  });
});
