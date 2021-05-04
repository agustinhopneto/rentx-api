import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenUseCaseController';
import { ResetUserPasswordController } from '@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);
authenticateRoutes.post(
  '/forgot-password',
  sendForgotPasswordMailController.handle,
);
authenticateRoutes.post('/reset-password', resetUserPasswordController.handle);

export { authenticateRoutes };
