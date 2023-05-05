import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  addDetalleCarrito,
  deleteDetalleCarrito,
  getDetallesCarrito,
  updateDetalleCarrito,
} from "../controller/detalles-carrito.controller";
import { body } from "express-validator";
import { validate } from "../middleware/validation.middleware";

const router = express.Router();

const createDetailCarritoValidator = [
  body("producto")
    .isInt({ min: 1 })
    .withMessage("El producto debe ser un entero"),
  body("cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un entero"),
];

const updateDetailCarritoValidator = [
  body("cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un entero"),
];

router.get("/", authMiddleware, getDetallesCarrito);
router.post(
  "/",
  authMiddleware,
  createDetailCarritoValidator,
  validate,
  addDetalleCarrito
);
router.put(
  "/:id",
  authMiddleware,
  updateDetailCarritoValidator,
  validate,
  updateDetalleCarrito
);
router.delete("/:id", authMiddleware, deleteDetalleCarrito);

export default router;
