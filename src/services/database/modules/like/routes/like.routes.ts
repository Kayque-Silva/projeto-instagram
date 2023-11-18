import { Router } from "express";
import LikeController from "../controllers/like.controller";
import { validateJwtUser } from "../../../../../common/middlewares/auth.middleware";



export const LikeRoutes = (): Router => {
    const router = Router();

    //POST /likes
    router.post("/like/:post_id", validateJwtUser, LikeController.likePost);

    router.post("/dislike/:post_id", validateJwtUser, LikeController.dislikePost);

    return router;
};