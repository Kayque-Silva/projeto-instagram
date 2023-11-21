import { Router } from "express";
import PostController from "../controllers/post.controller";
import { validateJwtUser } from "../../../../../common/middlewares/auth.middleware";
import { validatePostCreationMiddleware } from "../middlewares/validate-post-creation.middleware";


export const PostRoutes = (): Router => {
    const router = Router();

    //POST posts
    router.post("/", validatePostCreationMiddleware, validateJwtUser, PostController.createPost);

    //GET /posts
    router.post("/", PostController.listPosts);

    //PATCH /posts/:post_id
    router.patch("/:post_id", PostController.updatePost);

    //DELETE /posts/:post_id
    router.delete("/:post_id", validateJwtUser, PostController.deletePost);

    return router;
};