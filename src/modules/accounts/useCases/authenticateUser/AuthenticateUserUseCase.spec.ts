import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInmemory';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to create an authentication token', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      driver_license: '123456',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(auth).toHaveProperty('token');
  });

  it('should not be able to create an authentication token with a non existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@test.com',
        password: 'anything',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an authentication token with an incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Doe',
        email: 'johndoe@test.com',
        driver_license: '123456',
        password: '123456',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
