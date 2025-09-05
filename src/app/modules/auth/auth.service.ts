import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";


const credentialLogin = async (payload: Partial<IUser>) => {
    const { phone, password } = payload;

    const isUserExist= await User.findOne({ phone }).select('+password');

    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password);
    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid password");
    }

    return isUserExist;
};

export const authServices = {
  credentialLogin,
};