import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class MediaURL {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    url: string;

    // belongs to Producto
    @ManyToOne(() => Product, (product) => product.mediaUrls)
    @JoinColumn()
    product: Product;

}