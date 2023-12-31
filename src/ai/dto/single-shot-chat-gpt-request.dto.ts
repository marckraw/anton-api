import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChatGPTModel } from '../ai.constants';

export class SingleShotChatGptRequestDto {
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
