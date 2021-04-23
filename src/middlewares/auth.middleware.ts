import usuarioModel from "@models/usuario.model";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UsuarioInterface } from "src/interfaces/usuario.interface";

class AuthMiddleware {
    public async autorizarUsuarioPorToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const token = req.query.token || req.headers['x-access-token'];

            if (!token) return res.status(401).send({ mensagem: 'Acesso restrito' });
    
            const usuarioToken = jwt.verify(String(token), 'SECRET') as UsuarioInterface;
            const usuario = await usuarioModel.findById(usuarioToken._id);
    
            if (!usuario) return res.status(400).send({ mensagem: 'Usuário não existe' });
            req.usuario = usuario;

            return next();
        } catch(e) {
            return res.status(401).send({ mensagem: 'Token inválido!' });
        }
    }

    public async autorizarUsuarioPorParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const usuario = await usuarioModel.findById(req.params.id);
    
            if (!usuario) return res.status(400).send({ mensagem: 'Usuário não existe' });
            req.usuarioChat = usuario;

            return next();
        } catch(e) {
            return res.status(406).send({ mensagem: 'Usuário inválido!' });
        }
    }
}

export default new AuthMiddleware();
