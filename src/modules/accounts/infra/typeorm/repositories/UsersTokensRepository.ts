import { getRepository, Repository } from 'typeorm';

import { ICreateUsersTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UsersToken } from '../entities/UsersToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = getRepository(UsersToken);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
