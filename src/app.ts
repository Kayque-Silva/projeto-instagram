import express from 'express';

require('dotenv').config()

const app = express();

app.use(express.json())

export async function startWebServer() {
    return new Promise((resolve) => { 
        app.listen(process.env.PORT, () => {
            console.log(`Servior escutando na porta ${process.env.PORT}`);
            resolve(null);
        });
    });
}