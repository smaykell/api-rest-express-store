import * as express from "express";
import {
  getCategories,
  getCategoryById,
  getProductsByCategoryPaginate,
} from "../controller/category.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.get("/:id/products", authMiddleware, getProductsByCategoryPaginate);

export default router;
