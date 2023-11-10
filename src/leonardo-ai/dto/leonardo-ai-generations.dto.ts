import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class LeonardoAiGenerationsDto {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsString()
  negative_prompt?: string;

  @IsOptional()
  @IsString()
  modelId?: string;

  @IsOptional()
  @IsString()
  sd_version?: 'v1_5' | 'v2';

  @IsNumber()
  num_images: number;

  @IsNumber()
  @IsOptional()
  width: number;

  @IsNumber()
  @IsOptional()
  height: number;

  @IsNumber()
  @IsOptional()
  num_inference_steps?: number;

  @IsNumber()
  @IsOptional()
  guidance_scale?: number;

  @IsOptional()
  init_generation_image_id?: any;

  @IsOptional()
  init_image_id?: any;

  @IsOptional()
  init_strength?: any;

  @IsOptional()
  scheduler?: any;

  @IsOptional()
  @IsBoolean()
  tiling?: boolean;

  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @IsBoolean()
  promptMagic?: boolean;

  @IsOptional()
  @IsBoolean()
  alchemy: true;

  @IsOptional()
  @IsBoolean()
  photoReal: boolean;

  @IsOptional()
  @IsNumber()
  photoRealStrength: number;

  @IsOptional()
  @IsString()
  presetStyle: string;
}
