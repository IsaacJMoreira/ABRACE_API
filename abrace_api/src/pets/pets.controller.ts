import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets') //apiURL/pets
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async addPet(
    @Body('name') petName: string,
    @Body('species') petSpecies: string,
    @Body('age') petAge: number,
    @Body('ageUnit') petAgeUnit: string,
    @Body('accurateAge') accurateAge: boolean,
    @Body('furColor') petFurColor: string,
    @Body('furLength') petFurLength: string,
    @Body('sex') petSex: string,
    @Body('weight') petWeight: number,
    @Body('weightUnit') petWeightUnit: string,
    @Body('description') petDescription: string,
    @Body('imgURL') petImgURL: string,
    @Body('imgALT') petImgALT: string,
    @Body('sponsorships') petSponsorships: [string],
    @Body('adoptionRequests') petAdoptionRequests: [string],
  ) {
    let newPet;
    try {
      newPet = await this.petsService.createPet(
        petName,
        petSpecies,
        petAge,
        petAgeUnit,
        accurateAge,
        petFurColor,
        petFurLength,
        petSex,
        petWeight,
        petWeightUnit,
        petDescription,
        petImgURL,
        petImgALT,
        petSponsorships,
        petAdoptionRequests,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return newPet;
  }

  @Get()
  async getAllPets() {
    let response;
    try {
      response = await this.petsService.getAllPets();
    } catch (error) {
      throw new InternalServerErrorException();
    }
      if(!response) throw new NotFoundException();
    return response;
  }

  @Get(':id')
  async getOnePet(@Param('id') id: string) {
    let onePet;
    try {
      onePet = await this.petsService.getOne(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!onePet) throw new NotFoundException();
    return onePet;
  }

  @Put(':id')
  async updateOnePet(
    @Param('id') id: string,
    @Body('name') petName: string,
    @Body('species') petSpecies: string,
    @Body('age') petAge: number,
    @Body('ageUnit') petAgeUnit: string,
    @Body('accurateAge') accurateAge: boolean,
    @Body('furColor') petFurColor: string,
    @Body('furLength') petFurLength: string,
    @Body('sex') petSex: string,
    @Body('weight') petWeight: number,
    @Body('weightUnit') petWeightUnit: string,
    @Body('description') petDescription: string,
    @Body('imgURL') petImgURL: string,
    @Body('imgALT') petImgALT: string,
    @Body('sponsorships') petSponsorships: [string],
    @Body('adoptionRequests') petAdoptionRequests: [string],
  ) {
    let updatedPet;

    try {
      updatedPet = await this.petsService.updatePet(
        id,
        petName,
        petSpecies,
        petAge,
        petAgeUnit,
        accurateAge,
        petFurColor,
        petFurLength,
        petSex,
        petWeight,
        petWeightUnit,
        petDescription,
        petImgURL,
        petImgALT,
        petSponsorships,
        petAdoptionRequests,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!updatedPet) throw new NotFoundException();
    return updatedPet;
  }
  @Put('disable/:id')
  async desableOnePet(@Param('id') id: string) {
    let updatedPet;

    try {
      updatedPet = await this.petsService.updatePet(
        id,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!updatedPet) throw new NotFoundException();
    return updatedPet;
  }
}
