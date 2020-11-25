import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinColumn, ManyToMany} from 'typeorm';
import { Users } from '../../user/entities/user.entity';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sender_id: string;

  @Column()
  reciever_id: string;

  @Column()
  message: string;

  @Column()
  date: Date;

  @ManyToMany(() => Users )
  @JoinColumn({ name: 'sender_id' })
  user: Users;

  @ManyToMany(() => Users )
  @JoinColumn({ name: 'reciever_email' })

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}