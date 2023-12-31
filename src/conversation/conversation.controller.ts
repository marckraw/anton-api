import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
// import { Conversation } from './conversation.entity';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { ConversationModel } from './conversation.model';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  async getAllConversations(): Promise<ConversationModel[]> {
    return this.conversationService.getAllConversations();
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  async getConversation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConversationModel> {
    return this.conversationService.getConversationWithMessages(id);
  }
  //
  // @Post()
  // @UseGuards(AuthTokenGuard)
  // async createConversation(
  //   @Body() conversation: Partial<Conversation>,
  // ): Promise<Conversation> {
  //   return this.conversationService.createConversation(conversation);
  // }
  //
  @Put(':id')
  @UseGuards(AuthTokenGuard)
  async updateConversation(
    @Param('id') id: string,
    @Body() conversation: Partial<ConversationModel>,
  ) {
    return this.conversationService.updateConversation(id, conversation);
  }
  //
  // @Delete(':id')
  // @UseGuards(AuthTokenGuard)
  // async deleteConversation(@Param('id') id: string): Promise<void> {
  //   return this.conversationService.deleteConversation(id);
  // }
}
