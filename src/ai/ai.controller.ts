import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiMessageDto } from './dto/ai-message.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AuthTokenGuard } from '../guards/auth-token.guard';

@Controller('ai')
export class AiController {
  constructor(public aiService: AiService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAiMessages() {
    console.log('Get ai');
  }

  @Post()
  @UseGuards(AuthGuard)
  sendMessage(@Body() body: AiMessageDto) {
    return this.aiService.simpleCompletion(body.content);
  }

  @Post('/single-shot')
  @UseGuards(AuthTokenGuard)
  singleShotMessage(@Body() body: AiMessageDto) {
    return this.aiService.simpleCompletion(body.content);
  }
}
