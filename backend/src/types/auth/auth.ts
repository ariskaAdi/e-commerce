import { Role } from "../../../prisma/generated/prisma/enums";

export type TAuth = {
  name: string;
  email: string;
  password: string;
  profile_picture?: string | null;
  is_verified: boolean;
  verify_otp?: string | null;
  role: Role;
};

export type LoginResponseTypes = {
  email: string;
  password: string;
};
