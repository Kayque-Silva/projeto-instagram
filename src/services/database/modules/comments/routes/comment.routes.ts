import { Router } from "express";
import { validateJwtUser } from "../../../../../common/middlewares/auth.middleware";
import CommentController from "../controllers/comment..controller";
import { validateCommentCreationMiddleware } from "../middlewares/validate-comment-creation.middleware";



export const CommentRoutes = (): Router => {
    const router = Router();

    //POST /comments/:post_id
    router.post("/post_id", validateCommentCreationMiddleware, validateJwtUser, CommentController.createComment);

    //GET /comments/:post_id
    router.get("/:post_id", CommentController.listComments);

    //DELETE /comments/:comment_id
    router.delete("/:comment_id", validateJwtUser, CommentController.deleteComment);

    return router;
};