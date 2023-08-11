import { IsString } from 'class-validator';

export class AiImageDto {
  @IsString()
  prompt: string;
}
