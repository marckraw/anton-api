import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChatGPTModel } from '../constants';

export class ChatGPTRequestDto {
  @IsOptional()
  @IsString()
  model: ChatGPTModel;

  @IsString()
  prompt: string;

  @IsOptional()
  @IsNumber()
  max_tokens?: number;

  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsBoolean()
  stream?: boolean;
}
