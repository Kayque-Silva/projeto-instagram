import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { User } from "../../users/user.entity";


@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    post_id: number;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    // Relacionamneto
    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "post_id" })
    post: Post;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "user_id" })
    user: User;
}