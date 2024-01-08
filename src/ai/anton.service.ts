import { Injectable } from '@nestjs/common';
import { Anton } from '@mrck-labs/anton-sdk';
import { systemPrompts } from './prompts/system';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';
import utils from './ai.utils';
import type { Image } from '@mrck-labs/anton-sdk/node_modules/openai/resources';
import { ConversationModel } from '../conversation/conversation.model';
import { MessageModel } from '../conversation/message.model';

@Injectable()
export class AntonService {
  openai: OpenAI;
  anton: Anton;

  constructor(private configService: ConfigService) {
    const configuration = {
      apiKey: this.configService.get<string>('OPEN_AI_TOKEN'),
    };

    this.openai = new OpenAI(configuration);
    this.anton = new Anton(this.configService.get<string>('OPEN_AI_TOKEN'));
  }

  async chat(conversation: ConversationModel) {
    this.anton.setInitialMessages([
      {
        role: 'system',
        content: systemPrompts.basePrompt(),
      },
    ]);

    const data = await this.anton.chatCompletion({
      body: {
        messages: (
          conversation as ConversationModel & { messages: MessageModel[] }
        ).messages.map((message) => {
          return {
            role: message.role,
            content: message.message,
          };
        }),
      },
    });

    return data;
  }

  async simpleCompletion(body: SingleShotChatGptRequestDto) {
    this.anton.setInitialMessages([
      {
        role: 'system',
        content: systemPrompts.basePrompt(),
      },
    ]);

    const data = await this.anton.chatCompletion({
      body: {
        messages: [
          {
            role: 'user',
            content: body.prompt,
          },
        ],
      },
    });

    return data;
  }

  async createImage(prompt: any): Promise<Image[]> {
    const { data } = await this.anton.createImage({
      body: {
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
      },
    });

    return data;
  }

  countTokens(prompt: string) {
    return utils.countTokens(prompt);
  }
}
