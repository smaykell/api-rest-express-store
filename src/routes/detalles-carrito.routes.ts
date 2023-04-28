import * as express from "express";
import authMiddleware from "../auth.middleware";
import { DetallesCarritoController } from "../controller/DetallesCarritoController";

const detallesCarritoController = new DetallesCarritoController();
const router = express.Router();

router.get("/", authMiddleware, detallesCarritoController.findByUserId);
router.post("/", authMiddleware, detallesCarritoController.addDetalleCarrito);
router.put("/:id", authMiddleware, detallesCarritoController.updateDetalleCarrito);
router.delete("/:id", authMiddleware, detallesCarritoController.deleteDetalleCarrito);

export default router;
