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
import { User } from "./User";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, nullable: false })
  identifier: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
