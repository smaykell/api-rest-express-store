import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  getCategoriaById,
  getCategorias,
  getProductosByCategoriaPaginate,
} from "../controller/categoria.controller";

const router = express.Router();

router.get("/", authMiddleware, getCategorias);
router.get("/:id", authMiddleware, getCategoriaById);
router.get("/:id/productos", authMiddleware, getProductosByCategoriaPaginate);

export default router;
