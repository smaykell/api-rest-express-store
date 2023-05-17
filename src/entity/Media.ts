import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto";

@Entity("medias")
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  typo: string;

  @Column({ length: 150 })
  onImageHover: string;

  @OneToOne(() => Producto, (producto) => producto.media)
  @JoinColumn({ name: "producto_id" })
  producto: Producto;
}
