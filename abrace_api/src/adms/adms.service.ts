import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Adm } from './adm.model';
import { Model } from 'mongoose';

@Injectable()
export class AdmService {
  constructor(@InjectModel('Adm') private readonly admModel: Model<Adm>) {}

  async createAdm(
    name: string,
    email: string,
    pass: string,
    credential: string,
  ) {
    const existes = await this.admModel.findOne({ email: email });

    if (!existes) {
      const response = await new this.admModel({
        name,
        email,
        pass,
        credential,
      }).save();
      return response._id;
    }

    return false;
  }

  async getAdms() {
    const response = await this.admModel.find();

    if (!response) return false;
    return response;
  }

  async getADMByID(id: string) {
    const response = await this.admModel.findById(id);
    console.log(response);
    if (!response) return false;
    return response;
  }

  async putADMByID_NoCredential(
    id: string,
    name: string,
    email: string,
    pass: string,
  ) {
    const alreadyExistes = await this.admModel.find({ email: email }, '_id');

    let isItself = 0;
    alreadyExistes.forEach((element) => {
      if (element._id == id) isItself = 1;
    });
    console.log('isItsenf', isItself);
    console.log('alreadyExistes', alreadyExistes.length);

    if (alreadyExistes.length > 0 && !(isItself == 1)) return 2;

    const response = await this.admModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        email,
        pass,
      },
      {
        new: true,
      },
    );

    return response;
  }

  async changeCredential(id: string, credential: string) {
    const exists = await this.admModel.findByIdAndUpdate(
      { _id: id },
      { credential },
      { new: true },
    );
    if (!exists) return false;
    return exists;
  }

  async deleteById(id: string) {
    const deleted = await this.admModel.deleteOne({ _id: id });
    if (!deleted) return false;
    return deleted;
  }
}
