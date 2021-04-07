import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./Application";
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
  @Index()
  id: string;

  @Column({
    type: "enum",
    enum: AlertStatus,
    default: AlertStatus.UNACKNOWLEDGED,
  })
  @Index()
  status: AlertStatus;

  @Column("timestamp", { default: new Date().toISOString() })
  timestamp: Timestamp;

  @ManyToOne(() => Application, { eager: true, cascade: true })
  @Index()
  application: Application;

  @ManyToOne(() => User, { eager: true, onDelete: "SET NULL", nullable: true })
  user: User;

  @Column({ nullable: true })
  @Index()
  comment: string;

  @Column()
  @Index()
  hostname: string;

  @Column()
  @Index()
  file: string;

  @Column()
  @Index()
  changeAgent: string;

  @Column()
  @Index()
  changeProcess: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
