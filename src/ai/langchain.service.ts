import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, ChatMessage, SystemMessage } from 'langchain/schema';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';

@Injectable()
export class LangchainService {
  llm;
  chat;

  constructor(private configService: ConfigService) {
    this.llm = new OpenAI({
      openAIApiKey: configService.get<string>('OPEN_AI_TOKEN'),
      temperature: 0.9,
    });

    this.chat = new ChatOpenAI({
      openAIApiKey: configService.get<string>('OPEN_AI_TOKEN'),
      temperature: 0.9,
    });
  }

  async testSomething(body: SingleShotChatGptRequestDto) {
    const result = await this.llm.predict(body.prompt);

    return result;
  }

  async testChat(body: SingleShotChatGptRequestDto) {
    const result = await this.chat.predictMessages([
      new SystemMessage(
        'You are helpfull assistant that is responding sarcasticly everytime you are asked something.',
      ),
      new HumanMessage(body.prompt),
    ]);

    return result;
  }
}
