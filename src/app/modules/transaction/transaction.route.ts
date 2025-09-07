import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { transactionControllers } from "./transaction.controller";


const router = Router();

// // baseurl/api/v1/transactions/...

router.get(
  "/me",
  checkAuth(Role.USER, Role.AGENT),
  transactionControllers.myTransactions
);






export const TransactionRoutes = router;