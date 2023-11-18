import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController { 
    async createUser(req: Request, res: Response) {
        const { name, email, password, bio } = req.body;
        try {
            // ESSA FUNÇÃO, GARANTE QUE NÃO TENHA USUÁRIOS DUPLICADOS COM O MESMO EMAIL NO SISTEMA.
            
            // VERIFICAR SE O USUÁRIO JA ESXISTE NO BANCO DE DADOS
            const existingUser = await AppDataSource.getRepository(User).findOne({
                where: { email: email},
            });

            // SE O USÁRIO JA EXISTIR, RETORNAR UM ERRO
            if (existingUser) {
                return res.status(400).json({ message: "Usuário já existe" });
            }

            // SE O USUÁRIO NÃO EXISTIR, CRIA UM NOVO USUÁRIO
            const user = await AppDataSource.getRepository(User).save({
                name: name,
                email: email,
                password_hash: bcrypt.hashSync(password, 8),
                bio: bio,
            });

            console.log(`User ${user.id} created`);
            res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
        } catch (error) {
            console.log(error, "Error in createUser");
            return res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }

    async listUsers(req: Request, res: Response) {
        try {
            const users = await AppDataSource.getRepository(User).find({
                select: ["id", "name", "bio", "followers_count", "following_count"],
            });
            return res.status(200).json({ ok: true, users });
        } catch (error) {
            console.log(error, "Error in listUsers");
            return res.status(400).json({ message: "Erro ao listar usuários" });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const user = await AppDataSource.getRepository(User).findOne({
                select: ["id", "name", "bio", "followers_count", "following_count"],
                where: { id: +req.params.user_id },
            });
            return res.status(200).json({ ok: true, user });
        } catch (error) {
            console.log(error, "Error in findOne");
            res.status(500).send({ ok: false, error: "error-findind-user" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { name, bio } = req.body;
            const user = await AppDataSource.getRepository(User).findOne({
                where: { id: +req.params.user_id },
            });

            if (!user) {
                return res.status(404).json({ ok: false, error: "user-not-found" });
            }

            if (name) user.name = name;
            if (bio) user.bio = bio;

            await AppDataSource.getRepository(User).save(user);
            console.log(`User ${user.id} updated`);

            return res.status(200).json({ ok: true, user });
        } catch (error) {
            console.log(error, "Error in updateUser");
            res.status(500).send({ ok: false, error: "error-updating-user" });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await AppDataSource.getRepository(User).findOne({
                where: { id: +req.params.user_id },
            });

            if (!user) {
                return res.status(404).json({ ok: false, error: "user-not-found" });
            }

            await AppDataSource.getRepository(User).softDelete(user);
            console.log(`User ${user.id} deleted`);

            return res.status(200).json({ ok: true, message: "Usuário deletado com sucesso" });
        } catch (error) {
            console.log(error, "Error in deleteUser");
            res.status(500).send({ ok: false, error: "error-deleting-user" });
        }
    }

    async authenticate(req: Request, res: Response) {
        try {
        // COLETANDO OS DADOS DO REQ.BODY
        const { email, password } = req.body;
        // BUSCANDO USUÁRIO PELO EMAIL
        const user = await AppDataSource.getRepository(User).findOne({
            where: { email: email },
        });
        // SE NÃO ENCONTRAR UM USUÁRIO COM ESTE EMAIL, RETORNE ERRO
        if (!user) {
            return res.status(404).json({ ok: false, error: "user-not-found" });
        }
        // COMPARA SENHA ENVIADA NO REQ.BODY COM O HASH ARMAZENADO
        if (!bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ ok: false, error: "invalid-password" });
        }

        // GERANDO TOKEN JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string,);

        // RETORNA O TOKEN PRO USUÁRIO
        return res.status(200).json({ ok: true, token });

        // NESSE CASO SE NADA ACIMA DER CERTO ELE RETONA UM ERRO
       } catch (error) {
        console.log(error, "Error in authenticate");
        res.status(500).send({ ok: false, error: "error-authenticating-user" });
       }  
    }
}
export default new UserController();