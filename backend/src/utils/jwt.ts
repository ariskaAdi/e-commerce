import { Response } from "express";
import AppError from "../errors/AppError";
import { sign } from "jsonwebtoken";

export interface UserPayload {
  id: string;
  role: string;
}

export const generateTokenAndSetCookie = (res: Response, user: UserPayload) => {
  if (!process.env.TOKEN_KEY) {
    throw new AppError("TOKEN_KEY is not defined", 500);
  }
  const token = sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.TOKEN_KEY!,
    {
      expiresIn: "1d",
    }
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return token;
};
