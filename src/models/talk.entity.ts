import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './user.entity';

@Entity('talk')
export class Talk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_primary: string;

  @Column()
  user_secundary: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_primary' })
  @ManyToOne(() => Users )

  @JoinColumn({ name: 'user_secundary' })
  @ManyToOne(() => Users )
  user: Users;
}