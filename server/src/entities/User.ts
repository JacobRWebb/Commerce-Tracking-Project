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

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @ManyToMany(() => Application)
  @JoinTable()
  applications: Application[];

  @CreateDateColumn({ select: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ select: false })
  updatedAt: Timestamp;
}
