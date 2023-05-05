import { Request } from "express-jwt";
import { NextFunction, Response } from "express";
import {
  addDetalleCarritoByUserId,
  deleteDetalleCarritoByUserId,
  findDetallesCarritoByUserId,
  updateDetalleCarritoByUserId,
} from "../services/detalles-carrito.service";
import { DetallesCarrito } from "../entity/DetallesCarrito";

type ItemResponse = {
  id: number;
  img: string;
  nombre: string;
  precio: number;
  cantidad: number;
  sku: string;
};

type DetallesCarritoResponse = {
  cantidad: number;
  items: ItemResponse[];
  subtotal: number;
};

const detallesCarritoToDetallesCarritoResponse = (
  detallesCarrito: DetallesCarrito[]
): DetallesCarritoResponse => {
  const detallesCarritoResponse: DetallesCarritoResponse = {
    cantidad: 0,
    items: [],
    subtotal: 0,
  };

  if (detallesCarrito.length === 0) {
    return detallesCarritoResponse;
  } else {
    // recorrer detalles de carrito, calcular cantidad y subtotal
    detallesCarrito.forEach((detalleCarrito) => {
      detallesCarritoResponse.cantidad += detalleCarrito.cantidad;
      detallesCarritoResponse.subtotal +=
        detalleCarrito.cantidad * detalleCarrito.precio;

      // crear item
      const item: ItemResponse = {
        id: detalleCarrito.id,
        img: detalleCarrito.producto.imagen,
        nombre: detalleCarrito.producto.nombre,
        precio: parseFloat(detalleCarrito.precio.toString()),
        cantidad: detalleCarrito.cantidad,
        sku: "",
      };

      // agregar item a items
      detallesCarritoResponse.items.push(item);
    });
  }

  return detallesCarritoResponse;
};

export const getDetallesCarrito = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const detallesCarrito = await findDetallesCarritoByUserId(userId);
    return res.json(detallesCarritoToDetallesCarritoResponse(detallesCarrito));
  } catch (err) {
    next(err);
  }
};

export const addDetalleCarrito = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const { producto, cantidad } = req.body;
    const detallesCarrito = await addDetalleCarritoByUserId(
      userId,
      producto,
      cantidad
    );
    return res.status(201).json({
      id: detallesCarrito.id,
      url: `/detalles-carrito`,
    });
  } catch (err) {
    next(err);
  }
};

export const updateDetalleCarrito = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const detalleCarritoId = parseInt(req.params.id);
    const { cantidad } = req.body;

    const detallesCarrito = await updateDetalleCarritoByUserId(
      userId,
      detalleCarritoId,
      cantidad
    );

    return res.json({
      id: detallesCarrito.id,
      url: `/detalles-carrito`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteDetalleCarrito = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const detalleCarritoId = parseInt(req.params.id);

    await deleteDetalleCarritoByUserId(userId, detalleCarritoId);

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
