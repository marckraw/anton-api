import { Injectable } from '@nestjs/common';
import { systemPrompts } from './prompts/system';
import {
  FALLBACK_MAX_GPT3_TOKENS,
  FALLBACK_MAX_GPT4_TOKENS,
  FALLBACK_MODEL,
  FALLBACK_TEMPERATURE,
} from './constants';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { ChatGPTRequestDto } from './dto/chat-gpt-request.dto';
import utils from './utils.service';

@Injectable()
export class AiService {
  openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: configService.get<string>('OPEN_AI_TOKEN'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async simpleCompletion(body: ChatGPTRequestDto) {
    const { temperature, max_tokens, model, prompt } = body;

    const usedModel = model ? model : FALLBACK_MODEL;

    const { data } = await this.openai.createChatCompletion({
      model: usedModel,
      temperature: temperature ? temperature : FALLBACK_TEMPERATURE,
      max_tokens: max_tokens
        ? max_tokens
        : usedModel === 'gpt-3.5-turbo'
        ? FALLBACK_MAX_GPT3_TOKENS
        : FALLBACK_MAX_GPT4_TOKENS,
      messages: [
        {
          role: 'system',
          content: systemPrompts.basePrompt(),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return data;
  }

  async createImage(prompt: any) {
    const { data } = await this.openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });

    return data;
  }

  countTokens(prompt: string) {
    return utils.countTokens(prompt);
  }
}
