import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { AddCarSpecificationsController } from '@modules/cars/useCases/addCarSpecification/AddCarSpecificationsController';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();
const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addCarSpecificationsController = new AddCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.use(ensureAuthenticated);
carsRoutes.use(ensureAdmin);

carsRoutes.post('/', createCarController.handle);
carsRoutes.post('/specifications/:id', addCarSpecificationsController.handle);
carsRoutes.post(
  '/images/:id',
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
