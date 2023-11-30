import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DonationPlace } from "./donationPlace.model";
import { Model } from "mongoose";



@Injectable()
export class DonationPlacesService{
    constructor( @InjectModel("DonationPlace") private readonly  donationPlaceModel: Model< DonationPlace >){} 

    async addNewDonationPlace(
        name: string,
        street: string,
        number: string,
        complement: string,
        neighborhood: string,
        oppeningTime: string,
        closingTime: string,
        googleMapsLink: string
    ){
        const exists = await this.donationPlaceModel.countDocuments({name: name});

        if(!exists) {
            const response = await new this.donationPlaceModel({
                name,
                street,
                number,
                complement,
                neighborhood,
                oppeningTime,
                closingTime,
                googleMapsLink
            }).save();
            return response;
        }
        return false;
    }

    async getAllDonationPlaces(){
        const allDonationPlaces = await this.donationPlaceModel.find();
        if(allDonationPlaces.length < 1) return false;
        return allDonationPlaces;
    }

    async getDonationPlaceByID(id: string){
        const donationPlace = await this.donationPlaceModel.findById(id);
        if (!donationPlace) return false;
        return donationPlace;
    }


}