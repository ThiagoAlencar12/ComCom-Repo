import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Message;