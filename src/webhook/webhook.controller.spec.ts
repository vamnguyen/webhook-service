import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import {
  type IWebhookService,
  IWEBHOOK_SERVICE,
} from './interfaces/webhook-service.interface';

describe('WebhookController', () => {
  let controller: WebhookController;
  let service: jest.Mocked<IWebhookService>;

  const mockWebhook: Webhook = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    source: 'github',
    event: 'push',
    payload: { ref: 'refs/heads/main' },
    receivedAt: new Date('2026-01-30T00:00:00Z'),
  };

  const mockWebhookService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: IWEBHOOK_SERVICE,
          useValue: mockWebhookService,
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get(IWEBHOOK_SERVICE);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a webhook and return id with message', async () => {
      const createDto: CreateWebhookDto = {
        source: 'github',
        event: 'push',
        payload: { ref: 'refs/heads/main' },
      };

      mockWebhookService.create.mockResolvedValue(mockWebhook);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        id: mockWebhook.id,
        message: 'Webhook received',
      });
    });
  });

  describe('findAll', () => {
    it('should return all webhooks with count', async () => {
      const expected = { webhooks: [mockWebhook], count: 1 };
      mockWebhookService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a single webhook by id', async () => {
      mockWebhookService.findOne.mockResolvedValue(mockWebhook);

      const result = await controller.findOne(mockWebhook.id);

      expect(service.findOne).toHaveBeenCalledWith(mockWebhook.id);
      expect(result).toEqual(mockWebhook);
    });
  });
});
