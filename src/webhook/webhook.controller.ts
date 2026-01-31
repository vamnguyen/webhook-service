import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import {
  type IWebhookService,
  IWEBHOOK_SERVICE,
} from './interfaces/webhook-service.interface';

@Controller('webhooks')
export class WebhookController {
  constructor(
    @Inject(IWEBHOOK_SERVICE)
    private readonly webhookService: IWebhookService,
  ) {}

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
