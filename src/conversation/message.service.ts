import { Inject, Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelClass } from 'objection';
import { MessageModel } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject('MessageModel')
    private readonly messageModel: ModelClass<MessageModel>,
  ) {}

  private async _find(id: number) {
    return await this.messageModel
      .query()
      .findById(id)
      .withGraphFetched('conversation')
      .throwIfNotFound();
  }
  public async newCreateMessage(
    createMessage: CreateMessageDto,
  ): Promise<MessageModel> {
    const newMessage = await this.messageModel.query().insert({
      ...createMessage,
    });

    console.log('This is new message: ');
    console.log(newMessage);

    return newMessage;
  }

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

  public getOneById(id: number): Promise<MessageModel> {
    return this._find(id);
  }
}
