import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto } from './dto/create-webhook.dto';

describe('WebhookService', () => {
  let service: WebhookService;
  let repository: jest.Mocked<Repository<Webhook>>;

  const mockWebhook: Webhook = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    source: 'stripe',
    event: 'payment.completed',
    payload: { amount: 100 },
    receivedAt: new Date('2026-01-30T00:00:00Z'),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: getRepositoryToken(Webhook),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    repository = module.get(getRepositoryToken(Webhook));

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a webhook', async () => {
      const createDto: CreateWebhookDto = {
        source: 'stripe',
        event: 'payment.completed',
        payload: { amount: 100 },
      };

      repository.create.mockReturnValue(mockWebhook);
      repository.save.mockResolvedValue(mockWebhook);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(mockWebhook);
      expect(result).toEqual(mockWebhook);
    });
  });

  describe('findAll', () => {
    it('should return all webhooks with count', async () => {
      const webhooks = [mockWebhook];
      repository.findAndCount.mockResolvedValue([webhooks, 1]);

      const result = await service.findAll();

      expect(repository.findAndCount).toHaveBeenCalledWith({
        order: { receivedAt: 'DESC' },
      });
      expect(result).toEqual({ webhooks, count: 1 });
    });

    it('should return empty array when no webhooks exist', async () => {
      repository.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.findAll();

      expect(result).toEqual({ webhooks: [], count: 0 });
    });
  });

  describe('findOne', () => {
    it('should return a webhook by id', async () => {
      repository.findOne.mockResolvedValue(mockWebhook);

      const result = await service.findOne(mockWebhook.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockWebhook.id },
      });
      expect(result).toEqual(mockWebhook);
    });

    it('should throw NotFoundException when webhook not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
