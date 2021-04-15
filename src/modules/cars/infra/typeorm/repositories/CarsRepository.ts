import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    brand,
    name,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      brand,
      name,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
    });

    this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('LOWER(brand) LIKE :brand', {
        brand: `%${brand.toLowerCase()}%`,
      });
    }

    if (name) {
      carsQuery.andWhere('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
