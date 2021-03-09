import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum AlertStatus {
  ALL = "all",
  ACKNOWLEDGED = "acknowledged",
  UNACKNOWLEDGED = "un-acknowledged",
  DECLINED = "declined",
}

@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    type: "enum",
    enum: AlertStatus,
    default: AlertStatus.UNACKNOWLEDGED,
  })
  status: AlertStatus;

  @Column("timestamp", { default: new Date().toISOString() })
  timestamp: Timestamp;

  @ManyToOne(() => User, (user) => user.manageAlerts, {
    eager: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  user: User;

  @Column({ nullable: true })
  comment: string;

  @Column()
  hostname: string;

  @Column()
  file: string;

  @Column()
  changeAgent: string;

  @Column()
  changeProcess: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
