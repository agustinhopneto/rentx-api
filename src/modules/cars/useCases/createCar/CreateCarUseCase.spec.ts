import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let categoriesRepository: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(
      carsRepository,
      categoriesRepository,
    );
  });

  it('should be able to create a new car', async () => {
    const category = {
      name: 'Category',
      description: 'Car Category',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepository.findByName(
      category.name,
    );

    const car = {
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: createdCategory.id,
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a new car with an inexistent category', async () => {
    expect(async () => {
      const car = {
        name: 'Car name',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
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
    const category = {
      name: 'Category',
      description: 'Car Category',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepository.findByName(
      category.name,
    );

    const car = {
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: createdCategory.id,
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBe(true);
  });
});
