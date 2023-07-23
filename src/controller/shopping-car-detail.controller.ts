import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ShoppingCartDetail } from "../entity/ShoppingCartDetail";
import {
  addShoppingCarDetailByUserId,
  deleteShoppingCarDetailByUserId,
  findShoppingCarDetailsByUserId,
  updateShoppingCarDetailByUserId,
} from "../services/shopping-cart-detail.service";

type ItemResponse = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sku: string;
};

type ShoppingCarDetailResponse = {
  quantity: number;
  items: ItemResponse[];
  subtotal: number;
};

const shoppingCarDetailToShoppingCarDetailResponse = (
  shoppingCarDetails: ShoppingCartDetail[]
): ShoppingCarDetailResponse => {
  const shoppingCarDetailResponse: ShoppingCarDetailResponse = {
    quantity: 0,
    items: [],
    subtotal: 0,
  };

  if (shoppingCarDetails.length !== 0) {
    shoppingCarDetails.forEach((shoppingCarDetails) => {
      shoppingCarDetailResponse.quantity += shoppingCarDetails.quantity;
      shoppingCarDetailResponse.subtotal +=
        shoppingCarDetails.quantity * shoppingCarDetails.price;
      const item: ItemResponse = {
        id: shoppingCarDetails.id,
        name: shoppingCarDetails.product.name,
        price: parseFloat(shoppingCarDetails.price.toString()),
        quantity: shoppingCarDetails.quantity,
        sku: "",
      };
      shoppingCarDetailResponse.items.push(item);
    });
  }

  return shoppingCarDetailResponse;
};

export const getShoppingCarDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const shoppingCarDetails = await findShoppingCarDetailsByUserId(userId);
    return res.json(
      shoppingCarDetailToShoppingCarDetailResponse(shoppingCarDetails)
    );
  } catch (err) {
    next(err);
  }
};

export const addShoppingCarDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const { product, quantity } = req.body;
    const shoppingCarDetail = await addShoppingCarDetailByUserId(
      userId,
      product,
      quantity
    );
    return res.status(201).json({
      id: shoppingCarDetail.id,
      url: `/api/shoppingCart`,
    });
  } catch (err) {
    next(err);
  }
};

export const updateShoppingCarDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const shoppingCarDetailId = parseInt(req.params.id);
    const { quantity } = req.body;

    const shoppingCarDetail = await updateShoppingCarDetailByUserId(
      userId,
      shoppingCarDetailId,
      quantity
    );

    return res.json({
      id: shoppingCarDetail.id,
      url: `/api/shoppingCart`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteShoppingCarDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseFloat(req.auth.sub);
    const shoppingCarDetailId = parseInt(req.params.id);

    await deleteShoppingCarDetailByUserId(userId, shoppingCarDetailId);

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
