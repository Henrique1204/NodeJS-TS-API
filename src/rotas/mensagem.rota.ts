import { Router } from 'express';
import mensagemController from '@controllers/mensagem.controller';

const rotaMensagem = Router();

rotaMensagem.post('/:id', mensagemController.enviar);

export default rotaMensagem;
