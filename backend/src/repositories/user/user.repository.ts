import { prisma } from "../../config/prisma";
import { TAuth } from "../../types/auth/auth";

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};

export const createUser = async (data: TAuth) => {
  return await prisma.users.create({
    data,
  });
};
