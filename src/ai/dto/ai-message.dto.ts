import { IsString } from 'class-validator';

export class AiMessageDto {
  @IsString()
  content: string;
}
