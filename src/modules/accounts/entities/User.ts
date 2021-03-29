import {
  Entity, Column, PrimaryColumn, CreateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  name:string

  @Column()
  password:string

  @Column()
  email:string

  @Column()
  driver_license:string

  @Column()
  avatar: string

  @Column()
  isAdmin:boolean

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
