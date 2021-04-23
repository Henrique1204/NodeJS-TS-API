import MensagemModel from '@models/mensagem.model';
import { Request, Response } from 'express';

class MensagemController {
    public async enviar(req: Request, res: Response): Promise<Response> {
        const mensagem = await MensagemModel.create({
            texto: req.body.texto,
            remetente: req.usuario._id,
            destinatario: req.usuarioChat._id
        });

        return res.status(200).send(mensagem);
    }

    public async listar(req: Request, res: Response): Promise<Response> {
        const idUsuarioLogado = req.usuario._id;
        const idUsuarioChat = req.usuarioChat._id;

        const mensagens = await MensagemModel.find({
            $or: [
                { $and: [{ remetente: idUsuarioLogado }, { destinatario: idUsuarioChat }] },
                { $and: [{ remetente: idUsuarioChat }, { destinatario: idUsuarioLogado }] }
            ]
        }).sort('data_criacao');

        return res.status(200).send(mensagens);
    }
}

export default new MensagemController();
