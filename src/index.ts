require('dotenv').config();
import "reflect-metadata";
import { startDatabase } from "./services/database/data-source";
import { startWebServer } from "./app";


async function main() {
    try {
        await startDatabase();
        console.log(`Banco de dados inicializado`);
        await startWebServer();
        console.log(`Servidor Web inicializado`);
    } catch (error) {
        console.log(error, "Erro ao inicializar aplicativo");        
    }
}

main();