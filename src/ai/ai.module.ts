import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { LangchainService } from './langchain.service';

@Module({
  controllers: [AiController],
  providers: [AiService, LangchainService],
  imports: [ConfigModule],
})
export class AiModule {}
