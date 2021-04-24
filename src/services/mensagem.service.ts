import { MensagemInterface } from "src/interfaces/mensagem.interface";
import { MensagemUsuario, UsuarioInterface } from "src/interfaces/usuario.interface";

class MensagemService {
    public getMensagemUsuario(user: UsuarioInterface, msg: MensagemInterface): MensagemUsuario {
        return {
            _id: user._id,
            nome: user.nome,
            avatar: user.avatar,
            ultimaMensagem: msg[0]?.texto || null,
            dataUltimaMensagem: msg[0]?.data_criacao || null
        };
    }

    public ordenarMensagens(usuariosMensagem: MensagemUsuario[]): MensagemUsuario[] {
        return usuariosMensagem.sort((a, b) => {
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1)
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem)
                || +(a.dataUltimaMensagem < b.dataUltimaMensagem)
        });
    }
}

export default new MensagemService();
