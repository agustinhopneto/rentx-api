import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const carWithoutRental = await this.repository.findOne({
      car_id,
      end_date: null,
    });

    return carWithoutRental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const userWithoutRental = await this.repository.findOne({
      user_id,
      end_date: null,
    });

    return userWithoutRental;
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
