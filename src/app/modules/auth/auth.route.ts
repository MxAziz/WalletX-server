import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { credentialLoginZodSchema } from "./auth.validation";

const router = Router();

// api/v1/auth/...

router.post(
  "/login",
  validateRequest(credentialLoginZodSchema),
  authController.credentialLogin
);

export const AuthRoutes = router;