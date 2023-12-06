import { BaseModel } from '../database/base-model';
import { ConversationModel } from './conversation.model';

export class MessageModel extends BaseModel {
  static tableName = 'messages';

  id: string;
  role: 'assistant' | 'user' | 'system';
  message: string;
  source: string;
  conversationId: number;

  static get relationMappings() {
    return {
      conversation: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ConversationModel,
        join: {
          from: 'messages.conversationId',
          to: 'conversations.id',
        },
      },
    };
  }
}
