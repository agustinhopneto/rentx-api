import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICategoryRepository, ICreateCategoryDTO } from '../../repositories/ICategoriesRepository';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository:ICategoryRepository,
  ) { }

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }
    await this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryUseCase };