import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Producto, (producto) => producto.badges)
  @JoinColumn({ name: "producto_id" })
  producto: Producto;
}
