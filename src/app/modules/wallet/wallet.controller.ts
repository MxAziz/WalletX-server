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

const addMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: req.body.sender,
      receiver: decodedToken.phone,
      amount: req.body.amount,
    };
    const wallet = await walletServices.addMoney(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Money added successfully",
      data: wallet,
    });
  }
);


export const walletControllers = {
  myWallet,
  addMoney,
};