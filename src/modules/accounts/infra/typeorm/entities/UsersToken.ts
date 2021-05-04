import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';

@Entity('users_tokens')
class UsersToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UsersToken };
