import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IImage {
  ID?: number;
  URL: string;
  LOCAL_URL: string;
  REMOTE_ID: string;
  CREATED_AT?: string;
  UPDATED_AT?: string;
}

@Entity()
export class Images implements IImage {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column({ type: 'varchar', nullable: false })
  URL!: string;

  @Column({ type: 'varchar', nullable: false })
  LOCAL_URL!: string;

  @Column({ type: 'varchar', nullable: false })
  REMOTE_ID!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;
}
