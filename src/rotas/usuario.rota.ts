import usuarioController from "@controllers/usuario.controller";
import { Router } from "express";
import authMiddleware from "src/middlewares/auth.middleware";

const rotaUsuario = Router();

rotaUsuario.post('/cadastro', usuarioController.cadastrar);
rotaUsuario.post('/login', usuarioController.autenticar);

rotaUsuario.get(
    '/:id',
    authMiddleware.autorizarUsuarioPorParams,
    authMiddleware.autorizarUsuarioPorToken,
    usuarioController.getById
);

export default rotaUsuario;
