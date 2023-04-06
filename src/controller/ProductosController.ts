import { AppDataSource } from "../data-source";
import { FindOptionsWhere, Like } from "typeorm";
import { NextFunction, Response } from "express";
import { Producto } from "../entity/Producto";
import { Request } from "express-jwt";

export class ProductosController {
  private productosRepository = AppDataSource.getRepository(Producto);

  async findAll(request: Request, response: Response, next: NextFunction) {
    const nombre = request.query.nombre as string;
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const findOptionsWhere: FindOptionsWhere<Producto> = {};
    if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

    const [result, total] = await this.productosRepository.findAndCount({
      where: findOptionsWhere,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }
}
