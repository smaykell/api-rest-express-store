import { Request } from "express-jwt";
import { AppDataSource } from "../data-source";
import { DetallesCarrito } from "../entity/DetallesCarrito";
import { NextFunction, Response } from "express";
import { Usuario } from "../entity/Usuario";
import { Producto } from "../entity/Producto";

export class DetallesCarritoController {
  private carritoRepository = AppDataSource.getRepository(DetallesCarrito);
  private usuarioRepository = AppDataSource.getRepository(Usuario);
  private productosRepository = AppDataSource.getRepository(Producto);

  async findByUserId(request: Request, response: Response, next: NextFunction) {
    const userId = parseFloat(request.auth.sub);
    return await this.carritoRepository.find({
      where: {
        usuario: {
          id: userId,
        },
      },
      relations: ["producto"],
    });
  }

  async addDetalleCarrito(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseFloat(request.auth.sub);

    const { producto: productoId, cantidad } = request.body;

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!usuario) {
      response.status(404);
      return "Usuario no encontrado";
    }

    const producto = await this.productosRepository.findOne({
      where: { id: productoId },
    });

    if (!producto) {
      response.status(404);
      return "Producto no encontrado";
    }

    const detallesCarrito = await this.carritoRepository.find({
      where: {
        usuario: {
          id: userId,
        },
      },
      relations: ["producto"],
    });

    const detalleCarrito = detallesCarrito.find(
      (detalle) => detalle.producto.id === producto.id
    );

    if (detalleCarrito) {
      detalleCarrito.cantidad += cantidad;
      return await this.carritoRepository.save(detalleCarrito);
    } else {
      // guardar y al reponder no incluir el usuario en el detalle
      const detalleCarrito = this.carritoRepository.create({
        cantidad: cantidad,
        producto,
        usuario,
      });

      await this.carritoRepository.save(detalleCarrito);
      delete detalleCarrito.usuario;
      return detalleCarrito;
    }
  }

  async updateDetalleCarrito(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseFloat(request.auth.sub);
    const detalleCarritoId = parseInt(request.params.id);
    const { cantidad } = request.body;

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!usuario) {
      response.status(404);
      return "Usuario no encontrado";
    }

    const detalleCarrito = await this.carritoRepository.findOne({
      where: {
        id: detalleCarritoId,
      },
      relations: ["producto", "usuario"],
    });

    if (!detalleCarrito) {
      response.status(404);
      return "Detalle de carrito no encontrado";
    }

    if (detalleCarrito.usuario.id !== usuario.id) {
      response.status(403);
      return "No tienes permiso para modificar este detalle";
    }

    detalleCarrito.cantidad = cantidad;
    await this.carritoRepository.save(detalleCarrito);
    delete detalleCarrito.usuario;

    return detalleCarrito;
  }

  async deleteDetalleCarrito(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseFloat(request.auth.sub);
    const detalleCarritoId = parseInt(request.params.id);

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!usuario) {
      response.status(404);
      return "Usuario no encontrado";
    }

    const detalleCarrito = await this.carritoRepository.findOne({
      where: {
        id: detalleCarritoId,
      },
      relations: ["producto", "usuario"],
    });

    if (!detalleCarrito) {
        response.status(404);
        return "Detalle de carrito no encontrado";
    }

    if (detalleCarrito.usuario.id !== usuario.id) {
      response.status(403);
      return "No tienes permiso para modificar este detalle";
    }

    await this.carritoRepository.delete(detalleCarritoId);

    response.status(204);
    return;
  }
}
