import usuarioModel from "@models/usuario.model";
import { Request, Response } from "express";

class UsuarioController {
    public cadastrar = async (req: Request, res: Response): Promise<Response> => {
        const { _id, nome, senha } = await usuarioModel.create(req.body);

        const resposta = {
            mensagem: 'Usuário cadastrado com sucessso',
            _id,
            nome,
            senha
        };

        return res.status(201).send(resposta);
    };

    public autenticar = async (req: Request, res: Response): Promise<Response> => {
        const { nome, senha } = req.body;

        const usuario = await usuarioModel.findOne({ nome });
        if (!usuario) return res.status(404).send({ mensagem: 'Usuario não encontrado!' });

        const isValid = await usuario.compararSenhas(senha);
        if (!isValid) return res.status(403).send({ mensagem: 'Senha inválida!' });

        return res.status(200).send(usuario);
    };
}

export default new UsuarioController();
