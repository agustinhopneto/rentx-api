import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest{
  id: string,
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ id, avatar_file }:IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (user.avatar) {
      deleteFile(`./temp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
