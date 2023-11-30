import * as mongoose from 'mongoose'

export const AdmSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String, min: 3, max: 30, required: true},
    email: {type: String, min: 3, max: 320, required: true},
    pass: {type: String, min: 2, max: 300, required: true},
    credential: {type: String, enum:["N1", "N2", "N3"], default: "N1",required: false},
    active: {type: Boolean, default: true}
    //TALVEZ ADD UMA LISTA DE AÇÕES?
},{timestamps: true});

export interface Adm extends mongoose.Document{
    id: string,
    name: string,
    email: string,
    pass: string,
    credential: string,
    active: boolean,
}