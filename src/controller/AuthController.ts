import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";

export class AuthController {
  private usuarioRepository = AppDataSource.getRepository(Usuario);

  async login(request: Request, response: Response, next: NextFunction) {
    const { correo, clave } = request.body;

    const secretKey = "miClaveSecreta";

    const usuario = await this.usuarioRepository.findOne({
      where: { correo, clave },
    });

    if (!usuario) {
      response.status(404);
      return "Incorrect login credentials!";
    }
  
    const payload = { correo: usuario.correo, sub: usuario.id };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    return {
      accessTokem: token,
    };
  }
}
