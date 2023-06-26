import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getProductById, getProductosPaginate } from "../controller/productos.controller";

const router = express.Router();

router.get("/", authMiddleware, getProductosPaginate);
router.get("/:id", authMiddleware, getProductById);

export default router;
