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
    id,
    car_id,
    expected_return_date,
    user_id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }
}

export { RentalsRepository };
