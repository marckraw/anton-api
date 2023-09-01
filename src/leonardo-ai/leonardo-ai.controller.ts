import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  /*
   *
   * https://docs.leonardo.ai/reference/getgenerationbyid
   *
   * */
  @Get('/generations/:id')
  @UseGuards(AuthTokenGuard)
  async generationsById(@Param('id') id: string) {
    return this.leonardoAiService.generationsById(id);
  }

  /*
   *
   * https://docs.leonardo.ai/reference/getgenerationbyid
   *
   * */
  @Get('/generations/user/:id')
  @UseGuards(AuthTokenGuard)
  async generationsByUserId(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Param('id') id: string,
  ) {
    return this.leonardoAiService.generationsByUserId(id, offset, limit);
  }

  @Get('/remove/:id')
  @UseGuards(AuthTokenGuard)
  async removeGenerationsByUserId(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Param('id') id: string,
  ) {
    return this.leonardoAiService.removeGenerationsByUserId(id, offset, limit);
  }
}
