import { injectable, inject } from 'tsyringe';

import { Specification } from '../../entities/Specification';
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';

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
