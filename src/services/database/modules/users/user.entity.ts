import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("users")
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true}) // "unique" serve para não haver o cadastro de dois usuários com o mesmo e-mail.
    email: string;

    @Column()
    bio: string;

    @Column({default: 0}) // "default" é utilizado para definir um valor padrão, nesse caso é zero. já que nessa aplicação o usuário deve começar com zero seguidor.
    followers_count: number; // "seguidores"

    @Column({default: 0})
    following_count: number;  // "seguindo"

    @Column()
    password_hash: string;  //hash é uma medida de segurança para proteger as senhas dos usuários, o sistema faz a comparação da senha fornecida pelo usuário e compara com o hash armazenado no banco de dados.

    @CreateDateColumn()  // Este decorator é usado para marcar a data e hora em que uma entidade foi criada e salva no banco de dados.
    created_at: Date;

    @UpdateDateColumn()  // Semelhante ao decorator anterior esse é usado cada vez que a entidade é atualizada no banco de dados.
    updated_at: Date;

    @DeleteDateColumn()  // Esse Decorator é usado para exclusões de uma propriedade marcando a data e hora em que a entidade foi "deletada".
    deleted_at: Date;

}