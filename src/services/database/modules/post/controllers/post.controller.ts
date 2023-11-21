import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { Post } from "../entities/post.entity";
import { User } from "../../users/user.entity";


class PostController {
    async createPost(req: Request, res: Response) {
        try {
          const requestingUser = res.locals.user as User;

          const { title, image_url } = req.body;
          const post = await AppDataSource.getRepository(Post).save({
            title: title,
            image_url: image_url,
            user_id: requestingUser.id,
          }); 

          return res.status(201).send({ ok: true, post })
        } catch (error) {
            console.log(error, "Error in createPost");
            return res.status(500).send({ ok: false, error: "error-creating-post"});
        }
    }

    async listPosts(req: Request, res: Response) {
      try {
        const posts = await AppDataSource.getRepository(Post).find({
          relations: ["user"],
        });
  
        return res.status(200).send({ ok: true, posts });
      } catch (error) {
        console.log(error, "Error in listPosts");
        return res.status(500).send({ ok: false, error: "error-listing-posts" });
      }
    }
    
    async updatePost( req: Request, res: Response) {
      try {
        const { title, image_url } = req.body;
        const post = await AppDataSource.getRepository(Post).findOne({
          where: { id: +req.params.post_id },
        });
         if (!post) {
            return res.status(404).json({ ok: false, error: "post-not-found" });
         }

         if (title !== undefined) {
          post.title = title;
         }

         if (image_url !== undefined) {
          post.image_url = image_url;
         }

         await AppDataSource.getRepository(Post).save(post);
         console.log(`Post ${post.id} updated`);

         return res.status(200).json({ ok: true, post });
      } catch (error) {
          console.log(error, "Error in updatePost");
          res.status(500).send({ ok: false, error: "error-updating-post" });
      }
    }

    async deletePost(req: Request, res: Response) {
      try {
        const post = await AppDataSource.getRepository(Post).findOne({
          where: { id: +req.params.post_id },
        });
        if (!post) {
          return res.status(404).json({ ok: false, error: "post-not-found" });
        }

        await AppDataSource.getRepository(Post).softDelete(post);
        console.log(`Post ${post.id} deleted`);

        return res.status(200).json({ ok: true, message: "Publicação deletada com sucesso" });
      } catch (error) {
          console.log(error, "Error in deletePost");
          res.status(500).send({ ok: false, error: "error-deleting-post" });
      }
    }
} 

export default new PostController();