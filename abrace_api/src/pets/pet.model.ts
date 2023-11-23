import * as mongoose from 'mongoose'

export const PetSchema = new mongoose.Schema({
    id:{type: String},
    name: {type: String, min: 3, max: 30, required: true},
    species: {type: String, enum:["gato","cachorro"], required: true},
    age: {type: Number, min: 1, max: 100, required: true},
    accureteAge: {type: Boolean, default: true},
    furColor: {type: String, min: 3, max: 30, required: true},
    furType: {type: String, min: 3, max:30, required: true},
    furLength: {type: String, min: 1, max: 30, required: true},
    sex: {type: String, enum: ["M", "F"], required: true},
    description: {type: String, min: 30, max: 500, required: true},
    imgURL: {type: String, required: false},//change to TRUE
    imgALT: {type: String, min: 3, max: 30, required: false},//change to TRUE
    sponsorships: [{id:{type: String, max: 300}}],
    adoptionRequests: [{id:{type:String, max: 300}}]
});


export interface Pet extends mongoose.Document {
  id: string,
  name: string;
  species: string;
  age: number;
  accureteAge: boolean;
  furColor: string;
  furType: string;
  furLength: string;
  sex: string;
  description: string;
  imgURL: string;
  imgALT: string;
  sponsorships: [string];
  adoptionRequests: [string] 
}
