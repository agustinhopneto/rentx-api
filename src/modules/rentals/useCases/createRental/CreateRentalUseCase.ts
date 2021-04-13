import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is not available!');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for this user!');
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compareDates = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours');

    if (compareDates < minimumRentHours) {
      throw new AppError(`Minimum return time is ${minimumRentHours} hours`);
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
