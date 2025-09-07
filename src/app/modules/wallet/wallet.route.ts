import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { walletControllers } from "./wallet.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { addMoneyAndCashOutZodSchema, sendWithdrawAndCashInZodSchema } from "./wallet.validation";



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

router.post(
  "/withdraw-money",
  checkAuth(Role.USER),
  validateRequest(sendWithdrawAndCashInZodSchema),
  walletControllers.withdrawMoney
);

router.post(
  "/send-money",
  checkAuth(Role.USER),
  validateRequest(sendWithdrawAndCashInZodSchema),
  walletControllers.sendMoney
);


// Only Agent access
router.post(
  "/cash-in",
  checkAuth(Role.AGENT),
  validateRequest(sendWithdrawAndCashInZodSchema),
  walletControllers.cashIn
);

router.post(
  "/cash-out",
  checkAuth(Role.AGENT),
  validateRequest(addMoneyAndCashOutZodSchema),
  walletControllers.cashOut
);


//only Admin Access
router.get("/all", checkAuth(Role.ADMIN), walletControllers.getAllWallets);


router.get("/:id", checkAuth(Role.ADMIN), walletControllers.getSingleWallet);

export const WalletRoutes = router;