import { Router } from "express";
import PostController from "../controllers/post.controller";
import { validateJwtUser } from "../../../../../common/middlewares/auth.middleware";


export const PostRoutes = (): Router => {
    const router = Router();

    //POST posts
    router.post("/", validateJwtUser, PostController.createPost);

    //GET /posts
    router.post("/", PostController.listPosts);

    return router;
};