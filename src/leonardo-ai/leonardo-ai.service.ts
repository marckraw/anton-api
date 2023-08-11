import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LeonardoAiService {
  private baseUrl = 'https://cloud.leonardo.ai/api/rest/v1';
  private authorizationToken = '';
  private baseConfiguration = {};

  constructor(private configService: ConfigService) {
    this.authorizationToken = configService.get<string>('LEONARDO_AI_TOKEN');
    this.baseConfiguration = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authorizationToken}`,
      },
    };
  }

  async getMe() {
    // TODO: Do the try catch dance here... lets make it generic
    const fetched = await fetch(`${this.baseUrl}/me`, {
      ...this.baseConfiguration,
    });

    const result = await fetched.json();

    return result;
  }
}
