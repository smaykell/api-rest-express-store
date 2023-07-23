import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

const productRepository = AppDataSource.getRepository(Product);

export const findProductById = async (id: number) => {
  return await productRepository.findOne({
    where: { id },
    relations: [
      "prices",
      "mediaUrls",
      "badges",
      "badges.badgeStyle",
      "meatStickers",
      "meatStickers.meatStickerStyle",
      "especifications",
    ],
  });
};

export const findAllProducts = async () => {
  return await productRepository.find();
};

export const findAllProductsPaginate = async (
  page: number,
  limit: number,
  name: string
) => {
  const findOptionsWhere: FindOptionsWhere<Product> = {};
  if (name) findOptionsWhere.name = Like(`%${name}%`);

  const [result, total] = await productRepository.findAndCount({
    where: findOptionsWhere,
    skip: (page - 1) * limit,
    take: limit,
    relations: [
      "prices",
      "mediaUrls",
      "badges",
      "badges.badgeStyle",
      "meatStickers",
      "meatStickers.meatStickerStyle",
      "especifications",
    ],
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

export const findAllProductsPaginateByCategory = async (
  categoryId: number,
  page: number,
  limit: number,
  name: string
) => {
  const findOptionsWhere: FindOptionsWhere<Product> = {};
  if (name) findOptionsWhere.name = Like(`%${name}%`);

  if (categoryId)
    findOptionsWhere.category = {
      id: categoryId,
    };
  const [result, total] = await productRepository.findAndCount({
    where: findOptionsWhere,
    skip: (page - 1) * limit,
    take: limit,
    relations: [
      "prices",
      "mediaUrls",
      "badges",
      "badges.badgeStyle",
      "meatStickers",
      "meatStickers.meatStickerStyle",
      "especifications",
    ],
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
