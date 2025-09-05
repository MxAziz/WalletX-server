import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";



const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginInfo = await authServices.credentialLogin(payload);

    setAuthCookie(res, loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Login successful",
      data: loginInfo,
    });
  }
);


export const authController = {
  credentialLogin,
};