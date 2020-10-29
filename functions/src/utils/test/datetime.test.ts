import { filterOpenPeriods } from '../datetime';

const mockPeriods = [
  { close: { day: 0, time: '2230' }, open: { day: 0, time: '1000' } },
  { close: { day: 1, time: '2300' }, open: { day: 1, time: '1100' } },
  { close: { day: 2, time: '2300' }, open: { day: 2, time: '1100' } },
  { close: { day: 3, time: '2300' }, open: { day: 3, time: '1100' } },
  { close: { day: 4, time: '2300' }, open: { day: 4, time: '1100' } },
  { close: { day: 5, time: '2300' }, open: { day: 5, time: '1100' } },
  { close: { day: 0, time: '0300' }, open: { day: 6, time: '1000' } },
];

describe('filterOpenPeriods', () => {
  it('should return all periods when no date', () => {
    const periods = filterOpenPeriods(mockPeriods, undefined);
    expect(periods).toHaveLength(7);
  });

  it('returns a day times in the correct format', () => {
    const periods = filterOpenPeriods(mockPeriods, undefined);
    expect(periods[0]).toMatchObject({
      open: { day: 7, time: '1000' },
      close: { day: 7, time: '2230' },
    });
    expect(periods[5]).toMatchObject({
      close: { day: 5, time: '2300' },
      open: { day: 5, time: '1100' },
    });
  });

  it('returns the correct opentime on a saturday', async () => {
    const periods = filterOpenPeriods(mockPeriods, '2020-01-11T20:47:41+01:00');
    expect(periods).toHaveLength(1);
    expect(periods[0]).toMatchObject({
      open: { day: 6, time: '1000' },
      close: { day: 7, time: '0300' },
    });
  });

  it('returns the correct opentime on a saturday night/sunday morning', async () => {
    const periods = filterOpenPeriods(mockPeriods, '2020-01-12T00:44:41+00:00');
    expect(periods[0]).toMatchObject({
      open: { day: 6, time: '1000' },
      close: { day: 7, time: '0300' },
    });
  });
});
