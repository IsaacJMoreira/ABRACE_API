import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './pet.model';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) {}

  async insertPet(
    name: string,
    species: string,
    age: number,
    accureteAge: boolean,
    furColor: string,
    furType: string,
    furLength: string,
    sex: string,
    description: string,
    imgURL: string,
    imgALT: string,
    sponsorships: [string],
    adoptionRequests: [string],
  ) {
    const newPet = new this.petModel({
      name,
      species,
      age,
      accureteAge,
      furColor,
      furType,
      furLength,
      sex,
      description,
      imgURL,
      imgALT,
      sponsorships,
      adoptionRequests,
    });

    const response = await newPet.save();
    console.log(response);

    return response.id as string;
  }

  async getAllPets() {
    const response = await this.petModel.find().exec();
    if (response.length < 1) throw new NotFoundException('Não achei, porra!!!');
    return response as Pet[];
  }

  async getOne(id: string) {
    let response;
    try {
      response = await this.petModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Ish, deu merda!!!');
    }
    if (!response)
      throw new NotFoundException('Não achei essa porra desse bixo');
    return response as Pet;
  }

  async updatePet(
    id: string,
    name: string,
    species: string,
    age: number,
    accureteAge: boolean,
    furColor: string,
    furType: string,
    furLength: string,
    sex: string,
    description: string,
    imgURL: string,
    imgALT: string,
    sponsorships: [string],
    adoptionRequests: [string],
  ) {
    let response;
    try {
      response = await this.petModel.findOneAndUpdate(
        { _id: id },
        {
          name,
          species,
          age,
          accureteAge,
          furColor,
          furType,
          furLength,
          sex,
          description,
          imgURL,
          imgALT,
          sponsorships,
          adoptionRequests,
        },
      );
    } catch (error) {
        console.log(error);
        throw new NotFoundException("Deu bosta no update");
    }
    if (!response) throw new NotFoundException("Não achei porra nenhuma p fzr update");
    return response
  }
}
