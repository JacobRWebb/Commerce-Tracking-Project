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

  @Column("timestamp", { default: new Date().toISOString() })
  timestamp: Timestamp;

  @Column({ nullable: false })
  hostname: string;

  @ManyToOne(() => User, (user) => user.acknowledged_alerts)
  user: User;

  @ManyToOne(() => Application, (application) => application.alerts)
  application: Application;

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
