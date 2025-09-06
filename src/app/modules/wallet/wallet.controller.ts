import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { walletServices } from "./wallet.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



const myWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const info = await walletServices.myWallet(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Wallet retrieved successfully",
      data: info,
    });
  }
);


export const walletControllers = {
  myWallet,
};