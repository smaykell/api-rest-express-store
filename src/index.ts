import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middleware/exception.middleware";
import authRoutes from "./routes/auth.routes";
import categoriasRoutes from "./routes/category.routes";
import detallesCarritoRoutes from "./routes/shopping-car-detail.routes";
import productosRoutes from "./routes/product.routes";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(morgan("dev"));

    app.use(bodyParser.json());

    app.use("/api/auth", authRoutes);
    app.use("/api/categories", categoriasRoutes);
    app.use("/api/products", productosRoutes);
    app.use("/api/shoppingCart", detallesCarritoRoutes);
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
