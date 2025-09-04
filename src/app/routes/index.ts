import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

// api/v1/...
const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})