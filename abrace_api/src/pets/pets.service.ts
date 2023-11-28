import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './pet.model';
import { Model } from 'mongoose';
import { DefaultDeserializer } from 'v8';

@Injectable()
export class PetsService {
  constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) {}

  async createPet(
    name: string,
    species: string,
    age: number,
    accureteAge: boolean,
    furColor: string,
    furLength: string,
    sex: string,
    description: string,
    imgURL: string,
    imgALT: string,
    sponsorships: [string],
    adoptionRequests: [string],
  ) {
    const isTaken = await this.petModel.countDocuments({ name: name });
    if (isTaken) return false;

    const newPet = new this.petModel({
      name,
      species,
      age,
      accureteAge,
      furColor,
      furLength,
      sex,
      description,
      imgURL,
      imgALT,
      sponsorships,
      adoptionRequests,
    });

    const response = await newPet.save();
    return response as Pet | boolean;
  }

  async getAllPets() {
    const response = await this.petModel.find().exec();
    if (response.length < 1) return false;
    return response as Pet[] | boolean;
  }

  async getOne(id: string) {
    let response;

    response = await this.petModel.findById(id).exec();
    if (!response) return false;

    return response as Pet | boolean;
  }

  async updatePet(
    id: string,
    name: string,
    species: string,
    age: number,
    accureteAge: boolean,
    furColor: string,
    furLength: string,
    sex: string,
    description: string,
    imgURL: string,
    imgALT: string,
    sponsorships: [string],
    adoptionRequests: [string],
  ) {
    const [ IDsameNAME ] = await this.petModel.find({ name: name }, "_id");
    console.log(name, IDsameNAME);
    if (IDsameNAME && !(IDsameNAME._id == id))return false;
    const response = await this.petModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        species,
        age,
        accureteAge,
        furColor,
        furLength,
        sex,
        description,
        imgURL,
        imgALT,
        sponsorships,
        adoptionRequests,
      },{new: true}
    );

    return response as Pet | boolean;
  }

  async delOneById(id: string){
    const deletedPet = await this.petModel.deleteOne({_id: id});
    if(!deletedPet.deletedCount) return false;
    return deletedPet as object | boolean;
  }
}
