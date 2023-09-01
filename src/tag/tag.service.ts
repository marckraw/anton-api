import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTag(name: string): Promise<Tag> {
    const newTag = this.tagRepository.create({ name });
    return await this.tagRepository.save(newTag);
  }

  async updateTag(id: string, name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ id });
    tag.name = name;
    return await this.tagRepository.save(tag);
  }

  async deleteTag(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
