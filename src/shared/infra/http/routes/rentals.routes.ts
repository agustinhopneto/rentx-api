import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { FinishRentalController } from '@modules/rentals/useCases/finishRental/FinishRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();
const listRentalsByUSerController = new ListRentalsByUserController();

rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.post('/', createRentalController.handle);
rentalsRoutes.put('/finish/:id', finishRentalController.handle);
rentalsRoutes.get('/', listRentalsByUSerController.handle);

export { rentalsRoutes };
