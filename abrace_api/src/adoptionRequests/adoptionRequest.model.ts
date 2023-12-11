import * as mongoose from 'mongoose';

export const AdoptionRequestSchema = new mongoose.Schema({
    id: {type: String},
    userID: {type: String, required: true},
    petID: {type: String, required: true},
    submissionGrant:{type: String, enum: ["pendente", "negado", "aceito"], default: "pendente"},
    attended: {type: String, enum:["Não Atendido", "Atendendo", "Atendido"]},
    admID: {type: String, default: "Não Atendido"}
}, {timestamps: true});

export interface AdoptionRequest extends mongoose.Document{
    id: string,
    userID: string,
    petID: string,
    submissionGrant: string,
    attended: string,
    admID: string
};