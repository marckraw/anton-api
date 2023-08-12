import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DataHarvestService } from './data-harvest.service';
import { AuthTokenGuard } from '../guards/auth-token.guard';

@Controller('data-harvest')
export class DataHarvestController {
  constructor(private dataHarvestService: DataHarvestService) {}

  @Get('/unfluff')
  @UseGuards(AuthTokenGuard)
  unfluff(@Query('url') url: string) {
    console.log('This is uyrl: ');
    console.log(url);
    return this.dataHarvestService.unfluff(url);
  }
}
