import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FinishRentalUseCase } from './FinishRentalUseCase';

class FinishRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const finishRentalUseCase = container.resolve(FinishRentalUseCase);

    const rental = await finishRentalUseCase.execute({
      id,
    });

    return response.status(200).json(rental);
  }
}

export { FinishRentalController };
