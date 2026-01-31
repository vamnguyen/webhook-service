import { Webhook } from '../entities/webhook.entity';

export interface IWebhookStrategy {
  handle(webhook: Webhook): Promise<void>;
}
