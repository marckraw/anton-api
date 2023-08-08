import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [ConfigModule],
})
export class AiModule {}
