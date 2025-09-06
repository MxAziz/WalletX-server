import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { walletControllers } from "./wallet.controller";



const router = Router();

//Both User & Agent Access
router.get("/me", checkAuth(Role.USER, Role.AGENT), walletControllers.myWallet);




export const WalletRoutes = router;