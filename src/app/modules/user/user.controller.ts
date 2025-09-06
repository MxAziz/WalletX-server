import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { userServices } from "./user.service";


const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userServices.register(payload);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);


const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    console.log(decodedToken);
    const user = await userServices.getMe(decodedToken.userId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const decodedToken = req.user;
    const user = await userServices.updateUser(decodedToken.userId, payload);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Updated successfully",
      data: user,
    });
  }
);

const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const decodedToken = req.user;
    const user = await userServices.changePassword(
      decodedToken.userId,
      payload
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password Changed successfully",
      data: user,
    });
  }
);



export const userControllers = {
  register,
  getMe,
  updateUser,
  changePassword,
};