import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('webhooks')
export class Webhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  source: string;

  @Column({ type: 'varchar', length: 255 })
  event: string;

  @Column({ type: 'jsonb' })
  payload: Record<string, unknown>;

  @CreateDateColumn({ name: 'received_at' })
  receivedAt: Date;
}
