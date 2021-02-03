import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
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

  @ManyToMany(() => Application)
  @JoinTable()
  applications: Application[];

  @CreateDateColumn({ select: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ select: false })
  updatedAt: Timestamp;
}
