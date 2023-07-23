import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MeatSticker } from "./MeatSticker";

@Entity()
export class MeatStickerStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  backgroundColor: string;

  @Column({ length: 50 })
  textColor: string;

  @OneToOne(() => MeatSticker, meatSticker => meatSticker.meatStickerStyle)
  meatSticker: MeatSticker;
}
