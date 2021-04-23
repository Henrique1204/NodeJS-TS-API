import { Document, model, Schema } from "mongoose";
import { MensagemInterface } from "src/interfaces/mensagem.interface";

interface MensagemModel extends MensagemInterface, Document {
    _id: string;
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

export default model<MensagemModel>('Mensagem', MensagemSchema);
