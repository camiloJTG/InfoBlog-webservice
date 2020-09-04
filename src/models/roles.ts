import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IRoles {
  roleId: number;
  roleName: string;
  roleCreatedAt: string;
  roleUpdatedAt: string;
}

@Entity()
export class Roles implements IRoles {
  @PrimaryGeneratedColumn()
  roleId!: number;

  @Column({ length: 100, type: 'varchar', nullable: false })
  roleName!: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  roleCreatedAt!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  roleUpdatedAt!: string;
}
