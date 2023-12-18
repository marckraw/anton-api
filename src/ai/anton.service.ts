import { Injectable } from '@nestjs/common';
import { Anton } from '@mrck-labs/anton-sdk';
import { systemPrompts } from './prompts/system';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';
import utils from './ai.utils';
import type { Image } from '@mrck-labs/anton-sdk/node_modules/openai/resources';
import { ConversationModel } from '../conversation/conversation.model';
import { MessageModel } from '../conversation/message.model';
import { ChatWithDatabaseDto } from './dto/chat-with-database.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AntonService {
  openai: OpenAIApi;
  anton: Anton;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPEN_AI_TOKEN'),
    });

    this.openai = new OpenAIApi(configuration);
    this.anton = new Anton(this.configService.get<string>('OPEN_AI_TOKEN'));
  }

  async chatCompletionStream(body: ChatWithDatabaseDto) {
    return new Observable((subscriber) => {
      const config = {
        method: 'post',
        url: 'https://api.openai.com/v1/your-endpoint', // replace with actual endpoint
        headers: {
          Authorization: 'Bearer your_api_key', // replace with your API key
          // other required headers
        },
        responseType: 'stream', // critical for streaming the response
      };

      axios(config)
        .then((response) => {
          response.data.on('data', (chunk: Buffer) => {
            const textChunk = chunk.toString();
            // Parse chunk and construct a server-sent event
            // Make sure you are sending valid JSON, or transform it if necessary.
            subscriber.next({ data: textChunk });
          });
          response.data.on('end', () => {
            subscriber.complete();
          });
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
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
