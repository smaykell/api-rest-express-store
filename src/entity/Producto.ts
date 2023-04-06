import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { DetallesCarrito } from './DetallesCarrito';
import { Categorias } from './Categorias';
  
  @Entity('productos')
  export class Producto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 50 })
    nombre: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;
  
    @Column({ type: 'int' })
    existencia: number;
  
    @Column({ length: 200 })
    imagen: string;
  
    @ManyToOne((type) => Categorias, (categoria) => categoria.productos)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categorias;
  
    @OneToMany((type) => DetallesCarrito, (detalle) => detalle.producto)
    detallesCarrito: DetallesCarrito[];
  }
  