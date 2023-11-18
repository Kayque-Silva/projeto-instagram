import { Router } from "express";
import { validateJwtUser } from "../../../../../common/middlewares/auth.middleware";
import CommentController from "../controllers/comment..controller";



export const CommentRoutes = (): Router => {
    const router = Router();

    //POST /comments/:post_id
    router.post("/post_id", validateJwtUser, CommentController.createComment);

    //GET /comments/:post_id
    router.get("/:post_id", CommentController.listComments);

    //DELETE /comments/:comment_id
    router.delete("/:comment_id", CommentController.deleteComment);

    return router;
};