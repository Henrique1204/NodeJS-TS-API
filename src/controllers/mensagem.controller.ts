import mensagemModel from '@models/mensagem.model';
import { Request, Response } from 'express';

class MensagemController {
    public async enviar(req: Request, res: Response): Promise<Response> {
        const mensagem = await mensagemModel.create({
            texto: req.body.texto,
            remetente: req.usuario._id,
            destinatario: req.usuarioChat._id
        });

        return res.status(200).send(mensagem);
    }
}

export default new MensagemController();
