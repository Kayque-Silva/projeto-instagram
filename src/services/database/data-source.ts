import { DataSource } from "typeorm";    // CONFIGURAÇÃO DO BANCO DE DADOS
import { User } from "./modules/users/user.entity";
import { Post } from "./modules/post/entities/post.entity";
import { Comment } from "./modules/comments/entities/comment.entity";
import { Like } from "./modules/like/entities/like.entity";


require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Post, Comment, Like],
    synchronize: true,
});

export async function startDatabase() {
    try {
        await AppDataSource.initialize();
    } catch (error) {
        console.error(error, "Erro ao iniciar banco de dados");
        throw error;
    }
}