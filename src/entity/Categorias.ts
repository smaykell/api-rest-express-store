import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Producto } from './Producto';
  
  @Entity('categorias')
  export class Categorias {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @OneToMany(() => Producto, (producto) => producto.categoria)
    @JoinColumn({ name: 'categoria_id' })
    productos: Producto[];
  }
  