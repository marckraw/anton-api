import { Inject, Injectable } from '@nestjs/common';
// import { Conversation } from './conversation.entity';
import { ModelClass } from 'objection';
import { ConversationModel } from './conversation.model';

@Injectable()
export class ConversationService {
  constructor(
    @Inject('ConversationModel')
    private readonly conversationModel: ModelClass<ConversationModel>,
  ) {}

  async getAllConversations(): Promise<ConversationModel[]> {
    return this.conversationModel.query();
  }

  // async createConversation(
  //   conversationData: Partial<Conversation>,
  // ): Promise<Conversation> {
  //   const newConversation =
  //     this.conversationRepository.create(conversationData);
  //   return await this.conversationRepository.save(newConversation);
  // }
  //
  // async updateConversation(
  //   id: string,
  //   conversationData: Partial<Conversation>,
  // ): Promise<Conversation> {
  //   const conversation = await this.conversationRepository.findOneBy({
  //     id: id,
  //   });
  //   if (!conversation) {
  //     throw new Error('Conversation not found');
  //   }
  //   Object.assign(conversation, conversationData);
  //   return await this.conversationRepository.save(conversation);
  // }
  //
  // async deleteConversation(id: string): Promise<void> {
  //   const conversation = await this.conversationRepository.findOneBy({
  //     id: id,
  //   });
  //   if (!conversation) {
  //     throw new Error('Conversation not found');
  //   }
  //   await this.conversationRepository.remove(conversation);
  // }
  //
  // async getConversationWithMessages(
  //   conversationId: string,
  // ): Promise<Conversation> {
  //   return await this.conversationRepository.findOne({
  //     where: { id: conversationId },
  //     relations: ['messages'],
  //   });
  // }
}
