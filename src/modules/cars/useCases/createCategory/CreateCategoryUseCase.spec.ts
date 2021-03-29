import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoryRepositoryInMemory.findByName(
      category.name,
    );

    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create a new category with an existent name', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description Test',
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
