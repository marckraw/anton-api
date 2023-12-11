import { Body, Controller, Post } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('catch')
  catchWebhook(@Body() payload: any) {
    console.log('This is payload: ');
    console.log(payload);
    return payload;
  }
}
