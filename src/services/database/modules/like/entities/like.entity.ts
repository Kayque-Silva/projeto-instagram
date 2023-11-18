import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/user.entity";
import { Post } from "../../post/entities/post.entity";


@Entity("likes")
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column()
    user_id: number;

    @Column({default: true}) // "default" é utilizado para definir um valor padrão, neste caso um campo booleano para indicar "like" ou "dislike"
    liked: boolean;

    @CreateDateColumn()  
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    
    //Relacionamentos
    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Post, (post) => post.likes)
    @JoinColumn({ name: "post_id"})
    post: Post;
}