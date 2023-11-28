import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  InternalServerErrorException,
  ForbiddenException,
  Delete,
  NotFoundException,
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
    let newPet;
    try {
      newPet = await this.petsService.createPet(
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Se cagou ao tentar criar esse pet',
      );
    }

    if (!newPet) throw new ForbiddenException('Já tem um pet com esse nome');

    return newPet;
  }

  @Get()
  async getAllPets() {
    const response = await this.petsService.getAllPets();
    return response;
  }

  @Get(':id')
  async getOnePet(@Param('id') id: string) {
    let onePet;
    try {
      onePet = await this.petsService.getOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Se cagou ao tentar pegar esse pet especifico ',
      );
    }
    if (!onePet) throw new NotFoundException("Não encontrei");
    return onePet;
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
    let updatedPet;

    try {
      updatedPet = await this.petsService.updatePet(
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Deu bosta oa tentar fzr update nedde pet',
      );
    }
    if (!updatedPet)
      throw new ForbiddenException('Já tem um pet com esse nome');
    return updatedPet;
  }

  @Delete(':id')
  async deletePetByID(@Param('id') petID: string) {
    let deletedPet;
    try {
      deletedPet = await this.petsService.delOneById(petID);
    } catch (error) {
      throw new InternalServerErrorException('Se cagou ao deletar esse pet');
    }
    if (!deletedPet)
      throw new ForbiddenException('não posso deletar esse bixo sarnendo');
    return deletedPet;
  }
}
