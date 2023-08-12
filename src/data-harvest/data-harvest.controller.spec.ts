import { Test, TestingModule } from '@nestjs/testing';
import { DataHarvestController } from './data-harvest.controller';

describe('DataHarvestController', () => {
  let controller: DataHarvestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataHarvestController],
    }).compile();

    controller = module.get<DataHarvestController>(DataHarvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
