import { Injectable, Logger } from '@nestjs/common';
import { IWebhookStrategy } from './webhook-strategy.interface';
import { Webhook } from '../entities/webhook.entity';

@Injectable()
export class PaymentCompletedStrategy implements IWebhookStrategy {
  private readonly logger = new Logger(PaymentCompletedStrategy.name);

  async handle(webhook: Webhook): Promise<void> {
    this.logger.log(`Processing payment completion for webhook ${webhook.id}`);
    // Business logic for payment completed...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.logger.log(`Payment completion processed for webhook ${webhook.id}`);
  }
}
