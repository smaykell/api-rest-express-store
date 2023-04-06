import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario"
import { Producto } from "./entity/Producto"
import { DetallesCarrito } from "./entity/DetallesCarrito"
import { Categorias } from "./entity/Categorias"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234567",
    database: "prototipo_tienda_nestjs_dev",
    synchronize: true,
    logging: false,
    entities: [Usuario, Producto, DetallesCarrito, Categorias],
    migrations: [],
    subscribers: [],
})
