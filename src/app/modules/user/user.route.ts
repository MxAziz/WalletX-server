import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();

// api/v1/user/...

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.register
);


export const UserRoutes = router;