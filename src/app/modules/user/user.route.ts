import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// api/v1/user/...

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.register
);

router.get("/me", checkAuth(...Object.values(Role)), userControllers.getMe);


export const UserRoutes = router;