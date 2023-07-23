import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  crossed: boolean;

  @Column({ length: 50 })
  label: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ length: 10 })
  simbol: string;

  @Column({ length: 50 })
  type: string;

  @ManyToOne(() => Product, (product) => product.prices)
  @JoinColumn()
  product: Product;
}
