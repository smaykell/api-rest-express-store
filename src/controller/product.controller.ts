import { NextFunction, Response } from "express";
import {
  findAllProductsPaginate,
  findProductById,
} from "../services/product.service";
import { Request } from "express-jwt";
import { NotFoundException } from "../exception/NotFoundException";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id as string);
    const product = await findProductById(id);

    if (!product) throw new NotFoundException("Product not found");

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductsPaginate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.query.name as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const productsPage = await findAllProductsPaginate(page, limit, name);

    res.json(productsPage);
  } catch (err) {
    next(err);
  }
};
