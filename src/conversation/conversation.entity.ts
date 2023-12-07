import {
  AfterInsert,
  AfterRemove,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('conversation')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column('text', { array: true, default: () => 'array[]::text[]' })
  tags: string[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Conversation with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Conversation with id', this.id);
  }
}
