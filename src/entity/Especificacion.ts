import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity('especificaciones')
export class Especificacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    especificacion: string;

    // belongs to Producto
    @ManyToOne(() => Producto, (producto) => producto.especificaciones)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

}