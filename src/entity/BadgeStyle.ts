import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Badge } from "./Badge";

@Entity("badge_style")
export class BadgeStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  backgroundColor: string;

  @OneToOne(() => Badge, (badge) => badge.badgeStyle)
  @JoinColumn({ name: "badge_id" })
  badge: Badge;

  @Column({ length: 50 })
  textColor: string;
}
