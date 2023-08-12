import { Injectable } from '@nestjs/common';
import * as unfluff from 'unfluff';

@Injectable()
export class DataHarvestService {
  constructor() {}

  async unfluff(url: string) {
    const response = await fetch(url);
    const htmlData = await response.text();
    const extractedData = unfluff(htmlData);

    return extractedData;
  }
}
