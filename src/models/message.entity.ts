import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany } from 'typeorm';
import{ Users } from '../models/user.entity';

@Entity('messages')
export class Messages {
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

  @JoinColumn({ name: 'remetente_id' })
  @ManyToMany(() => Users )
  user: Users;

  @JoinColumn({ name: 'destinatario_id' })
  @ManyToMany(() => Users )

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}