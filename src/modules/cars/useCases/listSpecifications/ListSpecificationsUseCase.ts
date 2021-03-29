import { injectable, inject } from 'tsyringe';

import { Specification } from '@modules/cars/entities/Specification';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';

@injectable()
class ListSpecificationsUseCases {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationsRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    const list = await this.specificationRepository.list();

    return list;
  }
}
export { ListSpecificationsUseCases };
