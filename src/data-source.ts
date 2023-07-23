import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Badge } from "./entity/Badge";
import { BadgeStyle } from "./entity/BadgeStyle";
import { Category } from "./entity/Category";
import { Especification } from "./entity/Especification";
import { MeatSticker } from "./entity/MeatSticker";
import { MeatStickerStyle } from "./entity/MeatStickerStyle";
import { MediaURL } from "./entity/MediaURL";
import { Price } from "./entity/Price";
import { Product } from "./entity/Product";
import { ShoppingCartDetail } from "./entity/ShoppingCartDetail";
import { User } from "./entity/User";

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
    User,
    Category,
    Product,
    ShoppingCartDetail,
    Especification,
    MediaURL,
    Badge,
    BadgeStyle,
    MeatSticker,
    MeatStickerStyle,
    Price,
  ],
  migrations: [],
  subscribers: [],
});
