import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { WalletRoutes } from "../modules/wallet/wallet.route";
import { TransactionRoutes } from "../modules/transaction/transaction.route";

export const router = Router();

// baseurl/api/v1/...
const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/wallets",
        route: WalletRoutes
    },
    {
        path: "/transactions",
        route: TransactionRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})