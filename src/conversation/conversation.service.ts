import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async getAllConversations(): Promise<Conversation[]> {
    return await this.conversationRepository.find();
  }

  async createConversation(
    conversationData: Partial<Conversation>,
  ): Promise<Conversation> {
    const newConversation =
      this.conversationRepository.create(conversationData);
    return await this.conversationRepository.save(newConversation);
  }

  async updateConversation(
    id: string,
    conversationData: Partial<Conversation>,
  ): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOneBy({
      id: id,
    });
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    Object.assign(conversation, conversationData);
    return await this.conversationRepository.save(conversation);
  }

  async deleteConversation(id: string): Promise<void> {
    const conversation = await this.conversationRepository.findOneBy({
      id: id,
    });
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    await this.conversationRepository.remove(conversation);
  }

  async getConversationWithMessages(
    conversationId: string,
  ): Promise<Conversation> {
    return await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['messages'],
    });
  }
}
