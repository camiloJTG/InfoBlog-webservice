import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Images } from './images.model';
import { Users } from './user.model';

export interface IPosts {
  ID?: number;
  TITLE: string;
  DESCRIPTION: string;
  CREATED_AT?: string;
  UPDATED_AT?: string;
  USER: number;
  IMAGE: Images;
}

@Entity()
export class Posts implements IPosts {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column({ type: 'varchar', nullable: false, length: 500 })
  TITLE!: string;

  @Column({ type: 'longtext', nullable: false })
  DESCRIPTION!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;

  @ManyToOne(() => Users, (user) => user.ID, { nullable: false })
  USER!: number;

  @OneToOne(() => Images)
  @JoinColumn()
  IMAGE!: Images;
}
