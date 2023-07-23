import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShoppingCartDetail } from "./ShoppingCartDetail";
import { Category } from "./Category";
import { Especification } from "./Especification";
import { MediaURL } from "./MediaURL";
import { Badge } from "./Badge";
import { MeatSticker } from "./MeatSticker";
import { Price } from "./Price";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  sku: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255 })
  url: string;

  @Column({ length: 50 })
  brand: string;

  @OneToMany(() => MediaURL, (mediaUrl) => mediaUrl.product)
  mediaUrls: MediaURL[];

  @ManyToMany(() => Badge, (badge) => badge.products)
  @JoinTable()
  badges: Badge[];

  @ManyToMany(() => MeatSticker, (meatSticker) => meatSticker.products)
  @JoinTable()
  meatStickers: MeatSticker[];

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[];

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "int" })
  stock: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  @OneToMany(
    () => ShoppingCartDetail,
    (shoppingCartDetail) => shoppingCartDetail.product
  )
  shoppingCartDetail: ShoppingCartDetail[];

  @OneToMany(
    () => Especification,
    (especification) => especification.product
  )
  especifications: Especification[];
}
