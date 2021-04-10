import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

export class App {
    private express: express.Application;
    private porta = 8000;

    private listen = (): void => {
        this.express.listen(this.porta, () => {
            console.log(`Servidor rodando na porta ${this.porta}`);
        });
    };

    private database = (): void => {
        mongoose.connect('mongodb://127.0.0.1/api_ts', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    };

    private middlewares = (): void => {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));

        this.express.use(cors({ origin: true, credentials: true}));
    };

    constructor() {
        this.express = express();
        this.listen();
        this.database();
        this.middlewares();
    }

    public getApp = (): express.Application => this.express;
};
