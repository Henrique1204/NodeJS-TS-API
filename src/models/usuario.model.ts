import { Document, model, Schema } from "mongoose";
import { UsuarioInterface } from "src/interfaces/usuario.interface";
import bcrypt from 'bcrypt';

interface UsuarioModel extends UsuarioInterface, Document {
    _id: string;
    compararSenhas(senha: string): Promise<Boolean>;
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

UsuarioSchema.pre<UsuarioModel>('save', async function criptografarSenha() {
    this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', function gerarAvatar() {
    const randomId = Math.floor(Math.random() * 1000000) + 1;

    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`;
});

UsuarioSchema.methods
.compararSenhas = function(this: UsuarioModel, senha: string): Promise<Boolean> {
    return bcrypt.compare(senha, this.senha);
}

export default model<UsuarioModel>('Usuario', UsuarioSchema);
