import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.post('/', createRentalController.handle);

export { rentalsRoutes };
