import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../services/database/data-source";
import { User } from "../../services/database/modules/users/user.entity";


export async function validateJwtUser( req: Request, res: Response, next: NextFunction) {
    try {
    // BUSCA O TOKEN NO CABEÇALHO AUTHORIZATION
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // VERIFICA SE O TOKEN É VÁLIDO
    const jwtPayLoad = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: number;
        email: string;
    };

    const { id } = jwtPayLoad;

    const user = await AppDataSource.getRepository(User).findOne({
        where: { id },
    });

    if (!user) { return res.status(401).json({ message: "Invalid token" });
    }

    res.locals.user = user;

    next();
 } catch(error) {
    console.log(error, "Error on validateJwtUser");
    return res.status(401).json({ message: "not-possible-to-authenticate"});
 }
}