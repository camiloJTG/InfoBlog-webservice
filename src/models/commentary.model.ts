import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from './post.model';
import { Users } from './user.model';

export interface IComments {
  ID: number;
  DESCRIPTION: string;
  CREATED_AT: string;
  UPDATED_AT: string;
  POST: number;
  USER: number;
}

@Entity()
export class Comments implements IComments {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column({ type: 'longtext', nullable: false })
  DESCRIPTION!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;

  @ManyToOne(() => Users, (user) => user.ID, { nullable: false })
  USER!: number;

  @ManyToOne(() => Posts, (post) => post.ID, { nullable: false })
  POST!: number;
}
