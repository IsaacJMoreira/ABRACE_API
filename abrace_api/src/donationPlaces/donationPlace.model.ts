import * as mongoose from 'mongoose';

export const DonationPlaceSchema = new mongoose.Schema({
    id:{type: String},
    name: {type: String, min: 3, max: 30, required: true},
    street:{type: String, min: 3, max: 30, required: true},
    number: {type: String, min: 1, max: 10, required: true},
    complement: {type: String, min:1, max: 30},
    neighborhood: {type: String, min: 1, max: 30, required: true},
    oppeningTime: {type: String, required: true},
    closingTime: {type: String, required: true},
    active: {type: Boolean, default: true},
    googleMapsLink:{type: String, min: 3, max: 300, required: true}
}, {timestamps: true});

export interface DonationPlace extends mongoose.Document{
    id: string,
    name: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    oppeningTime: string,
    closingTime: string,
    active: boolean,
    googleMapsLink: string
}