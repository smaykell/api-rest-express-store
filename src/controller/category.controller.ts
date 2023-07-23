import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { NotFoundException } from "../exception/NotFoundException";
import {
  findAllCategories,
  findCategoryById,
} from "../services/category.service";
import { findAllProductsPaginateByCategory } from "../services/product.service";

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const categoria = await findCategoryById(id);

    if (!categoria) {
      throw new NotFoundException("Categoria not found");
    }

    res.json(categoria);
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categorias = await findAllCategories();

    res.json(categorias);
  } catch (err) {
    next(err);
  }
};

export const getProductsByCategoryPaginate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = parseInt(req.params.id);

    const name = req.query.name as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const productosPage = await findAllProductsPaginateByCategory(
      categoryId,
      page,
      limit,
      name
    );

    res.json(productosPage);
  } catch (err) {
    next(err);
  }
};
