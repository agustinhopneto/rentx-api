interface IDateProvider {
  compareInHours(end_date: Date, start_date: Date): number;
  compareInDays(end_date: Date, start_date: Date): number;
}

export { IDateProvider };
