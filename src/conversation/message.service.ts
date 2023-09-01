import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(
    conversationId: string,
    role: 'assistant' | 'user' | 'system',
    message: string,
    tags: string[],
    source?: string,
  ): Promise<Message> {
    const newMessage = this.messageRepository.create({
      conversationId,
      role,
      message,
      tags,
      source,
    });
    return await this.messageRepository.save(newMessage);
  }

  async updateMessage(
    messageId: string,
    updatedMessage: string,
  ): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id: messageId });
    if (!message) {
      throw new Error('Message not found');
    }
    message.message = updatedMessage;
    return await this.messageRepository.save(message);
  }

  async deleteMessage(messageId: string): Promise<void> {
    const message = await this.messageRepository.findOneBy({ id: messageId });
    if (!message) {
      throw new Error('Message not found');
    }
    await this.messageRepository.remove(message);
  }
}
