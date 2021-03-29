import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationUseCases } from './ListSpecificationUseCases';

class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCases = container.resolve(ListSpecificationUseCases);
    const list = await listSpecificationUseCases.execute();
    return response.json(list);
  }
}
export { ListSpecificationController };
