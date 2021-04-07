import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddCarSpecificationsUseCase } from './AddCarSpecificationsUseCase';

class AddCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const { specifications_id } = request.body;

    const addCarSpecificationsUseCase = container.resolve(
      AddCarSpecificationsUseCase,
    );

    const car = await addCarSpecificationsUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.json(car);
  }
}

export { AddCarSpecificationsController };
