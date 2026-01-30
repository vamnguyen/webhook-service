import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(Webhook)
    private readonly webhookRepository: Repository<Webhook>,
  ) {}

  async create(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
    this.logger.log(
      `Receiving webhook from source: ${createWebhookDto.source}, event: ${createWebhookDto.event}`,
    );

    const webhook = this.webhookRepository.create(createWebhookDto);
    const savedWebhook = await this.webhookRepository.save(webhook);

    this.logger.log(`Webhook saved with ID: ${savedWebhook.id}`);
    return savedWebhook;
  }

  async findAll(): Promise<{ webhooks: Webhook[]; count: number }> {
    const [webhooks, count] = await this.webhookRepository.findAndCount({
      order: { receivedAt: 'DESC' },
    });

    return { webhooks, count };
  }

  async findOne(id: string): Promise<Webhook> {
    const webhook = await this.webhookRepository.findOne({ where: { id } });

    if (!webhook) {
      throw new NotFoundException(`Webhook with ID "${id}" not found`);
    }

    return webhook;
  }
}
