import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

console.log("Just trigger console.log");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
