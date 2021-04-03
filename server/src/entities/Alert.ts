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
  id: number;

  @Index()
  @Column({
    type: "enum",
    enum: AlertStatus,
    default: AlertStatus.UNACKNOWLEDGED,
  })
  status: AlertStatus;

  @Index()
  @Column("timestamp", { default: new Date().toISOString() })
  timestamp: Timestamp;

  @Index()
  @ManyToOne(() => Application, { eager: true, cascade: true })
  application: Application;

  @Index()
  @ManyToOne(() => User, { eager: true, onDelete: "SET NULL" })
  user: User;

  @Index()
  @Column({ nullable: true })
  comment: string;

  @Index()
  @Column()
  hostname: string;

  @Index()
  @Column()
  file: string;

  @Index()
  @Column()
  changeAgent: string;

  @Index()
  @Column()
  changeProcess: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
