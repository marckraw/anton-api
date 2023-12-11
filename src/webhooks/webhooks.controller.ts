import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('catch')
  catchWebhook(@Body() payload: any, @Res() res: Response) {
    console.log('This is payload: ');
    console.log(payload);

    // @ts-expect-error just for testing
    return res.status(HttpStatus.OK).json(payload);
  }
}
