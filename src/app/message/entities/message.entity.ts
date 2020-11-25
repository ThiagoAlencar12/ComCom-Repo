import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, DeleteDateColumn  } from 'typeorm';
import { Users } from '../../user/entities/user.entity';

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
  @ManyToOne(() => Users )
  user: Users[];

  @JoinColumn({ name: 'destinatario_id' })
  @ManyToOne(() => Users )

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}