import express from 'express';
import UserController from './services/database/modules/users/controller/user.controller';
import { UserRoutes } from './services/database/modules/users/routes/user.routes';

export const app = express();

app.use(express.json())

app.use("/users", UserRoutes());

export async function startWebServer() {
    return new Promise((resolve) => { 
        app.listen(process.env.PORT, () => {
            console.log(`Servior escutando na porta ${process.env.PORT}`);
            resolve(null);
        });
    });
}