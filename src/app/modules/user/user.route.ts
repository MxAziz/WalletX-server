import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

// baseurl/api/v1/user/...

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.register
);

router.get("/me", checkAuth(...Object.values(Role)), userControllers.getMe);

router.patch(
  "/update",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  userControllers.updateUser
);


// only admin access
router.get("/all-users", checkAuth(Role.ADMIN), userControllers.getAllUsers);

router.get("/:id", checkAuth(Role.ADMIN), userControllers.getSingleUser);

export const UserRoutes = router;