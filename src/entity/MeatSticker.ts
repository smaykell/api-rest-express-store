import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MeatStickerStyle } from "./MeatStickerStyle";
import { Product } from "./Product";

@Entity()
export class MeatSticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  label: string;

  @Column({ length: 50 })
  type: string;

  @OneToOne(
    () => MeatStickerStyle,
    (meatStickerStyle) => meatStickerStyle.meatSticker,
    { cascade: true }
  )
  @JoinColumn()
  meatStickerStyle: MeatStickerStyle;

  @ManyToMany(() => Product, (product) => product.meatStickers)
  products: Product[];
}
