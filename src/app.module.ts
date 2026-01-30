import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookModule } from './webhook/webhook.module';
import { Webhook } from './webhook/entities/webhook.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.docker'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER', 'webhook_user'),
        password: configService.get<string>(
          'POSTGRES_PASSWORD',
          'webhook_password',
        ),
        database: configService.get<string>('POSTGRES_DB', 'webhook_db'),
        entities: [Webhook],
        synchronize: true, // Disable in production!
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
