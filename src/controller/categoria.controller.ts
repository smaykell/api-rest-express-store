import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import {
  findAllCategorias,
  findCategoriaById,
} from "../services/categorias.service";
import { findAllProductosPaginateByCategoria } from "../services/productos.service";

export const getCategoriaById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const categoria = await findCategoriaById(id);

    if (!categoria) {
      res.status(404);
      return "Categoria no encontrada";
    }

    res.json(categoria);
  } catch (err) {
    next(err);
  }
};

export const getCategorias = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categorias = await findAllCategorias();

    res.json(categorias);
  } catch (err) {
    next(err);
  }
};

export const getProductosByCategoriaPaginate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoriaId = parseInt(req.params.id);

    const nombre = req.query.nombre as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const productosPage = await findAllProductosPaginateByCategoria(
      categoriaId,
      page,
      limit,
      nombre
    );

    res.json(productosPage);
  } catch (err) {
    next(err);
  }
};
