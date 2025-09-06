import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus, { StatusCodes } from 'http-status-codes';
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

const updateUser = async (userId: string, payload: Record<string, string>) => {
  if (payload.phone) {
    const phoneExists = await User.findOne({ phone: payload.phone });

    if (phoneExists) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Phone number already exist.");
    }
  }

  const user = await User.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });
  return user;
};

const changePassword = async (
  userId: string,
  payload: { currentPassword: string; newPassword: string }
) => {
  const { currentPassword, newPassword } = payload;

  const user = await User.findById(userId).select("password");
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    currentPassword as string,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Current Password is incorrect"
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  user.password = hashedPassword;
  await user.save();
  const { password: pass, ...userInfo } = user.toObject();

  return userInfo;
};

export const userServices = {
    register,
    getMe,
    updateUser,
    changePassword,
};