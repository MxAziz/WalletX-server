import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { walletControllers } from "./wallet.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { addMoneyAndCashOutZodSchema } from "./wallet.validation";



const router = Router();

// baseurl/api/v1/wallets/...

//Both User & Agent Access
router.get("/me", checkAuth(Role.USER, Role.AGENT), walletControllers.myWallet);

//only User Access
router.post(
  "/add-money",
  checkAuth(Role.USER, Role.AGENT),
  validateRequest(addMoneyAndCashOutZodSchema),
  walletControllers.addMoney
);


export const WalletRoutes = router;