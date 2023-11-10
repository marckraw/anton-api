import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LeonardoAiGenerationsDto } from './dto/leonardo-ai-generations.dto';

const wait = async (time) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type ModelsNames =
  | 'Leonardo Creative'
  | 'Leonardo Select'
  | 'Leonardo Signature';

// interface LeonardoAIGenerationsBodyParams {
//   prompt: string;
//   negative_prompt: string;
//   modelId: string;
//   sd_version: 'v1_5' | 'v2';
//   num_images: number;
//   width: number;
//   height: number;
//   num_inference_steps: number; // 30 - 60
//   guidance_scale: number; // 1 - 20
//   init_generation_image_id?: number;
//   init_image_id?: number;
//   init_strength?: number; // null or 0.1 - 0.9
//   scheduler?: string; // string
//   presetStyle?: 'LEONARDO' | 'NONE';
//   tiling?: boolean;
//   public?: boolean;
//   promptMagic?: boolean;
//   controlNet?: boolean;
//   controlNetType?: 'POSE' | 'CANNY' | 'DEPTH';
// }

@Injectable()
export class LeonardoAiService {
  private baseUrl = 'https://cloud.leonardo.ai/api/rest/v1';
  private authorizationToken = '';
  private baseConfiguration = {};

  private models: Record<ModelsNames, string> = {
    'Leonardo Creative': '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
    'Leonardo Select': 'cd2b2a15-9760-4174-a5ff-4d2925057376',
    'Leonardo Signature': '291be633-cb24-434f-898f-e662799936ad',
  };

  constructor(private configService: ConfigService) {
    this.authorizationToken = configService.get<string>('LEONARDO_AI_TOKEN');
    this.baseConfiguration = {
      method: 'GET',
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

  async generationsByUserId(
    id: string,
    offset: number = 0,
    limit: number = 10,
  ) {
    // TODO: Do the try catch dance here... lets make it generic
    const fetched = await fetch(
      `${this.baseUrl}/generations/user/${id}?limit=${limit}&offset=${offset}`,
      {
        ...this.baseConfiguration,
      },
    );

    const result = await fetched.json();

    return result;
  }

  async generationsById(id: string) {
    // TODO: Do the try catch dance here... lets make it generic
    const fetched = await fetch(`${this.baseUrl}/generations/${id}`, {
      ...this.baseConfiguration,
    });

    const result = await fetched.json();

    return result;
  }

  async removeGenerationsByUserId(
    id: string,
    offset: number = 0,
    limit: number = 10,
  ) {
    let count = 0;
    setInterval(async () => {
      try {
        const all = await this.generationsByUserId(id, offset, limit);

        console.log('###');
        console.log(all);
        console.log('###');

        await Promise.all(
          all?.generations?.map(async (generation) => {
            await wait(1000);
            this._removeGenerationById(generation.id);
          }),
        );
        count++;

        if (count === 10) {
          return true;
        }
      } catch (e) {
        console.log('nothing, lets continue');
      }
    }, 10000);
  }

  async _removeGenerationById(id: string) {
    const removed = await fetch(`${this.baseUrl}/generations/${id}`, {
      ...this.baseConfiguration,
      method: 'DELETE',
    });

    return removed;
  }

  async generations(body: LeonardoAiGenerationsDto) {
    const bodyParams: LeonardoAiGenerationsDto = {
      prompt: body.prompt,
      alchemy: body.alchemy,
      photoReal: body.photoReal ? body.photoReal : false,
      photoRealStrength: body.photoRealStrength ? body.photoRealStrength : 0.5,
      presetStyle: body.presetStyle ? body.presetStyle : 'CINEMATIC',
      negative_prompt: body.negative_prompt ? body.negative_prompt : '',
      modelId: body.modelId ? body.modelId : this.models['Leonardo Creative'],
      sd_version: body.sd_version ? body.sd_version : 'v1_5',
      num_images: body.num_images,
      width: body.width ? body.width : 640,
      height: body.height ? body.height : 832,
      num_inference_steps: body.num_inference_steps
        ? body.num_inference_steps
        : 30, // 30 - 60
      guidance_scale: body.guidance_scale ? body.guidance_scale : 7, // 1 - 20
      init_generation_image_id: body.init_generation_image_id
        ? body.init_generation_image_id
        : null,
      init_image_id: body.init_image_id ? body.init_image_id : null,
      init_strength: body.init_strength ? body.init_strength : null, // null or 0.1 - 0.9
      scheduler: body.scheduler ? body.scheduler : null, // string
      tiling: body.tiling ? body.tiling : false,
      public: body.public ? body.public : false,
      promptMagic: body.promptMagic ? body.promptMagic : true,
    };

    // TODO: Do the try catch dance here... lets make it generic
    const fetched = await fetch(`${this.baseUrl}/generations`, {
      ...this.baseConfiguration,
      method: 'POST',
      body: JSON.stringify(bodyParams),
    });

    const result = await fetched.json();

    return result;
  }
}
