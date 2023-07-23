import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { BadgeStyle } from "./BadgeStyle";

@Entity()
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  label: string;

  @OneToOne(() => BadgeStyle, badgeStyle => badgeStyle.badge, { cascade: true })
  @JoinColumn()
  badgeStyle: BadgeStyle;

  @ManyToMany(() => Product, (product) => product.badges)
  products: Product[];
}
