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

    constructor() {
        this.express = express();
        this.listen();
    }

    public getApp = (): express.Application => this.express;
};
