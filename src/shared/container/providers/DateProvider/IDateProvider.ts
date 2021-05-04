interface IDateProvider {
  compareInHours(end_date: Date, start_date: Date): number;
  compareInDays(end_date: Date, start_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfIsBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
