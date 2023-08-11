import { Test, TestingModule } from '@nestjs/testing';
import { LeonardoAiController } from './leonardo-ai.controller';

describe('LeonardoAiController', () => {
  let controller: LeonardoAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeonardoAiController],
    }).compile();

    controller = module.get<LeonardoAiController>(LeonardoAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
