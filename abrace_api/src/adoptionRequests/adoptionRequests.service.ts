import { Injectable } from '@nestjs/common/decorators/core';
import { InjectModel } from '@nestjs/mongoose';
import { AdoptionRequest } from './adoptionRequest.model';
import { User } from 'src/users/user.model';
import { Pet } from 'src/pets/pet.model';
import { Model } from 'mongoose';

@Injectable()
export class AdoptionRequestsService {
  constructor(
    @InjectModel('AdoptionRequest') private readonly adoptionRequestModel: Model<AdoptionRequest>,
    @InjectModel('Pet') private readonly petModel: Model<Pet>,
    @InjectModel('User')private readonly userModel: Model<User>,
  ) {}

  async addNewAdoptionRequest(userID: string, petID: string) {
    const user = await this.userModel.findById(userID);
    const pet = await this.petModel.findById(petID);
    if (!user || !pet) return 0;
    if (!user.active) return 1; // user is not active (forbidden)
    if (user.formID == 'pending') return 2; // user has to answer questionaire (forbidden)
    if (!pet.active) return 3; // pet is not active (forbidden)
    

    const newAdoptionRequest = await new this.adoptionRequestModel({
      userID,
      petID,
    }).save();
    if (!newAdoptionRequest) return -1; //did not create anything
    return newAdoptionRequest;
  }

  async getAdoptionRequestsByQuery(dateMin: string, dateMax: string) {
    let allRequests;
    if (dateMin && dateMax) {
      allRequests = await this.adoptionRequestModel
        .find({createdAt:{ $gte: dateMin, $lte: dateMax }})
        .sort({ createdAt: -1 });
    } else if (dateMin && !dateMax) {
      allRequests = await this.adoptionRequestModel
        .find({createdAt:{ $gte: dateMin}})
        .sort({ createdAt: -1 });
    } else if (!dateMin && !dateMax) {
      allRequests = await this.adoptionRequestModel
        .find()
        .sort({ createdAt: -1 });
    } else {
      return -1;
    }

    if (!allRequests) return 0; // did not found anything
    if(allRequests.length == 0) return 1;
    return allRequests;
  }

  async getAdoptionRequestByPetID(petID: string) {
    const foundRequests = await this.adoptionRequestModel
      .find({
        petID,
      })
      .sort({ createdAt: -1 });
    if (!foundRequests) return 0; // did not found anything
    return foundRequests;
  }

  async getAdoptionRequestByUserID(userID: string) {
    const foundRequests = await this.adoptionRequestModel
      .find({
        userID,
      })
      .sort({ createdAt: -1 });
    if (!foundRequests) return 0; // did not found anything
    return foundRequests;
  }

  async updateAdoptionRequestGrant(id: string, grant: string) {
    const updatedGrant = await this.adoptionRequestModel.findByIdAndUpdate(
      id,
      {
        submissionGrant: grant,
      },
      { new: true },
    );

    if (!updatedGrant) return 0; //did not update
    return updatedGrant;
  }
}
