import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Badge } from "./Badge";

@Entity()
export class BadgeStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  backgroundColor: string;

  @OneToOne(() => Badge, badge => badge.badgeStyle)
  badge: Badge;

  @Column({ length: 50 })
  textColor: string;
}
