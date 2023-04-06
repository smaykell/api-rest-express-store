import { NextFunction, Response } from "express";
import { AppDataSource } from "../data-source";
import { Categorias } from "../entity/Categorias";
import { Producto } from "../entity/Producto";
import { FindOptionsWhere, Like } from "typeorm";
import { Request } from "express-jwt";

export class CategoriasController {
  private categoriasRepository = AppDataSource.getRepository(Categorias);
  private productosRepository = AppDataSource.getRepository(Producto);

  async findOne(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const categoria = await this.categoriasRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      response.status(404);
      return "Categoria no encontrada";
    }

    return categoria;
  }

  async findAll(request: Request, response: Response, next: NextFunction) {
    const categorias = await this.categoriasRepository.find();

    return categorias;
  }

  async findAllPaginateByCategoria(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const categoriaId = parseInt(request.params.id);

    const nombre = request.query.nombre as string;
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const findOptionsWhere: FindOptionsWhere<Producto> = {};
    if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

    if (categoriaId)
      findOptionsWhere.categoria = {
        id: categoriaId,
      };

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
