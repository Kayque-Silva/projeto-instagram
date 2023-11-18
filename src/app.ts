import express from 'express';
import { UserRoutes } from './services/database/modules/users/routes/user.routes';
import { PostRoutes } from './services/database/modules/post/routes/post.routes';
import { LikeRoutes } from './services/database/modules/like/routes/like.routes';
import { CommentRoutes } from './services/database/modules/comments/routes/comment.routes';

export const app = express();

app.use(express.json())

app.use("/users", UserRoutes());
app.use("/posts", PostRoutes());
app.use("/comments", CommentRoutes());
app.use("/likes", LikeRoutes());


export async function startWebServer() {
    return new Promise((resolve) => { 
        app.listen(process.env.PORT, () => {
            console.log(`Servior escutando na porta ${process.env.PORT}`);
            resolve(null);
        });
    });
}