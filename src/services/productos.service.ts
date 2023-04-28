import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";

const productosRepository = AppDataSource.getRepository(Producto);

export const findProductoById = async (id: number) => {
  return await productosRepository.findOne({
    where: { id },
  });
};

export const findAllProductos = async () => {
  return await productosRepository.find();
};

export const findAllProductosPaginate = async (
  page: number,
  limit: number,
  nombre: string
) => {
  const findOptionsWhere: FindOptionsWhere<Producto> = {};
  if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

  const [result, total] = await productosRepository.findAndCount({
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
};

export const findAllProductosPaginateByCategoria = async (
  categoriaId: number,
  page: number,
  limit: number,
  nombre: string
) => {
  const findOptionsWhere: FindOptionsWhere<Producto> = {};
  if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

  if (categoriaId)
    findOptionsWhere.categoria = {
      id: categoriaId,
    };
  const [result, total] = await productosRepository.findAndCount({
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
};
