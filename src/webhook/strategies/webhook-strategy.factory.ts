import { Injectable } from '@nestjs/common';
import { IWebhookStrategy } from './webhook-strategy.interface';
import { PaymentCompletedStrategy } from './payment-completed.strategy';
import { DefaultStrategy } from './default.strategy';

@Injectable()
export class WebhookStrategyFactory {
  constructor(
    private readonly paymentCompletedStrategy: PaymentCompletedStrategy,
    private readonly defaultStrategy: DefaultStrategy,
  ) {}

  getStrategy(event: string): IWebhookStrategy {
    switch (event) {
      case 'payment.completed':
        return this.paymentCompletedStrategy;
      default:
        return this.defaultStrategy;
    }
  }
}
