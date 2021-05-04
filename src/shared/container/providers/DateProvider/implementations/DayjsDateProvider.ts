import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInDays(end_date: Date, start_date: Date): number {
    const endDate = dayjs(end_date).utc().local().format();

    const startDate = dayjs(start_date).utc().local().format();

    return dayjs(endDate).diff(startDate, 'days');
  }

  compareInHours(end_date: Date, start_date: Date): number {
    const endDate = dayjs(end_date).utc().local().format();

    const startDate = dayjs(start_date).utc().local().format();

    return dayjs(endDate).diff(startDate, 'hours');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DayjsDateProvider };
