import { DateTime } from 'luxon';
import { OpenTime } from '../schemas';

export const filterOpenPeriods = (
  periods?: OpenTime[],
  filterDate?: string
): OpenTime[] => {
  return (
    periods?.reduce((acc: OpenTime[], c) => {
      const item = c;
      if (item.open.day === 0) item.open.day = 7;
      if (item.close.day === 0) item.close.day = 7;
      if (filterDate) {
        const { open, close } = item;
        if (!open || !close) {
          return acc;
        }
        const todayDt = filterDate
          ? DateTime.fromISO(filterDate)
          : DateTime.local();
        const openDt = DateTime.fromISO(todayDt.toString()).set({
          weekday: open.day,
          hour: parseInt(open.time.slice(0, 2)),
          minute: parseInt(open.time.slice(2, 4)),
        });
        const closeDt = DateTime.fromISO(todayDt.toString()).set({
          weekday: close.day,
          hour: parseInt(close.time.slice(0, 2)),
          minute: parseInt(close.time.slice(2, 4)),
        });

        return openDt < todayDt && closeDt > todayDt ? [item] : acc;
      } else {
        return [...acc, item];
      }
    }, []) || []
  );
};
