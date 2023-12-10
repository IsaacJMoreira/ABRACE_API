import * as mongoose from 'mongoose';

    export const UserSchema = new mongoose.Schema({
        id: {type: String},
        name:{type: String, min: 3, max: 30, required: true},
        email:{type: String, min: 3, max: 320, required: true},
        pass: {type: String, min: 3, max: 300, required: true},
        whatsApp: {type: String, min: 11, max: 15, required: true},
        formID: {type: String , min: 3, max: 256, default: "pending"},
        volunteerAplIDs: [{id:{type: String, max: 300}}],
        adoptionAplicationIDs: [{id:{type: String, max: 300}}],
        sponsorshipIDs: [{id:{type: String, max: 300}}],
        donationIDs: [{id:{type: String, max: 300}}],
        active: {type: Boolean, default: true}
    }, {timestamps: true});

    export interface User extends mongoose.Document{
        id: string,
        name: string,
        email: string,
        pass: string,
        whatsApp: string,
        formID: string,
        volunteerAplIDs: [string],
        adoptionAplicationIDs: [string],
        sponsorshipIDs: [string],
        donationIDs: [string],
        active: boolean
    }