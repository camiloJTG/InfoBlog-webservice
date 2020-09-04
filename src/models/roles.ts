import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IRoles {
  ID: number;
  NAME: string;
  CREATED_AT: string;
  UPDATED_AT: string;
}

@Entity()
export class Roles implements IRoles {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column({ length: 100, type: 'varchar', nullable: false })
  NAME!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;
}
