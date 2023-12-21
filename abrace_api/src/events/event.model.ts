import * as mongoose from 'mongoose';


export const EventSchema = new mongoose.Schema({
    id:{type: String},
    name:{type: String, min: 3, max: 30, required: true},
    date:{type: String, required: true},
    startTime:{type: String, required: true},
    duration: {type: String, required: true},
    place: {type: String, min: 3, max: 50, required: true},
    linkToEventPage: {type: String, min:3, max: 300},
    imgURL: {type: String, min: 3, max: 300, required: false},
    imgALT: {type: String, min: 3, max: 30, required: false},
    description: {type: String, min: 30, max: 500, required: true},
    active: {type: Boolean, default: true}
},{timestamps: true});

export interface Event extends mongoose.Document{
    id: string,
    name: string,
    date: string,
    startTime: string,
    duration: string,
    place:  string,
    linkToEventPage: string,
    imgURL: string,
    imgALT: string,
    description: string,
    active: boolean
}