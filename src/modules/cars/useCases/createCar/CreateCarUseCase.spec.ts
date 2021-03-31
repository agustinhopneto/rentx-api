import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = {
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a new car with an existent license_plate', () => {
    expect(async () => {
      const car1 = {
        name: 'First Car',
        description: 'First Car description',
        daily_rate: 50,
        license_plate: 'ABC1234',
        fine_amount: 50,
        brand: 'First Brand',
        category_id: 'category',
      };

      const car2 = {
        name: 'Second Car name',
        description: 'Second Car description',
        daily_rate: 100,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'Second Brand',
        category_id: 'category',
      };

      await createCarUseCase.execute(car1);

      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with availability by default', async () => {
    const car = {
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBe(true);
  });
});
