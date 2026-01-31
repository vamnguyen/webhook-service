import { Injectable, Logger } from '@nestjs/common';
import { IWebhookStrategy } from './webhook-strategy.interface';
import { Webhook } from '../entities/webhook.entity';

@Injectable()
export class DefaultStrategy implements IWebhookStrategy {
  private readonly logger = new Logger(DefaultStrategy.name);

  async handle(webhook: Webhook): Promise<void> {
    this.logger.log(`No specific strategy found for event: ${webhook.event}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.logger.log(`Default strategy processed for webhook ${webhook.id}`);
  }
}
