import { Webhook } from '../entities/webhook.entity';
import { CreateWebhookDto } from '../dto/create-webhook.dto';

export const IWEBHOOK_SERVICE = 'IWEBHOOK_SERVICE';

export interface IWebhookService {
  create(createWebhookDto: CreateWebhookDto): Promise<Webhook>;
  findAll(): Promise<{ webhooks: Webhook[]; count: number }>;
  findOne(id: string): Promise<Webhook>;
}
