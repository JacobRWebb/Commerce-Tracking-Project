import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Alert } from "./Alert";
import { Application } from "./Application";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: "enum", enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @ManyToMany(() => Application, (application) => application.users)
  applications: Application[];

  @OneToMany(() => Alert, (alert) => alert.user)
  acknowledged_alerts: Alert[];

  @CreateDateColumn({ select: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ select: false })
  updatedAt: Timestamp;
}
