import { Injectable } from '@nestjs/common';
import { openai } from './config';
import { systemPrompts } from './prompts/system';
import { defaultModel } from './constants';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AiService {
  openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: configService.get<string>('OPEN_AI_TOKEN'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async simpleCompletion(content: string) {
    const { data } = await this.openai.createChatCompletion({
      model: defaultModel,
      messages: [
        {
          role: 'system',
          content: systemPrompts.returnWholeUserMessageAsJSON(),
        },
        {
          role: 'user',
          content,
        },
      ],
    });

    return data;
  }
}
