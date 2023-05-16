import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { findUsuarioByCorreoAndClave } from "../services/usuario.service";
import { UnauthorizedException } from "../exception/UnauthorizedException";

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
      throw new UnauthorizedException("Usuario o clave incorrectos");
    }

    const payload = { correo: usuario.correo, sub: usuario.id };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
