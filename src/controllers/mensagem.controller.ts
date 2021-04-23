import mensagemModel from '@models/mensagem.model';
import { Request, Response } from 'express';

class MensagemController {
    public async enviar(req: Request, res: Response): Promise<Response> {
        const { texto } = req.body;

        const mensagem = await mensagemModel.create({
            texto,
            remetente: '',
            destinatario: req.params.id
        });

        return res.status(200).send(mensagem);
    }
}

export default new MensagemController();
