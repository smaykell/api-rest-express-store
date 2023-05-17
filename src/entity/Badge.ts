import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto";
import { BadgeStyle } from "./BadgeStyle";

@Entity("badges")
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  label: string;

  @OneToOne(() => BadgeStyle, (badgeStyle) => badgeStyle.badge)
  badgeStyle: BadgeStyle;

  @OneToOne(() => Producto, (producto) => producto.badges)
  @JoinColumn({ name: "producto_id" })
  producto: Producto;
}
