import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Controller('conversation/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body()
    messageData: {
      conversationId: string;
      role: 'assistant' | 'user' | 'system';
      message: string;
    },
  ): Promise<Message> {
    const { conversationId, role, message } = messageData;
    return this.messageService.createMessage(conversationId, role, message);
  }

  @Put(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() messageData: { message: string },
  ): Promise<Message> {
    return this.messageService.updateMessage(id, messageData.message);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string): Promise<void> {
    return this.messageService.deleteMessage(id);
  }
}
