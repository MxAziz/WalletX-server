import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { createUserToken } from "../../utils/createUserToken";


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

    const userTokens = createUserToken(isUserExist);
    const { password: pass, ...user } = isUserExist.toObject();

    return {
        ...userTokens,
        user,
    };

};

export const authServices = {
  credentialLogin,
};