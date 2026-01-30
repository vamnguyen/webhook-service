import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateWebhookDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  event: string;

  @IsObject()
  @IsNotEmpty()
  payload: Record<string, unknown>;
}
