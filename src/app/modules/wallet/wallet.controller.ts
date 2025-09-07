import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { walletServices } from "./wallet.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";



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

const withdrawMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: decodedToken.phone,
      receiver: req.body.receiver,
      amount: req.body.amount,
    };
    const wallet = await walletServices.withdrawMoney(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Money withdraw successfully",
      data: wallet,
    });
  }
);

const sendMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: decodedToken.phone,
      receiver: req.body.receiver,
      amount: req.body.amount,
    };

    if (payload.sender === payload.receiver) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "Sender and Receiver can be same. Choose a valid receiver."
      );
    }
    const wallet = await walletServices.sendMoney(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Send money successfully",
      data: wallet,
    });
  }
);

const cashIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: decodedToken.phone,
      receiver: req.body.receiver,
      amount: req.body.amount,
    };

    const transactionInfo = await walletServices.cashIn(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cash-in successfully",
      data: transactionInfo,
    });
  }
);
const cashOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const payload = {
      sender: req.body.sender,
      receiver: decodedToken.phone,
      amount: req.body.amount,
    };
    const transactionInfo = await walletServices.cashOut(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cash-out successfully",
      data: transactionInfo,
    });
  }
);

export const walletControllers = {
  myWallet,
  addMoney,
  withdrawMoney,
  cashIn,
  cashOut,
  sendMoney,
};