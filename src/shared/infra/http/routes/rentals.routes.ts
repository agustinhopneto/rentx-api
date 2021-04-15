import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { FinishRentalController } from '@modules/rentals/useCases/finishRental/FinishRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();

rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.post('/', createRentalController.handle);
rentalsRoutes.put('/finish/:id', finishRentalController.handle);

export { rentalsRoutes };
