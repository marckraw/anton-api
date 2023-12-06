import {
  Controller,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { AuthTokenGuard } from '../guards/auth-token.guard';
import { MessageModel } from './message.model';

@Controller('conversation')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:conversationId/message')
  @UseGuards(AuthTokenGuard)
  async createMessageInConversation(
    @Param('conversationId') conversationId: number,
    @Body()
    messageData,
  ): Promise<MessageModel> {
    return this.messageService.newCreateMessage({
      conversationId: Number(conversationId),
      ...messageData,
    });
  }

  @Post('/message')
  @UseGuards(AuthTokenGuard)
  async createMessage(
    @Body()
    messageData: {
      conversationId: string;
      role: 'assistant' | 'user' | 'system';
      message: string;
      tags: string[];
      source?: string;
    },
  ): Promise<Message> {
    const { conversationId, role, message, tags, source } = messageData;
    return this.messageService.createMessage(
      conversationId,
      role,
      message,
      tags,
      source,
    );
  }

  @Put('/message/:id')
  @UseGuards(AuthTokenGuard)
  async updateMessage(
    @Param('id') id: string,
    @Body() messageData: { message: string },
  ): Promise<Message> {
    return this.messageService.updateMessage(id, messageData.message);
  }

  @Get('/message/:id')
  @UseGuards(AuthTokenGuard)
  async getOneById(@Param('id') id: number): Promise<MessageModel> {
    return this.messageService.getOneById(id);
  }

  @Delete('/message/:id')
  @UseGuards(AuthTokenGuard)
  async deleteMessage(@Param('id') id: string): Promise<void> {
    return this.messageService.deleteMessage(id);
  }
}
