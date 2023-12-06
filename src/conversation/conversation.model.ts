import { BaseModel } from '../database/base-model';

export class ConversationModel extends BaseModel {
  static tableName = 'conversations';

  id: string;
  name: string;
  model: string;
}
