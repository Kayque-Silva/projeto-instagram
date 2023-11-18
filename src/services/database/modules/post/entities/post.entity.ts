import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/user.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Like } from "../../like/entities/like.entity";


@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_url: string;

    @Column()
    label: string;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    // Relacionamentos
    @ManyToOne(() => User, (user) => user.posts)  //Essa linha de código define um relacionamento de muitos-para-um, entre as entidades Post e User, onde cada post pertence a um único usuário.
    @JoinColumn({name:"user_id"})  // É usado como a chave estrangeira para representar essa associação.
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];

}