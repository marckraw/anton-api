import { Module } from '@nestjs/common';
import { DataHarvestController } from './data-harvest.controller';
import { DataHarvestService } from './data-harvest.service';

@Module({
  controllers: [DataHarvestController],
  providers: [DataHarvestService]
})
export class DataHarvestModule {}
