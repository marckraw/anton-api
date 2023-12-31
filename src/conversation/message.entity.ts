import {
  AfterInsert,
  AfterRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  role: 'assistant' | 'user' | 'system';

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid' })
  conversationId: string;

  @Column({ nullable: true })
  source: string; // To store the source of the message

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversationId' }) // This line is optional, but good to have for clarity.
  conversation: Conversation;

  @Column('text', { array: true, default: () => 'array[]::text[]' })
  tags: string[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Conversation with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Conversation with id', this.id);
  }
}
