import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiMessageDto } from './dto/ai-message.dto';

@Controller('ai')
export class AiController {
  constructor(public aiService: AiService) {}

  @Get()
  getAiMessages() {
    console.log('Get ai');
  }

  @Post()
  sendMessage(@Body() body: AiMessageDto) {
    console.log('This is body to post');
    console.log(body);
    console.log('POST AI');
  }
}
