import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ICreateSpecificationsDTO } from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCases {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationsRepository,
  ) {}

  async execute({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationUseCases };
