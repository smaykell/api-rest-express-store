import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Usuario } from './Usuario';
import { Producto } from './Producto';
  
  @Entity('detalles_carrito')
  export class DetallesCarrito {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    cantidad: number;
  
    @ManyToOne(() => Producto, (producto) => producto.detallesCarrito)
    @JoinColumn({ name: 'producto_id' })
    producto: Producto;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;
  
    @ManyToOne(() => Usuario, (usuario) => usuario.detallesCarrito)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
  }
  