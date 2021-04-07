import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./Application";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column({ select: false })
  @Index()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  @Index()
  role: UserRole;

  @ManyToMany(() => Application, (application) => application.users)
  applications: Application[];

  @CreateDateColumn({ select: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ select: false })
  updatedAt: Timestamp;
}
