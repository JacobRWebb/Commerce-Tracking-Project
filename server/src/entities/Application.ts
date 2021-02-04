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
import { User } from "./User";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, nullable: false })
  identifier: string;

  @ManyToMany(() => User, (user) => user.applications)
  users: User[];

  @OneToMany(() => Alert, (alert) => alert.application)
  alerts: Alert[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
