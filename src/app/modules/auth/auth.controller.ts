import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



const credentialLogin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "Login successful",
            data: ""
        })
    }
)