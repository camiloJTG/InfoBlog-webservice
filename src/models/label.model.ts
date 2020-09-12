import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export interface ILabels {
  ID: number;
  NAME: string;
  CREATED_AT: string;
  UPDATED_AT: string;
}

@Entity()
export class Labels implements ILabels {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  NAME!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;
}
