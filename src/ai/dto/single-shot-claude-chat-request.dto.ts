import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClaudeChat } from '../ai.constants';

export class SingleShotClaudeChatRequestDto {
  @IsOptional()
  @IsString()
  model: ClaudeChat['model'];

  @IsArray()
  messages: ClaudeChat['messages'];

  @IsOptional()
  @IsNumber()
  max_tokens?: ClaudeChat['max_tokens'];
}
