import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { createUserToken } from "../../utils/createUserToken";
import { Wallet } from "../wallet/wallet.model";
import { envVars } from "../../config/env";
import { generateToken, verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";


const credentialLogin = async (payload: Partial<IUser>) => {
    const { phone, password } = payload;

    const isUserExist= await User.findOne({ phone }).select('+password');

    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isWalletExist = await Wallet.findOne({ owner: isUserExist._id });

    if (isWalletExist && isWalletExist.isBlocked) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Your Wallet is blocked");
    }

    const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password);

    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid password");
    }

    const userTokens = createUserToken(isUserExist);
    const { password: pass, ...user } = isUserExist.toObject();

    return {
        ...userTokens,
        user,
    };

};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ _id: verifiedRefreshToken.userId });
  if (!isUserExist)
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");

  const JwtPayload = {
    userId: isUserExist._id,
    phone: isUserExist.phone,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    JwtPayload,
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES
  );
  return { accessToken };
};

export const authServices = {
    credentialLogin,
    getNewAccessToken,
};