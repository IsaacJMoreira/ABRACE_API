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

    @Put(':id')
    async updateOneDonationPlaceByID(
        @Param('id') dpID: string,
        @Body('name') dpName: string,
        @Body('street') dpStreet: string,
        @Body('number') dpNumber: string,
        @Body('complement') dpComplement: string,
        @Body('neighborhood') dpNeighborhood: string,
        @Body('oppeningTime') dpOppeningTime: string,
        @Body('closingTime') dpClosingTime: string,
        @Body('googleMapsLink') dpGoogleMapsLink: string
    ){
        let updatedDonationPlace;
        try {
            updatedDonationPlace = await this.donationPlacesService.updateDonationPlaceByID(
                dpID,
                dpName,
                dpStreet,
                dpNumber,
                dpComplement,
                dpNeighborhood,
                dpOppeningTime,
                dpClosingTime,
                dpGoogleMapsLink,
                undefined
                )
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if (!updatedDonationPlace) throw new NotFoundException();
        return updatedDonationPlace;
    }

    @Put('deactivate/:id')
    async deactivateDonationPlace(
        @Param('id') dpID: string
    ){
        let deactivatedDonationPlace
        try {
            deactivatedDonationPlace = await this.donationPlacesService.updateDonationPlaceByID(
                dpID, 
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                false
            )
        } catch (error) {
           throw new InternalServerErrorException(); 
        }
        if(!deactivatedDonationPlace) throw new NotFoundException();
        return deactivatedDonationPlace;
    }

  }