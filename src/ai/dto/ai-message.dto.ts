import { IsString } from 'class-validator';

export class AiMessageDto {
  @IsString()
  prompt: string;
}
