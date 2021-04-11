import usuarioController from "@controllers/usuario.controller";
import { Request, Router } from "express";

const rotaUsuario = Router();

rotaUsuario.post('/cadastro', usuarioController.cadastrar);

export default rotaUsuario;
