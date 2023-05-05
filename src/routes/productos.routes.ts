import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getProductosPaginate } from "../controller/productos.controller";

const router = express.Router();

router.get("/", authMiddleware, getProductosPaginate);

export default router;
