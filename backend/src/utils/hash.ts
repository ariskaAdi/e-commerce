import { genSalt, hash } from "bcrypt";

export const hashPassword = async (
  password: string,
  salRounds: number = 10
) => {
  const salt = await genSalt(salRounds);
  return await hash(password, salt);
};
