import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export const findCategoryById = async (id: number) => {
  return await categoryRepository.findOne({
    where: { id },
  });
};

export const findAllCategories = async () => {
  return await categoryRepository.find();
};
