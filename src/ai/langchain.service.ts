import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain, LLMChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  AIMessagePromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from 'langchain/prompts';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';
import { Conversation } from '../conversation/conversation.entity';

@Injectable()
export class LangchainService {
  langchainGPT4Chat;

  constructor(private configService: ConfigService) {
    this.langchainGPT4Chat = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPEN_AI_TOKEN'),
      modelName: 'gpt-4-1106-preview',
      temperature: 0,
    });
  }

  async askGoogle(body: SingleShotChatGptRequestDto) {
    const executor = await initializeAgentExecutorWithOptions(
      [new Calculator(), new SerpAPI()],
      this.langchainGPT4Chat,
      {
        agentType: 'openai-functions',
        verbose: true,
      },
    );

    const result = await executor.run(body.prompt);

    return result;
  }

  async withConversationData(
    body: SingleShotChatGptRequestDto,
    conversationData: Conversation,
  ) {
    const allMessages = conversationData.messages.map((message) => {
      if (message.role === 'system') {
        return SystemMessagePromptTemplate.fromTemplate(message.message);
      } else if (message.role === 'user') {
        return HumanMessagePromptTemplate.fromTemplate(message.message);
      } else if (message.role === 'assistant') {
        return AIMessagePromptTemplate.fromTemplate(message.message);
      }
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.',
      ),
      ...allMessages,
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);

    const chain = new ConversationChain({
      prompt: chatPrompt,
      llm: this.langchainGPT4Chat,
      verbose: true,
    });

    const result = await chain.call({
      input: body.prompt,
    });

    return result;
  }
}
