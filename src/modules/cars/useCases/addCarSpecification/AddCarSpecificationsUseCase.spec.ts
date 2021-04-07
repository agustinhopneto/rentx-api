import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { AddCarSpecificationsUseCase } from './AddCarSpecificationsUseCase';

let addCarSpecificationsUseCase: AddCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Add Car Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );

    carsRepositoryInMemory = new CarsRepositoryInMemory();
    addCarSpecificationsUseCase = new AddCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const category = {
      name: 'Category',
      description: 'Car Category',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: createdCategory.id,
    });

    const car_id = car.id;

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const specifications_id = [specification.id];

    const carsSpecifications = await addCarSpecificationsUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(carsSpecifications).toHaveProperty('specifications');
    expect(carsSpecifications.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to an non existent car', async () => {
    expect(async () => {
      const car_id = '1234';

      const specification = await specificationsRepositoryInMemory.create({
        description: 'test',
        name: 'test',
      });

      const specifications_id = [specification.id];

      await addCarSpecificationsUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
