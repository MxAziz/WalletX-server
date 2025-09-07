import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { transactionServices } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



const myTransactions = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const decodedToken = req.user;

        const query = req.query;
        const result = await transactionServices.myTransactions( decodedToken.userId, query as Record<string, string>);

        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "User Transactions retrieved successfully",
          meta: result.meta,
          data: result.data,
        });
    }
);

const getAllTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await transactionServices.getAllTransactions(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Transactions retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);


export const transactionControllers = {
    myTransactions,
    getAllTransactions,
};