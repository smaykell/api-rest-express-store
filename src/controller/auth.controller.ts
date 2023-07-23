import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exception/UnauthorizedException";
import { findUserByEmailAndPassword } from "../services/user.service";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "miClaveSecreta";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmailAndPassword(email, password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: user.email, sub: user.id };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
