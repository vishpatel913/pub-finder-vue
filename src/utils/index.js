import { DateTime } from 'luxon';

export const getDuration = (fromIso, toIso) => {
  const dtFrom = DateTime.fromISO(fromIso);
  const dtTo = DateTime.fromISO(toIso);

  let duration = dtTo.diff(dtFrom, ['hours', 'minutes']);

  if (duration.hours < 0 || duration.minutes < 0) {
    duration = dtTo.plus({ day: 1 }).diff(dtFrom, ['hours', 'minutes']);
  }

  const { hours, minutes } = duration;
  const hoursObj = {
    value: minutes > 30 ? hours + 1 : hours,
    unit: hours > 1 ? 'hours' : 'hour',
  };
  const minutesObj = ({
    value: (Math.round(minutes / 10)) * 10,
    unit: minutes > 1 ? 'minutes' : 'minute',
  });

  return hours > 0 ? hoursObj : minutesObj;
};

export const getISOFromTimeString = (timeString) => DateTime.fromFormat(timeString, 'HHmm').toISO();
