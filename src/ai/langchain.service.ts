import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { BufferMemory } from 'langchain/memory';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { ConversationChain, LLMChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from 'langchain/prompts';
import { SingleShotChatGptRequestDto } from './dto/single-shot-chat-gpt-request.dto';

const getCurrentDate = () => {
  return new Date().toISOString();
};

@Injectable()
export class LangchainService {
  llm;
  chat;
  gpt4Chat;

  constructor(private configService: ConfigService) {
    this.llm = new OpenAI({
      openAIApiKey: configService.get<string>('OPEN_AI_TOKEN'),
      temperature: 0.9,
    });

    this.chat = new ChatOpenAI({
      openAIApiKey: configService.get<string>('OPEN_AI_TOKEN'),
      temperature: 0,
    });

    this.gpt4Chat = new ChatOpenAI({
      openAIApiKey: configService.get<string>('OPEN_AI_TOKEN'),
      modelName: 'gpt-4',
      temperature: 0,
    });
  }

  async testSomething(body: SingleShotChatGptRequestDto) {
    const result = await this.llm.predict(body.prompt);

    return result;
  }

  async testChat(body: SingleShotChatGptRequestDto) {
    const result = await this.chat.predictMessages([
      new SystemMessage(
        'You are helpful assistant that is responding sarcasticly everytime you are asked something.',
      ),
      new HumanMessage(body.prompt),
    ]);

    return result;
  }

  async translateText(body: SingleShotChatGptRequestDto) {
    const template =
      'You are a helpful assistant that translates {input_language} to {output_language}.';

    const systemMessagePrompt =
      SystemMessagePromptTemplate.fromTemplate(template);

    const humanTemplate = '{text}';
    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate(humanTemplate);

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);

    // const formattedPrompt = await chatPrompt.formatMessages({
    //   input_language: 'English',
    //   output_language: 'Polish',
    //   text: body.prompt,
    // });

    const chain = new LLMChain({
      llm: this.chat,
      prompt: chatPrompt,
    });

    const result = await chain.call({
      input_language: 'Polish',
      output_language: 'English',
      text: body.prompt,
    });

    return result;
  }

  async askGoogle(body: SingleShotChatGptRequestDto) {
    const executor = await initializeAgentExecutorWithOptions(
      [new Calculator(), new SerpAPI()],
      this.gpt4Chat,
      {
        agentType: 'openai-functions',
        verbose: true,
      },
    );

    const result = await executor.run(body.prompt);

    return result;
  }

  async exampleWithMemory(body: SingleShotChatGptRequestDto) {
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.',
      ),
      new MessagesPlaceholder('history'),
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);

    // Return the current conversation directly as messages and insert them into the MessagesPlaceholder in the above prompt.
    const memory = new BufferMemory({
      returnMessages: true,
      memoryKey: 'history',
    });

    const chain = new ConversationChain({
      memory,
      prompt: chatPrompt,
      llm: this.chat,
      verbose: true,
    });

    await chain.call({
      input: 'My name is Marcin.',
    });

    await chain.call({
      input: 'I would like to build a spaceship, can you help me ?',
    });

    const result2 = await chain.call({
      input: body.prompt,
    });

    return result2;
  }

  async testingLLMPromptCreation(body: SingleShotChatGptRequestDto) {
    // An example prompt with no input variables
    const noInputPrompt = new PromptTemplate({
      inputVariables: [],
      template: 'Tell me a joke.',
    });
    const formattedNoInputPrompt = await noInputPrompt.format({});

    console.log('No input prompt: ');
    console.log(noInputPrompt);

    console.log('Formatted no input promp');
    console.log(formattedNoInputPrompt);

    console.log(' ');
    console.log('#######################');
    console.log(' ');
    // An example prompt with one input variable
    const oneInputPrompt = new PromptTemplate<{ adjective: string }>({
      inputVariables: ['adjective'],
      template: 'Tell me a {adjective} joke.',
    });
    console.log(oneInputPrompt);

    const formattedOneInputPrompt = await oneInputPrompt.format({
      adjective: 'funny',
    });
    console.log(formattedOneInputPrompt);

    console.log(' ');
    console.log('#######################');
    console.log(' ');

    return formattedNoInputPrompt;
  }

  async testingChatPromptCreation(body: SingleShotChatGptRequestDto) {
    const template =
      'You are a helpful assistant that translates {input_language} to {output_language}.';
    const systemMessagePrompt =
      SystemMessagePromptTemplate.fromTemplate(template);
    const humanTemplate = '{text}';
    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate(humanTemplate);

    const chatPrompt = ChatPromptTemplate.fromPromptMessages<{
      input_language: string;
      output_language: string;
      text: string;
    }>([systemMessagePrompt, humanMessagePrompt]);

    // Format the messages
    const formattedChatPrompt = await chatPrompt.formatMessages({
      input_language: 'Polish',
      output_language: 'English',
      text: body.prompt,
    });

    console.log(formattedChatPrompt);

    // TODO: Composition of longer prompts: https://js.langchain.com/docs/modules/model_io/prompts/prompt_templates/prompt_composition

    return formattedChatPrompt;
  }
}
