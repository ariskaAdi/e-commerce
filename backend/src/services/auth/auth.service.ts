import { Role } from "../../../prisma/generated/prisma/enums";
import AppError from "../../errors/AppError";
import {
  createUser,
  findUserByEmail,
} from "../../repositories/user/user.repository";
import { TAuth } from "../../types/auth/auth";
import { generateOtp } from "../../utils/generateOtp";
import { hashPassword } from "../../utils/hash";

export const registerService = async (data: TAuth) => {
  const { name, email, password, role } = data;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  if (!Object.values(Role).includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const verifyOtp = generateOtp();

  const newUser = await createUser({
    name,
    email,
    password: await hashPassword(password),
    is_verified: false,
    verify_otp: verifyOtp,
    role,
  });

  return newUser;
};

export const loginService = async () => {};
