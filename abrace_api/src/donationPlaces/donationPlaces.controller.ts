import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Put,
  } from '@nestjs/common';
  import { DonationPlacesService } from './donationPlaces.service';

  @Controller('donation_places')
  export class DonationPlacesController {
    constructor(private readonly donationPlacesService: DonationPlacesService){};

    @Post()
    async addNewDonationPlace(
        @Body('name') dpName: string,
        @Body('street') dpStreet: string,
        @Body('number') dpNumber: string,
        @Body('complement') dpComplement: string,
        @Body('neighborhood') dpNeighborhood: string,
        @Body('oppeningTime') dpOppeningTime: string,
        @Body('closingTime') dpClosingTime: string,
        @Body('googleMapsLink') dpGoogleMapsLink: string
    ){
        let newDonationPlace;
        try {
            newDonationPlace = await this.donationPlacesService.addNewDonationPlace(
                dpName,
                dpStreet,
                dpNumber,
                dpComplement,
                dpNeighborhood,
                dpOppeningTime,
                dpClosingTime,
                dpGoogleMapsLink
            );
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(!newDonationPlace) throw new ForbiddenException();
        return newDonationPlace;
    }

    @Get()
    async getAllDonationPlaces(){
        let allDonationPlaces;
        try {
            allDonationPlaces = await this.donationPlacesService.getAllDonationPlaces();
        } catch (error) {
            
            throw new InternalServerErrorException();
        }
        if(!allDonationPlaces) throw new NotFoundException();
        return allDonationPlaces;
    }

    @Get(':id')
    async getOneDonationPlaceByID(
        @Param('id') dpID: string
    ){
        let OneDonationPlace;
        try {
            OneDonationPlace = await this.donationPlacesService.getDonationPlaceByID(dpID);
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if(!OneDonationPlace) throw new NotFoundException();
        return OneDonationPlace;
    }

  }