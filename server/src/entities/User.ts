import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Alert } from "./Alert";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Alert, (alert) => alert.user, {
    onDelete: "DEFAULT",
  })
  manageAlerts: Alert[];

  @Column({ type: "timestamp", default: new Date().toISOString() })
  lastLogout: string;

  @CreateDateColumn({ select: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ select: false })
  updatedAt: Timestamp;
}
