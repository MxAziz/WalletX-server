import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

// api/v1/...
const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})