import { Router } from 'express';
import mensagemController from '@controllers/mensagem.controller';
import authMiddleware from 'src/middlewares/auth.middleware';

const rotaMensagem = Router();

rotaMensagem.post(
    '/:id',
    authMiddleware.autorizarUsuarioPorParams,
    authMiddleware.autorizarUsuarioPorToken,
    mensagemController.enviar
);

rotaMensagem.get(
    '/:id',
    authMiddleware.autorizarUsuarioPorParams,
    authMiddleware.autorizarUsuarioPorToken,
    mensagemController.listar
);

export default rotaMensagem;
