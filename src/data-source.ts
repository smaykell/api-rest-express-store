import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entity/Usuario";
import { Producto } from "./entity/Producto";
import { DetallesCarrito } from "./entity/DetallesCarrito";
import { Categorias } from "./entity/Categorias";
import * as dotenv from "dotenv";
import { Especificacion } from "./entity/Especificacion";
import { Media } from "./entity/Media";
import { MdediaURL } from "./entity/MediaURL";
import { Badge } from "./entity/Badge";
import { BadgeStyle } from "./entity/BadgeStyle";
import { MeatSticker } from "./entity/MeatSticker";
import { MeatStickerStyle } from "./entity/MeatStickerStyle";
import { Precio } from "./entity/Precio";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_DATABASE || "prototipo_tienda_expressjs_dev",
  synchronize: true,
  logging: false,
  entities: [
    Usuario,
    Producto,
    DetallesCarrito,
    Categorias,
    Especificacion,
    Media,
    MdediaURL,
    Badge,
    BadgeStyle,
    MeatSticker,
    MeatStickerStyle,
    Precio,
  ],
  migrations: [],
  subscribers: [],
});
