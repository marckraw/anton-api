import { Test, TestingModule } from '@nestjs/testing';
import { LeonardoAiService } from './leonardo-ai.service';

describe('LeonardoAiService', () => {
  let service: LeonardoAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeonardoAiService],
    }).compile();

    service = module.get<LeonardoAiService>(LeonardoAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
