import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './role.model';

export interface IUsers {
  ID: number;
  USERNAME: string;
  PASSWORD: string;
  MAIL: string;
  ROLE: number;
  CREATED_AT: string;
  UPDATED_AT: string;
}

@Entity()
export class Users implements IUsers {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column({ length: 100, type: 'varchar', nullable: false })
  USERNAME!: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  PASSWORD!: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  MAIL!: string;

  @ManyToOne(() => Roles, (role) => role.ID, { nullable: false })
  ROLE!: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  CREATED_AT!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  UPDATED_AT!: string;
}
