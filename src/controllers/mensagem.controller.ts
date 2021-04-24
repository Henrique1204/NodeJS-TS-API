import MensagemModel from '@models/mensagem.model';
import { Request, Response } from 'express';

class MensagemController {
    public enviar = async (req: Request, res: Response): Promise<Response> => {
        const mensagem = await MensagemModel.create({
            texto: req.body.texto,
            remetente: req.usuario._id,
            destinatario: req.usuarioChat._id
        });

        return res.status(200).send(mensagem);
    };

    public listar = async (req: Request, res: Response): Promise<Response> => {
        const idUsuarioLogado = req.usuario._id;
        const idUsuarioChat = req.usuarioChat._id;

        const mensagens = await MensagemModel.buscaChat(idUsuarioLogado, idUsuarioChat).sort('data_criacao');

        const mensagensChat = mensagens.map(({ texto, data_criacao, remetente }) => ({
            texto,
            data_criacao,
            isRemetente: remetente == String(idUsuarioLogado)
        }));

        return res.status(200).send(mensagensChat);
    };
}

export default new MensagemController();
