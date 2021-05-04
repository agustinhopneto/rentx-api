import { ICreateUsersTokenDTO } from '../dtos/ICreateUsersTokenDTO';
import { UsersToken } from '../infra/typeorm/entities/UsersToken';

interface IUsersTokensRepository {
  create(data: ICreateUsersTokenDTO): Promise<UsersToken>;
}

export { IUsersTokensRepository };
