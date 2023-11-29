import * as mongoose from 'mongoose';

export const DonationPlaceSchema = new mongoose.Schema({
    id:{type: String},
    name: {type: String, min: 3, max: 30, required: true},
    street:{type: String, min: 3, max: 30, required: true},
    number: {type: String, min: 1, max: 10, required: true},
    complement: {type: String, min:1, max: 30, required: false},
    neighborhood: {type: String, min: 1, max: 30, required: true},
    openningTime: {type: String, required: true},
    closingTime: {type: String, required: true},
    googleMapsLink:{type: String, min: 3, max: 300, required: true}
}, {timestamps: true});

export interface DonationPlace extends mongoose.Document{
    id: string,
    name: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    openningTime: string,
    closingTime: string,
    googleMapsLink: string
}