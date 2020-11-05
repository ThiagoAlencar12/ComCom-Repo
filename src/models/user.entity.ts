import { Entity, Column , PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default User;