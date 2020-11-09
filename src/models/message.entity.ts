import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany } from 'typeorm';
import User from '../models/user.entity';

@Entity('messages')
class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  oculto: boolean;

  @Column()
  oculto_all: boolean;

  @Column()
  remetente_id: string;

  @Column()
  destinatario_id: string;

  @JoinColumn({ name: 'remetente_id, destinatario_id' })
  @ManyToMany(() => User )
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Messages;