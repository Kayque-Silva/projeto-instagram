import { Request, Response } from "express";
import { User } from "../../users/user.entity";
import { AppDataSource } from "../../../data-source";
import { Post } from "../../post/entities/post.entity";
import { Like } from "../entities/like.entity";



class LikeController {
    async likePost( req: Request, res: Response ) {
        try {
            const requestingUser = res.locals.user as User;
            const { post_id } = req.params;

            const post = await AppDataSource.getRepository(Post).findOne({
                where: { id: +post_id },
            });

            if(!post) {
                return res.status(404).json({ ok: false, message: "Post not found"});
            }

            const existingLike = await AppDataSource.getRepository(Like).findOne({
                where: { user: requestingUser, post: post },
              });
              
              if (!existingLike) {

                // Se o like não existe, crie e salve um novo like
                const newLike = new Like();
                newLike.user = requestingUser;
                newLike.post = post;
                newLike.liked = true;                
                await AppDataSource.getRepository(Like).save(newLike);

                return res.status(201).json({ ok: true, message: "Postagem curtida com sucesso" });
              } else {
                // Se o like já existe, irá retornar uma mensagem
                return res.status(400).json({ ok: false, error: "A postagem já foi curtida" });
              }
              
        } catch (error) {
            console.log(error);
      return res.status(500).json({ ok: false, error: "Erro ao processar a solicitação" });
        }
    }

    async dislikePost( req: Request, res: Response ) {
        try {
            const requestingUser = res.locals.user as User;
            const { post_id } = req.params;

      const post = await AppDataSource.getRepository(Post).findOne({
        where: { id: +post_id },
    });

      if (!post) {
        return res.status(404).json({ ok: false, error: "Post not found" });
      }

      // Criar novo dislike
      const newDislike = new Like();
      newDislike.user = requestingUser;
      newDislike.post = post;
      newDislike.liked = false;

      await AppDataSource.getRepository(Like).save(newDislike);

      return res.status(201).json({ ok: true, message: "Post disliked successfully" });
    } catch (error) {
      console.log(error, "Error in dislikePost");
      return res.status(500).json({ ok: false, error: "Error disliking the post" });
    }
  }
}

export default new LikeController();
