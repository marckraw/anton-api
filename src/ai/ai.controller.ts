import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiMessageDto } from './dto/ai-message.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { AiImageDto } from './dto/ai-image.dto';
import { ChatGPTRequestDto } from './dto/chat-gpt-request.dto';

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
  sendMessage(@Body() body: ChatGPTRequestDto) {
    return this.aiService.simpleCompletion(body);
  }

  // Embedding
  // @Post()
  // @UseGuards(AuthTokenGuard)
  // embedd(@Body() body: any) {
  //   return this.aiService.simpleCompletion(body.content);
  // }

  @Post('/single-shot/chat')
  @UseGuards(AuthTokenGuard)
  singleShotMessage(@Body() body: ChatGPTRequestDto) {
    return this.aiService.simpleCompletion(body);
  }

  @Post('/single-shot/image')
  @UseGuards(AuthTokenGuard)
  generateImage(@Body() body: AiImageDto) {
    return this.aiService.createImage(body.prompt);
  }
}
