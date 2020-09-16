import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Labels } from './label.model';
import { Users } from './user.model';

export interface IPostLabel {
  ID: number;
  USER: number;
  LABEL: number;
  CREATED_AT: string;
  UPDATED_AT: string;
}

@Entity()
export class PostLabel implements IPostLabel {
  @PrimaryGeneratedColumn()
  ID!: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;

  @ManyToOne(() => Labels, (label) => label.ID, { nullable: false })
  LABEL!: number;

  @ManyToOne(() => Users, (user) => user.ID, { nullable: false })
  USER!: number;
}
