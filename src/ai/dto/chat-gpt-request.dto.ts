import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChatGPTModel } from '../constants';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class ChatGPTRequestDto {
  @IsOptional()
  @IsString()
  model: ChatGPTModel;

  @IsArray()
  messages: Message[];

  @IsOptional()
  @IsNumber()
  max_tokens?: number;

  @IsOptional()
  @IsNumber()
  temperature?: number;
}
