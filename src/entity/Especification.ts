import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Especification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  especification: string;

  @ManyToOne(() => Product, (product) => product.especifications)
  @JoinColumn()
  product: Product;
}
