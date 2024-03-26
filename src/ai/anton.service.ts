import { Injectable } from '@nestjs/common';
import { Anton } from '@mrck-labs/anton-sdk';
import { countTokens, antonServer} from '@mrck-labs/anton-sdk/utils';
import { systemPrompts } from './prompts/system';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';
import utils from './ai.utils';
import type { Image } from '@mrck-labs/anton-sdk/node_modules/openai/resources';
import { ConversationModel } from '../conversation/conversation.model';
import { MessageModel } from '../conversation/message.model';
import { SingleShotClaudeChatRequestDto } from './dto/single-shot-claude-chat-request.dto';

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
    } as any);

    return data;
  }

  async claudeSimpleCompletion(
    body: SingleShotClaudeChatRequestDto,
    claudeApiKey: string,
  ) {
    console.log('And this is fucking claude: ');
    console.log(claudeApiKey);
    const anton = antonServer(claudeApiKey, {});

    console.log('whatever');
    countTokens('asdasd');

    console.log("This is body")
    console.log(body)

    const data = await anton.claudeChatCompletion({
      model: body.model,
      messages: body.messages,
      max_tokens: body.max_tokens,
    } as any);

    console.log('This is fucking data');
    console.log(data);

    return data;

    // this.anton.setInitialMessages([
    //   {
    //     role: 'system',
    //     content: systemPrompts.basePrompt(),
    //   },
    // ]);

    // const antonServer = new AntonServer({
    //   apiKeys: {
    //     claudeAIApiKey: claudeApiKey,
    //   },
    //   options: {
    //     model: body.model,
    //     initialMessages: [{ role: 'assistant', content: '' }],
    //   },
    // });
    //
    // const data = await antonServer.claudeChatCompletion({
    //   body: {
    //     ...body,
    //   },
    // });
    //
    // return data;
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
    } as any);

    return data;
  }

  async createImage(prompt: any): Promise<Image[]> {
    const { data } = await (this.anton as any).createImage({
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
