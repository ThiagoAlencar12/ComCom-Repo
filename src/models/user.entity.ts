import { Entity, Column , PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Messages } from './message.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  online: boolean;

  @ManyToMany(() => Messages)
  message: Messages;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
