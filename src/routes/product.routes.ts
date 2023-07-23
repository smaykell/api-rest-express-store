import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getProductById, getProductsPaginate } from "../controller/product.controller";

const router = express.Router();

router.get("/", authMiddleware, getProductsPaginate);
router.get("/:id", authMiddleware, getProductById);

export default router;
