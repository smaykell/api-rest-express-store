import { AppDataSource } from "../data-source";
import { Categorias } from "../entity/Categorias";

const categoriaRepository = AppDataSource.getRepository(Categorias);

export const findCategoriaById = async (id: number) => {
  return await categoriaRepository.findOne({
    where: { id },
  });
};

export const findAllCategorias = async () => {
  return await categoriaRepository.find();
};
