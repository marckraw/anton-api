import { Module } from '@nestjs/common';
import { LeonardoAiController } from './leonardo-ai.controller';
import { LeonardoAiService } from './leonardo-ai.service';

@Module({
  controllers: [LeonardoAiController],
  providers: [LeonardoAiService]
})
export class LeonardoAiModule {}
