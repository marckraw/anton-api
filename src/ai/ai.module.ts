import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AntonService } from './anton.service';
import { ConfigModule } from '@nestjs/config';
import { LangchainService } from './langchain.service';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  controllers: [AiController],
  providers: [AntonService, LangchainService],
  imports: [ConfigModule, ConversationModule],
})
export class AiModule {}
