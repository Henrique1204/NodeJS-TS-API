import { Document, DocumentQuery, Model, model, Schema } from "mongoose";
import { MensagemInterface } from "src/interfaces/mensagem.interface";

interface MensagemModel extends MensagemInterface, Document {}

interface MensagemStatic extends Model<MensagemModel> {
    buscaChat(idUsuarioLogado: string, idUsuarioChat: string)
    : DocumentQuery<MensagemModel[], MensagemModel>
}

const MensagemSchema = new Schema({
    texto: {
        type: String,
        required: true
    },
    data_criacao: {
        type: Date,
        default: Date.now
    },
    remetente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

MensagemSchema.statics.buscaChat = function (idUsuarioLogado: string, idUsuarioChat: string)
: DocumentQuery<MensagemModel[], MensagemModel> {
    return this.find({
        $or: [
            { $and: [{ remetente: idUsuarioLogado }, { destinatario: idUsuarioChat }] },
            { $and: [{ remetente: idUsuarioChat }, { destinatario: idUsuarioLogado }] }
        ]
    });
};

export default model<MensagemModel, MensagemStatic>('Mensagem', MensagemSchema);
