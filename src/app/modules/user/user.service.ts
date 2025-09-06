import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';


const register = async (payload: IUser) => {
  const { phone, password, ...rest } = payload;

  const isUserExist = await User.findOne({ phone });
  if (isUserExist)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exist with the Phone Number"
    );

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await User.create({ phone, password: hashedPassword, ...rest });
  const { password: pass, ...userInfo } = user.toObject();

  return userInfo;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId);

  return user;
};

export const userServices = {
    register,
    getMe,
}