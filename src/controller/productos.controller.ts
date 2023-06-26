import { NextFunction, Response } from "express";
import { findAllProductosPaginate, findProductoById } from "../services/productos.service";
import { Request } from "express-jwt";
import { NotFoundException } from "../exception/NotFoundException";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id as string);
    const producto = await findProductoById(id);

    if (!producto)  throw new NotFoundException("Producto no encontrado");

    res.json(producto);
  } catch (err) {
    next(err);
  }
};

export const getProductosPaginate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nombre = req.query.nombre as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const productosPage = await findAllProductosPaginate(page, limit, nombre);

    res.json(productosPage);
  } catch (err) {
    next(err);
  }
};
