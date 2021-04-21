import usuarioModel from "@models/usuario.model";
import { Request, Response } from "express";

class UsuarioController {
    public cadastrar = async (req: Request, res: Response): Promise<Response> => {
        const { _id, nome } = await usuarioModel.create(req.body);

        const resposta = {
            mensagem: 'Usuário cadastrado com sucessso',
            _id,
            nome
        };

        return res.status(201).send(resposta);
    };
}

export default new UsuarioController();
