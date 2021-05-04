import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(2, 'days').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category-id',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another rental opened to same user', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category-id',
    });

    await rentalsRepositoryInMemory.create({
      user_id: '123456',
      car_id: '123654',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(
      new AppError('There is a rental in progress for this user!'),
    );
  });

  it('should not be able to create a new rental if there is another rental opened to same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category-id',
    });

    await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '252525',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is not available!'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
        car_id: '654321',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Minimum return time is 24 hours'));
  });
});
