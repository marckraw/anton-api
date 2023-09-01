import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { AiImageDto } from './dto/ai-image.dto';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';
import { ChatGPTRequestDto } from './dto/chat-gpt-request.dto';
import { LangchainService } from './langchain.service';

@Controller('ai')
export class AiController {
  constructor(
    public aiService: AiService,
    public langchainService: LangchainService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  sendMessage(@Body() body: SingleShotChatGptRequestDto) {
    return this.aiService.simpleCompletion(body);
  }

  // Embedding
  // @Post()
  // @UseGuards(AuthTokenGuard)
  // embedd(@Body() body: any) {
  //   return this.aiService.simpleCompletion(body.content);
  // }

  @Post('/chat')
  @UseGuards(AuthTokenGuard)
  chat(@Body() body: ChatGPTRequestDto) {
    return this.aiService.chat(body);
  }

  @Post('/single-shot/chat')
  @UseGuards(AuthTokenGuard)
  singleShotMessage(@Body() body: SingleShotChatGptRequestDto) {
    return this.aiService.simpleCompletion(body);
  }

  @Post('/single-shot/image')
  @UseGuards(AuthTokenGuard)
  generateImage(@Body() body: AiImageDto) {
    return this.aiService.createImage(body.prompt);
  }

  @Post('/single-shot/tokens')
  @UseGuards(AuthTokenGuard)
  countTokens(@Body() body: SingleShotChatGptRequestDto) {
    return this.aiService.countTokens(body.prompt);
  }

  @Post('/translate-text')
  @UseGuards(AuthTokenGuard)
  testLLM(@Body() body: SingleShotChatGptRequestDto) {
    // return this.langchainService.testSomething(body);
    return this.langchainService.translateText(body);
  }

  @Post('/ask-google')
  @UseGuards(AuthTokenGuard)
  askGoogle(@Body() body: SingleShotChatGptRequestDto) {
    // return this.langchainService.testSomething(body);
    return this.langchainService.askGoogle(body);
  }

  @Post('/llm-with-memory')
  @UseGuards(AuthTokenGuard)
  exampleWithMemory(@Body() body: SingleShotChatGptRequestDto) {
    // return this.langchainService.testSomething(body);
    return this.langchainService.exampleWithMemory(body);
  }

  @Post('/test-llm')
  @UseGuards(AuthTokenGuard)
  testingPromptCreation(@Body() body: SingleShotChatGptRequestDto) {
    return this.langchainService.testingLLMPromptCreation(body);
  }

  @Post('/test-chat')
  @UseGuards(AuthTokenGuard)
  testingChatPromptCreation(@Body() body: SingleShotChatGptRequestDto) {
    return this.langchainService.testingChatPromptCreation(body);
  }
}
