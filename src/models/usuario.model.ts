import { Document, model, Schema } from "mongoose";
import { UsuarioInterface } from "src/interfaces/usuario.interface";

interface UsuarioModel extends UsuarioInterface, Document {
    _id: string;
}

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

export default model<UsuarioModel>('Usuario', UsuarioSchema);
