import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { LeonardoAiService } from './leonardo-ai.service';
import { LeonardoAiGenerationsDto } from './dto/leonardo-ai-generations.dto';

@Controller('leonardo-ai')
export class LeonardoAiController {
  constructor(private leonardoAiService: LeonardoAiService) {}

  /*
   *
   * https://docs.leonardo.ai/reference/getuserself
   *
   * */
  @Get('/me')
  @UseGuards(AuthTokenGuard)
  async getMe() {
    return this.leonardoAiService.getMe();
  }

  /*
   *
   * https://docs.leonardo.ai/reference/creategeneration
   *
   * */
  @Post('/generations')
  @UseGuards(AuthTokenGuard)
  async generations(@Body() body: LeonardoAiGenerationsDto) {
    return this.leonardoAiService.generations(body);
  }
}
