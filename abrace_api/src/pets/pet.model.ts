import * as mongoose from 'mongoose'

export const PetSchema = new mongoose.Schema({
    id:{type: String},
    name: {type: String, min: 3, max: 30, required: true},
    species: {type: String, enum:["gato","cachorro"], required: true},
    age: {type: Number, min: 1, max: 100, required: true},
    ageUnit: {type: String, enum:["M", "A"], default: "A"},
    accurateAge: {type: Boolean, default: true},
    furColor: {type: String, min: 3, max: 30, required: true},
    furLength: {type: String, min: 1, max: 30, required: true},
    sex: {type: String, enum: ["M", "F"], required: true},
    weight: {type: Number, required: true},
    weightUnit: {type: String, enum: ["Kg", "g"], default: "Kg"},
    description: {type: String, min: 30, max: 500, required: true},
    active: {type: Boolean, default: true},
    imgURL: {type: String, required: false},//change to TRUE
    imgALT: {type: String, min: 3, max: 30, required: false},//change to TRUE
    sponsorships: [{id:{type: String, max: 300}}],
    adoptionRequests: [{id:{type:String, max: 300}}]
}, {timestamps: true});


export interface Pet extends mongoose.Document {
  id: string,
  name: string;
  species: string;
  age: number;
  ageUnit: string,
  accureteAge: boolean;
  furColor: string;
  furType: string;
  furLength: string;
  sex: string;
  weight: number,
  weightUnit: string,
  description: string;
  active: boolean,
  imgURL: string;
  imgALT: string;
  sponsorships: [string];
  adoptionRequests: [string] 
}
