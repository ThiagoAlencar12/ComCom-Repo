import { Entity, Column , PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
