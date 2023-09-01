import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';
import { Message } from '../conversation/message.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Conversation, (conversation) => conversation.tags)
  @JoinTable()
  conversations: Conversation[];

  @ManyToMany(() => Message, (message) => message.tags)
  @JoinTable()
  messages: Message[];
}
