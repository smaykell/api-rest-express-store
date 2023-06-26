import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MeatSticker } from "./MeatSticker";

@Entity("meat_stickers_style")
export class MeatStickerStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  backgroundColor: string;

  @Column({ length: 50 })
  textColor: string;

  @OneToOne(() => MeatSticker, (meatSticker) => meatSticker.meatStickerStyle)
  @JoinColumn({ name: "meat_sticker_id" })
  meatSticker: MeatSticker;
}
