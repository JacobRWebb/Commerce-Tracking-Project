import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  currentState: number;

  @Column({ nullable: true })
  comment: string;

  @Column("timestamp")
  timeStamp: Timestamp;

  @Column()
  hostname: string;

  @Column()
  application_id: string;

  @Column()
  file: string;

  @Column()
  change_agent: string;

  @Column()
  change_process: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
