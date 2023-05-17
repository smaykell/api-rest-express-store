import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetallesCarrito } from "./DetallesCarrito";
import { Categorias } from "./Categorias";
import { Especificacion } from "./Especificacion";
import { Media } from "./Media";
import { MdediaURL } from "./MediaURL";
import { Badge } from "./Badge";
import { MeatSticker } from "./MeatSticker";

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  sku: string;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ length: 255 })
  url: string;

  @Column({ length: 50 })
  marca: string;

  @OneToOne(() => Media, (media) => media.producto)
  media: Media;

  @OneToMany(() => MdediaURL, (mediaUrl) => mediaUrl.producto)
  mediaUrls: MdediaURL[];

  @OneToMany(() => Badge, (badge) => badge.producto)
  badges: Badge[];

  @OneToMany(() => MeatSticker, (meatSticker) => meatSticker.producto)
  meatStickers: MeatSticker[];

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio: number;

  @Column({ type: "int" })
  existencia: number;

  @Column({ length: 200 })
  imagen: string;

  @ManyToOne(() => Categorias, (categoria) => categoria.productos)
  @JoinColumn({ name: "categoria_id" })
  categoria: Categorias;

  @OneToMany(() => DetallesCarrito, (detalle) => detalle.producto)
  detallesCarrito: DetallesCarrito[];

  // has many Especificacion
  @OneToMany(() => Especificacion, (especificacion) => especificacion.producto)
  especificaciones: Especificacion[];
}
