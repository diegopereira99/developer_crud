import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import developerRouter from "./routers/developer_router";
import errorMiddleware from "./middleware/http_error_middleware";
import * as cors from 'cors';

createConnection().then(_connection => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/developers', developerRouter());
    app.use(errorMiddleware);
    app.listen(3000, () => {
        console.log("Server is running on port", 3000);
    });
}).catch( error => {
    console.log("Erro ao conetar no banco de dados", error);
    process.exit(1)
})