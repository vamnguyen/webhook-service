import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Webhook } from './entities/webhook.entity';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createWebhookDto: CreateWebhookDto,
  ): Promise<{ id: string; message: string }> {
    const webhook = await this.webhookService.create(createWebhookDto);
    return {
      id: webhook.id,
      message: 'Webhook received',
    };
  }

  @Get()
  async findAll(): Promise<{ webhooks: Webhook[]; count: number }> {
    return this.webhookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Webhook> {
    return this.webhookService.findOne(id);
  }
}
