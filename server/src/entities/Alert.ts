import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./Application";
import { User } from "./User";

@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: 0, nullable: true })
  currentState: number;

  @Column({ nullable: true })
  comment: string;

  @Column("timestamp")
  timeStamp: Timestamp;

  @Column({ nullable: false })
  hostname: string;

  @OneToOne(() => User, { nullable: true })
  acknowledged_user: User;

  @OneToOne(() => Application)
  application_id: Application;

  @Column({ nullable: false })
  file: string;

  @Column({ nullable: false })
  change_agent: string;

  @Column({ nullable: false })
  change_process: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
