import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { changePasswordZodSchema, createUserZodSchema, updateUserZodSchema } from "./user.validation";
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

router.patch(
  "/change-password",
  checkAuth(...Object.values(Role)),
  validateRequest(changePasswordZodSchema),
  userControllers.changePassword
);

// possible to approved users as agent
router.patch(
  "/approve-agent/:id",
  checkAuth(Role.ADMIN),
  userControllers.approveAgent
);

router.patch(
  "/suspend-agent/:id",
  checkAuth(Role.ADMIN),
  userControllers.suspendAgent
);

// only admin access
router.get("/all-users", checkAuth(Role.ADMIN), userControllers.getAllUsers);

router.get("/:id", checkAuth(Role.ADMIN), userControllers.getSingleUser);

export const UserRoutes = router;