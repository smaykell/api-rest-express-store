import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto";

@Entity("precios")
export class Precio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  crousado: boolean;

  @Column({ length: 50 })
  etiqueta: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio: number;

  @Column({ length: 10 })
  simbolo: string;

  @Column({ length: 50 })
  tipo: string;

  @ManyToOne(() => Producto, (producto) => producto.precios)
  @JoinColumn({ name: "producto_id" })
  producto: Producto;
}
