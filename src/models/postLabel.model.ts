import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Labels } from './label.model';
import { Posts } from './posts.model';

export interface IPostLabel {
  ID: number;
  POST: number;
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

  @ManyToOne(() => Posts, (post) => post.ID, { nullable: false })
  POST!: number;
}
