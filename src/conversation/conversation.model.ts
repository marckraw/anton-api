import { BaseModel } from '../database/base-model';
import { MessageModel } from './message.model';

export class ConversationModel extends BaseModel {
  static tableName = 'conversations';

  readonly id: number;
  name: string;
  model: string;

  static get relationMappings() {
    return {
      messages: {
        relation: BaseModel.HasManyRelation,
        modelClass: MessageModel,
        join: {
          from: 'conversations.id',
          to: 'messages.conversationId',
        },
      },
    };
  }
}
