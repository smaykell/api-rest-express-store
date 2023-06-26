import { AppDataSource } from "../data-source";
import { DetallesCarrito } from "../entity/DetallesCarrito";
import { NotFoundException } from "../exception/NotFoundException";
import { findProductoById } from "./productos.service";
import { findUsuarioById } from "./usuario.service";

const carritoRepository = AppDataSource.getRepository(DetallesCarrito);

export const findDetallesCarritoByUserId = async (userId: number) => {
  return await carritoRepository.find({
    where: {
      usuario: {
        id: userId,
      },
    },
    relations: ["producto"],
  });
};

export const addDetalleCarritoByUserId = async (
  userId: number,
  productoId: number,
  cantidad: number
) => {
  const usuario = await findUsuarioById(userId);
  const producto = await findProductoById(productoId);

  if (!producto) {
    throw new NotFoundException("Producto no encontrado");
  }

  const detallesCarrito = await findDetallesCarritoByUserId(userId);

  const detalleCarrito = detallesCarrito.find(
    (detalle) => detalle.producto.id === productoId
  );

  // recuperar el precio internetPrice

  const precioInternet = producto.precios.find(
    (precio) => precio.tipo === "internetPrice"
  );

  const precio = precioInternet ? precioInternet : producto.precios[0];

  if (detalleCarrito) {
    detalleCarrito.cantidad = detalleCarrito.cantidad + cantidad;
    detalleCarrito.precio = precio.precio;
    await carritoRepository.save(detalleCarrito);
    return detalleCarrito;
  } else {
    const detalleCarrito = carritoRepository.create({
      cantidad: cantidad,
      producto,
      usuario,
      precio: precio.precio,
    });

    await carritoRepository.save(detalleCarrito);
    delete detalleCarrito.usuario;
    return detalleCarrito;
  }
};

export const updateDetalleCarritoByUserId = async (
  userId: number,
  detalleCarritoId: number,
  cantidad: number
) => {
  const usuario = await findUsuarioById(userId);

  const detalleCarrito = await carritoRepository.findOne({
    where: {
      id: detalleCarritoId,
    },
    relations: ["producto", "usuario"],
  });

  if (!detalleCarrito || detalleCarrito.usuario.id !== usuario.id) {
    throw new NotFoundException("Detalle no encontrado");
  }

  detalleCarrito.cantidad = cantidad;
  await carritoRepository.save(detalleCarrito);
  return detalleCarrito;
};

export const deleteDetalleCarritoByUserId = async (
  userId: number,
  detalleCarritoId: number
) => {
  const usuario = await findUsuarioById(userId);

  const detalleCarrito = await carritoRepository.findOne({
    where: {
      id: detalleCarritoId,
    },
    relations: ["producto", "usuario"],
  });

  if (!detalleCarrito || detalleCarrito.usuario.id !== usuario.id) {
    throw new NotFoundException("Detalle no encontrado");
  }

  await carritoRepository.delete(detalleCarritoId);
  return detalleCarrito;
};
