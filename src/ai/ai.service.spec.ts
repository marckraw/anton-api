import { Test, TestingModule } from '@nestjs/testing';
import { AntonService } from './anton.service';

describe('AiService', () => {
  let service: AntonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntonService],
    }).compile();

    service = module.get<AntonService>(AntonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
