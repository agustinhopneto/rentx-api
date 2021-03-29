import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface ITokenPayload{
  name: string
  iat: number
  exp: number
  sub: string
}

export async function ensureAuthenticated(
  request:Request, response:Response, next:NextFunction,
):Promise<void> {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { name, sub } = verify(token, '4b28691d69f6698455001cedba8a7c91') as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User does not exist');
    }
    request.user = { name, id: sub };

    return next();
  } catch (err) {
    throw new AppError('Invalid Token', 401);
  }
}
