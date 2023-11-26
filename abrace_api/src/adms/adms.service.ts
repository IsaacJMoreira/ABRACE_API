import { Injectable } from '@nestjs/common';
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

    const existes = await this.admModel.findOne({email: email})

    if(!existes){
        const response = await new this.admModel({name, email, pass, credential}).save();
        return response._id;
    }
    
    return false;   
  }

}


