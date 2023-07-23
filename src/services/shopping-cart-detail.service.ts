import { AppDataSource } from "../data-source";
import { ShoppingCartDetail } from "../entity/ShoppingCartDetail";
import { NotFoundException } from "../exception/NotFoundException";
import { findProductById } from "./product.service";
import { findUserById } from "./user.service";

const shoppingCarDetailRepository =
  AppDataSource.getRepository(ShoppingCartDetail);

export const findShoppingCarDetailsByUserId = async (userId: number) => {
  return await shoppingCarDetailRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: ["product"],
  });
};

export const addShoppingCarDetailByUserId = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const user = await findUserById(userId);
  const product = await findProductById(productId);

  if (!product) {
    throw new NotFoundException("Product not found");
  }

  const shoppingCarDetails = await findShoppingCarDetailsByUserId(userId);

  const shoppingCarDetail = shoppingCarDetails.find(
    (shoppingCarDetail) => shoppingCarDetail.product.id === productId
  );

  const priceInternet = product.prices.find(
    (precio) => precio.type === "internetPrice"
  );

  const price = priceInternet ? priceInternet : product.prices[0];

  if (shoppingCarDetail) {
    shoppingCarDetail.quantity = shoppingCarDetail.quantity + quantity;
    shoppingCarDetail.price = price.price;
    await shoppingCarDetailRepository.save(shoppingCarDetail);
    return shoppingCarDetail;
  } else {
    const newShoppingCarDetail = shoppingCarDetailRepository.create({
      quantity: quantity,
      product,
      user,
      price: price.price,
    });

    await shoppingCarDetailRepository.save(newShoppingCarDetail);
    delete newShoppingCarDetail.user;
    return newShoppingCarDetail;
  }
};

export const updateShoppingCarDetailByUserId = async (
  userId: number,
  shoppingCarDetailId: number,
  quantity: number
) => {
  const user = await findUserById(userId);

  const shoppingCarDetail = await shoppingCarDetailRepository.findOne({
    where: {
      id: shoppingCarDetailId,
    },
    relations: ["product", "user"],
  });

  if (!shoppingCarDetail || shoppingCarDetail.user.id !== user.id) {
    throw new NotFoundException("ShoppingCarDetail not found");
  }

  shoppingCarDetail.quantity = quantity;
  await shoppingCarDetailRepository.save(shoppingCarDetail);
  return shoppingCarDetail;
};

export const deleteShoppingCarDetailByUserId = async (
  userId: number,
  shoppingCarDetailId: number
) => {
  const user = await findUserById(userId);

  const shoppingCarDetail = await shoppingCarDetailRepository.findOne({
    where: {
      id: shoppingCarDetailId,
    },
    relations: ["product", "user"],
  });

  if (!shoppingCarDetail || shoppingCarDetail.user.id !== user.id) {
    throw new NotFoundException("ShoppingCarDetail not found");
  }

  await shoppingCarDetailRepository.delete(shoppingCarDetail);
  return shoppingCarDetail;
};
