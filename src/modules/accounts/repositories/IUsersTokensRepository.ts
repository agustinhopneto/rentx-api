import { ICreateUsersTokenDTO } from '../dtos/ICreateUsersTokenDTO';
import { UsersToken } from '../infra/typeorm/entities/UsersToken';

interface IUsersTokensRepository {
  create(data: ICreateUsersTokenDTO): Promise<UsersToken>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UsersToken>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refreshToken: string): Promise<UsersToken>;
}

export { IUsersTokensRepository };
