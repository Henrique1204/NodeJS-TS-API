import { Router } from 'express';
import mensagemController from '@controllers/mensagem.controller';
import authMiddleware from 'src/middlewares/auth.middleware';

const rotaMensagem = Router();

rotaMensagem.post(
    '/:id',
    authMiddleware.autorizarUsuarioPorToken,
    mensagemController.enviar
);

export default rotaMensagem;
