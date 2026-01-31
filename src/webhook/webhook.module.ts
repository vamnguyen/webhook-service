import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { Webhook } from './entities/webhook.entity';
import { IWEBHOOK_SERVICE } from './interfaces/webhook-service.interface';
import { WebhookStrategyFactory } from './strategies/webhook-strategy.factory';
import { PaymentCompletedStrategy } from './strategies/payment-completed.strategy';
import { DefaultStrategy } from './strategies/default.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Webhook])],
  controllers: [WebhookController],
  providers: [
    WebhookStrategyFactory,
    PaymentCompletedStrategy,
    DefaultStrategy,
    {
      provide: IWEBHOOK_SERVICE,
      useClass: WebhookService,
    },
  ],
  exports: [IWEBHOOK_SERVICE],
})
export class WebhookModule {}
