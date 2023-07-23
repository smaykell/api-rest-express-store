import * as express from "express";
import { body } from "express-validator";
import {
  addShoppingCarDetail,
  deleteShoppingCarDetail,
  getShoppingCarDetail,
  updateShoppingCarDetail,
} from "../controller/shopping-car-detail.controller";
import authMiddleware from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

const router = express.Router();

const createShoppingCarDetailValidator = [
  body("product")
    .isInt({ min: 1 })
    .withMessage("The product ID must be an integer"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("The quantity must be an integer"),
];

const updateShoppingCarDetailValidator = [
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("The quantity must be an integer"),
];

router.get("/", authMiddleware, getShoppingCarDetail);
router.post(
  "/",
  authMiddleware,
  createShoppingCarDetailValidator,
  validate,
  addShoppingCarDetail
);
router.put(
  "/:id",
  authMiddleware,
  updateShoppingCarDetailValidator,
  validate,
  updateShoppingCarDetail
);
router.delete("/:id", authMiddleware, deleteShoppingCarDetail);

export default router;
