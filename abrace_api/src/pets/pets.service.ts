import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './pet.model';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) {}

  async createPet(
    name: string,
    species: string,
    age: number,
    ageUnit: string,
    accureteAge: boolean,
    furColor: string,
    furLength: string,
    sex: string,
    weight: number,
    weightUnit: string,
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
      ageUnit,
      accureteAge,
      furColor,
      furLength,
      sex,
      weight,
      weightUnit,
      description,
      imgURL,
      imgALT,
      sponsorships,
      adoptionRequests,
    });

    const response = await newPet.save();
    return response as Pet;
  }

  async getAllPets() {
    const response = await this.petModel.find().exec();
    if (response.length < 1) return false;
    return response as Pet[];
  }

  async getOne(id: string) {
    let response;

    response = await this.petModel.findById(id).exec();
    if (!response) return false;

    return response as Pet;
  }

  async updatePet(
    id: string,
    name: string,
    species: string,
    age: number,
    ageUnit: string,
    accurateAge: boolean,
    furColor: string,
    furLength: string,
    sex: string,
    weight: number,
    weightUnit: string,
    description: string,
    imgURL: string,
    imgALT: string,
    sponsorships: [string],
    adoptionRequests: [string],
    active?: boolean,
  ) {
    
    const response = await this.petModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        species,
        age,
        ageUnit,
        accurateAge,
        furColor,
        furLength,
        sex,
        weight,
        weightUnit,
        description,
        active,
        imgURL,
        imgALT,
        sponsorships,
        adoptionRequests,
      },
      { new: true },
    );
    return response as Pet;
  }
}
