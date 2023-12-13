import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class ChatWithDatabaseDto {
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
  @IsOptional()
  conversationId: number;
}
