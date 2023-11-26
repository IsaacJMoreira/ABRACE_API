import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets') //apiURL/pets
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post()
  async addPet(
    @Body('name') petName: string,
    @Body('species') petSpecies: string,
    @Body('age') petAge: number,
    @Body('accurateAge') accurateAge: boolean,
    @Body('furColor') petFurColor: string,
    @Body('furLength') petFurLength: string,
    @Body('sex') petSex: string,
    @Body('description') petDescription: string,
    @Body('imgURL') petImgURL: string,
    @Body('imgALT') petImgALT: string,
    @Body('sponsorships') petSponsorships: [string],
    @Body('adoptionRequests') petAdoptionRequests: [string],
  ) {
    const generatedID = await this.petService.createPet(
      petName,
      petSpecies,
      petAge,
      accurateAge,
      petFurColor,
      petFurLength,
      petSex,
      petDescription,
      petImgURL,
      petImgALT,
      petSponsorships,
      petAdoptionRequests,
    );

    return { ID: generatedID };
  }

  @Get()
  async getAllPets() {
    const response = await this.petService.getAllPets();
    return response;
  }

  @Get(':id')
  async getOnePet(@Param('id') id: string) {
    const response = await this.petService.getOne(id);
    return response;
  }

  @Put(':id')
  async updateOnePet(
    @Param('id') id: string,
    @Body('name') petName: string,
    @Body('species') petSpecies: string,
    @Body('age') petAge: number,
    @Body('accurateAge') accurateAge: boolean,
    @Body('furColor') petFurColor: string,
    @Body('furLength') petFurLength: string,
    @Body('sex') petSex: string,
    @Body('description') petDescription: string,
    @Body('imgURL') petImgURL: string,
    @Body('imgALT') petImgALT: string,
    @Body('sponsorships') petSponsorships: [string],
    @Body('adoptionRequests') petAdoptionRequests: [string],
  ) {
    const response = await this.petService.updatePet(
      id,
      petName,
      petSpecies,
      petAge,
      accurateAge,
      petFurColor,
      petFurLength,
      petSex,
      petDescription,
      petImgURL,
      petImgALT,
      petSponsorships,
      petAdoptionRequests,
    );
    return response;
  }
}
