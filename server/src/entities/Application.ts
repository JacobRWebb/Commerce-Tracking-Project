import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@Index(["id", "name", "createdAt", "updatedAt"])
export class Application extends BaseEntity {
  @PrimaryColumn("text")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.applications)
  @JoinTable()
  users: User[];

  @CreateDateColumn({ select: false })
  createdAt: Timestamp;
  @UpdateDateColumn({ select: false })
  updatedAt: Timestamp;
}
