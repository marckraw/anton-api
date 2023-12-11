import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationModel } from './conversation.model';
import { MessageModel } from './message.model';

@Module({
  imports: [], // Added Tag
  providers: [
    ConversationService,
    MessageService,
    {
      provide: 'ConversationModel',
      useValue: ConversationModel,
    },
    {
      provide: 'MessageModel',
      useValue: MessageModel,
    },
  ], // Added TagService
  controllers: [ConversationController, MessageController],
  exports: [ConversationService, MessageService],
})
export class ConversationModule {}
