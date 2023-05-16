import { AppDataSource } from "./data-source";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import authRoutes from "./routes/auth.routes";
import categoriasRoutes from "./routes/categorias.routes";
import detallesCarritoRoutes from "./routes/detalles-carrito.routes";
import productosRoutes from "./routes/productos.routes";
import { errorHandler } from "./middleware/exception.middleware";
import * as morgan from "morgan";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(morgan('dev'))

    app.use(bodyParser.json());

    app.use("/auth", authRoutes);
    app.use("/categorias", categoriasRoutes);
    app.use("/productos", productosRoutes);
    app.use("/detalles-carrito", detallesCarritoRoutes);
    app.use(errorHandler);

    app.all("*", (req, res) =>
      res.status(404).json({ message: "Route not found" })
    );

    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/ to see results"
    );
  })
  .catch((error) => console.log(error));
