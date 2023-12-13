import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AntonService } from './anton.service';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { AiImageDto } from './dto/ai-image.dto';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';
import { LangchainService } from './langchain.service';
import { ConversationService } from '../conversation/conversation.service';
import { MessageService } from '../conversation/message.service';
import type { Image } from '@mrck-labs/anton-sdk/node_modules/openai/resources';
import { DEFAULT_MODEL } from './ai.constants';
import { ChatWithDatabaseDto } from './dto/chat-with-database.dto';

@Controller('ai')
export class AiController {
  constructor(
    private readonly antonService: AntonService,
    private readonly langchainService: LangchainService,
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  @Post('/single-shot/chat')
  @UseGuards(AuthTokenGuard)
  singleShotMessage(@Body() body: SingleShotChatGptRequestDto) {
    return this.antonService.simpleCompletion(body);
  }

  @Post('/single-shot/image')
  @UseGuards(AuthTokenGuard)
  generateImage(@Body() body: AiImageDto): Promise<Image[]> {
    return this.antonService.createImage(body.prompt);
  }

  @Post('/utils/tokens')
  @UseGuards(AuthTokenGuard)
  countTokens(@Body() body: SingleShotChatGptRequestDto) {
    return this.antonService.countTokens(body.prompt);
  }

  @Post('/ask-google')
  @UseGuards(AuthTokenGuard)
  askGoogle(@Body() body: SingleShotChatGptRequestDto) {
    return this.langchainService.askGoogle(body);
  }

  @Post('/chat')
  @UseGuards(AuthTokenGuard)
  async chatWithDatabase(@Body() body: ChatWithDatabaseDto) {
    const now = new Date();
    const localeDateString = now.toLocaleDateString('pl');
    const localeTimeString = now.toLocaleTimeString('pl');

    const debug = {
      localeDateString,
      localeTimeString,
    };

    if (!body.conversationId) {
      // 1. No conversationId provided. Will create new one.
      const { id: conversationId } =
        await this.conversationService.createConversation({
          name: `${localeDateString}_${localeTimeString}`,
          model: DEFAULT_MODEL,
        });

      // 2. create a message with conversationId created passed (role: user)
      const messageCreated = await this.messageService.newCreateMessage({
        ...body,
        conversationId,
      });

      // 3. Get all messages in conversation of conversationId provided
      const currentConversation =
        await this.conversationService.getConversationWithMessages(
          conversationId,
        );

      // 4. Make request to Anton with the message provided, and all the other messages in the conversation
      const data = await this.antonService.chat(currentConversation);

      // 5. Create a message with conversationId passed from Anton response (role: assistant)
      const antonMessageCreated = await this.messageService.newCreateMessage({
        conversationId,
        role: 'assistant',
        source: 'anton',
        message: data.choices[0].message.content,
      });

      return {
        message: 'No conversationId provided. Will create new one.',
        debug,
        currentConversation,
        messageExchange: {
          messageCreated,
          antonMessageCreated,
        },
        data,
      };
    } else {
      // 2. create a message with conversationId created passed (role: user)
      const messageCreated = await this.messageService.newCreateMessage(body);

      // 3. Get all messages in conversation of conversationId provided
      const { conversationId } = body;

      const currentConversation =
        await this.conversationService.getConversationWithMessages(
          conversationId,
        );

      // 4. Make request to Anton with the message provided, and all the other messages in the conversation
      const data = await this.antonService.chat(currentConversation);

      // 5. Create a message with conversationId passed from Anton response (role: assistant)
      const antonMessageCreated = await this.messageService.newCreateMessage({
        conversationId,
        role: 'assistant',
        source: 'anton',
        message: data.choices[0].message.content,
      });

      return {
        message:
          'conversationId provided, adding message to database. converstaionId: ' +
          body.conversationId,
        debug,
        currentConversation,
        messageExchange: {
          messageCreated,
          antonMessageCreated,
        },
        data,
      };
    }
  }
}
