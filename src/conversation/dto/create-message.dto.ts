import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  role: 'assistant' | 'user' | 'system';

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  conversationId: number;
}
