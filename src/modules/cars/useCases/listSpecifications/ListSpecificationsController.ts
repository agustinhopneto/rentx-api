import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCases } from './ListSpecificationsUseCases';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCases = container.resolve(
      ListSpecificationsUseCases,
    );

    const list = await listSpecificationsUseCases.execute();

    return response.json(list);
  }
}
export { ListSpecificationsController };
