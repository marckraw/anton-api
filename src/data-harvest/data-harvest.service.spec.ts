import { Test, TestingModule } from '@nestjs/testing';
import { DataHarvestService } from './data-harvest.service';

describe('DataHarvestService', () => {
  let service: DataHarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataHarvestService],
    }).compile();

    service = module.get<DataHarvestService>(DataHarvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
