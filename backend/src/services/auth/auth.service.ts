import { compare } from "bcrypt";
import { Role } from "../../../prisma/generated/prisma/enums";
import { transport } from "../../config/nodemailer";
import AppError from "../../errors/AppError";
import {
  createUser,
  findUserByEmail,
} from "../../repositories/user/user.repository";
import { LoginResponseTypes, TAuth } from "../../types/auth/auth";
import { VERIFICATION_EMAIL_TEMPLATE } from "../../utils/emailTemplate";
import { generateOtp } from "../../utils/generateOtp";
import { hashPassword } from "../../utils/hash";
import { Response } from "express";
import { generateTokenAndSetCookie } from "../../utils/jwt";

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

  await transport.sendMail({
    from: process.env.MAILER_SENDER,
    to: email,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{otp}", verifyOtp),
  });

  const { password: _, ...userWithOutPassword } = newUser;

  return userWithOutPassword;
};

export const loginService = async (data: LoginResponseTypes, res: Response) => {
  const { email, password } = data;

  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const comparePassword = await compare(password, existingUser.password);
  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateTokenAndSetCookie(res, existingUser);

  const { password: _, ...userWithOutPassword } = existingUser;

  return {
    ...userWithOutPassword,
    token,
  };
};
