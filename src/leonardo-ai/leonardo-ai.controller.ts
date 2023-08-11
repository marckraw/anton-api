import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { LeonardoAiService } from './leonardo-ai.service';

@Controller('leonardo-ai')
export class LeonardoAiController {
  constructor(private leonardoAiService: LeonardoAiService) {}

  @Get('/me')
  @UseGuards(AuthTokenGuard)
  async getMe() {
    return this.leonardoAiService.getMe();
  }
}
