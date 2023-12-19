import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(
    name: string,
    email: string,
    pass: string,
    whatsApp: string,
  ) {
    const isTaken = await this.userModel.findOne({ email: email });
    if (isTaken) {
      if (!isTaken.active) {return {recover: true, id: isTaken._id}}
      return false
    }

    const newUser = new this.userModel({
      name,
      email,
      pass,
      whatsApp,
    });

    const response = await newUser.save();
    return response as User;
  }

  async getAll() {
    const response = await this.userModel.find({active: true}).sort({createdAt: -1});
    if (response.length < 1) return false;
    return response as User[];
  }

  async searchUserByQuery(searchTerm?: string){

    const response = await this.userModel.find({
      $or:[
        {"name": {$regex: `${searchTerm}`, $options: 'i'}},
        {"email": {$regex: `${searchTerm}`, $options: 'i'}}
      ]
    }).sort({createdAt: -1});
    if (response.length < 1 ) return [];
    return response as User[];
  }

  async getOne(id: string) {
    const oneUser = await this.userModel.findById(id);
    if (!oneUser) return false;
    return oneUser as User;
  }

  async putOne(
    id: string,
    name?: string,
    email?: string,
    pass?: string,
    whatsApp?: string,
    active?: boolean,
  ) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        email,
        pass,
        whatsApp,
        active,
      },
      { new: true },
    );

    if (!updatedUser) return false;
    return updatedUser as User;
  }
}
