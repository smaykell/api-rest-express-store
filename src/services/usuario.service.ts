import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export const findUsuarioByCorreoAndClave = async (
  correo: string,
  clave: string
) => {
  return await usuarioRepository.findOne({
    where: { correo, clave },
  });
};
