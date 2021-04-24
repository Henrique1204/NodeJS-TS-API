import mensagemModel from "@models/mensagem.model";
import usuarioModel from "@models/usuario.model";
import { Request, Response } from "express";
import mensagemService from "src/services/mensagem.service";

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

    public autenticar = async (req: Request, res: Response): Promise<Response> => {
        const { nome, senha } = req.body;

        const usuario = await usuarioModel.findOne({ nome });
        if (!usuario) return res.status(404).send({ mensagem: 'Usuario não encontrado!' });

        const isValid = await usuario.compararSenhas(senha);
        if (!isValid) return res.status(403).send({ mensagem: 'Senha inválida!' });

        return res.status(200).send({
            usuario,
            token: usuario.gerarToken()
        });
    };

    public getById = (req: Request, res: Response): Response => {
        return res.status(200).send(req.usuarioChat);
    };

    public listar = async (req: Request, res: Response): Promise<Response> => {
        const idUsuarioLogado = req.usuario._id;

        const usuarios = await usuarioModel.find({ _id: { $ne: idUsuarioLogado } });

        const usuariosMensagem = await Promise.all(usuarios.map((usuario) => (
            mensagemModel.buscaChat(idUsuarioLogado, usuario._id)
            .sort('-data_criacao').limit(1)
            .map((mensagens) => mensagemService.getMensagemUsuario(usuario, mensagens))
        )));

        const mensagensOrdenadas = mensagemService.ordenarMensagens(usuariosMensagem);

        return res.status(200).send(mensagensOrdenadas);
    };
}

export default new UsuarioController();
