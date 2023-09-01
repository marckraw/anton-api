import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body('name') name: string): Promise<Tag> {
    return this.tagService.createTag(name);
  }

  @Put(':id')
  async updateTag(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Tag> {
    return this.tagService.updateTag(id, name);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: string): Promise<void> {
    return this.tagService.deleteTag(id);
  }
}
