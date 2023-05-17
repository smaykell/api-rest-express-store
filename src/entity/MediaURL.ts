import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity('media_urls')
export class MdediaURL {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    url: string;

    // belongs to Producto
    @ManyToOne(() => Producto, (producto) => producto.mediaUrls)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

}