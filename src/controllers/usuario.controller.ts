import usuarioModel from "@models/usuario.model";
import { Request, Response } from "express";

class UsuarioController {
    public cadastrar = async (req: Request, res: Response): Promise<Response> => {
        const usuario = await usuarioModel.create(req.body);
        return res.status(201).send(usuario);
    };
}

export default new UsuarioController();
