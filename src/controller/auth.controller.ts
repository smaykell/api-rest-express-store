import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { findUsuarioByCorreoAndClave } from "../services/usuario.service";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "miClaveSecreta";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { correo, clave } = req.body;
    const usuario = await findUsuarioByCorreoAndClave(correo, clave);

    if (!usuario) {
      res.status(404);
      return "Incorrect login credentials!";
    }

    const payload = { correo: usuario.correo, sub: usuario.id };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({
      accessTokem: token,
    });
  } catch (err) {
    next(err);
  }
};
