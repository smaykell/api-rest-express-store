import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await userRepository.findOne({
    where: { email, password },
  });
};

export const findUserById = async (id: number) => {
  return await userRepository.findOne({
    where: { id },
  });
};
