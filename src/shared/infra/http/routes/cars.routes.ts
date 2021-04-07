import { Router } from 'express';

import { AddCarSpecificationsController } from '@modules/cars/useCases/addCarSpecification/AddCarSpecificationsController';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addCarSpecificationsController = new AddCarSpecificationsController();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.use(ensureAuthenticated);
carsRoutes.use(ensureAdmin);

carsRoutes.post('/', createCarController.handle);
carsRoutes.put('/specifications/:id', addCarSpecificationsController.handle);

export { carsRoutes };
