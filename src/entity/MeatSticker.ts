import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MeatStickerStyle } from "./MeatStickerStyle";
import { Producto } from "./Producto";

@Entity("meat_stickers")
export class MeatSticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  label: string;

  @Column({ length: 50 })
  type: string;

  @OneToOne(
    () => MeatStickerStyle,
    (meatStickerStyle) => meatStickerStyle.meatSticker
  )
  meatStickerStyle: MeatStickerStyle;

  @ManyToOne(() => Producto, (producto) => producto.meatStickers)
  @JoinColumn({ name: "producto_id" })
  producto: Producto;
}
