import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  name: string;
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;
  const userTokensRepository = new UsersTokensRepository();

  if (!authorization) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const { name, sub: userId } = verify(
      token,
      auth.secret_refresh,
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    );

    if (!user) {
      throw new AppError('User does not exist!');
    }

    request.user = { name, id: userId };

    return next();
  } catch (err) {
    throw new AppError('Invalid Token!', 401);
  }
}
