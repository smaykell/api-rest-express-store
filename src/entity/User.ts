import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShoppingCartDetail } from "./ShoppingCartDetail";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50 })
  password: string;

  @OneToMany(
    () => ShoppingCartDetail,
    (shoppingCartDetail) => shoppingCartDetail.user
  )
  @JoinColumn()
  shoppingCartDetails: ShoppingCartDetail[];
}
