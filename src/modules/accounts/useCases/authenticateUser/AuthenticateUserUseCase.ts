import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,
  ) {}

  async execute({ email, password }:IRequest):Promise<string> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({ name: user.name }, '4b28691d69f6698455001cedba8a7c91', { subject: user.id, expiresIn: '1d' });
    return token;
  }
}
